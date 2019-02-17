import React, {Component} from 'react'
import TweenMax, {Linear} from 'gsap'
import {PlayerStateStore} from 'stores'
import './product-progress-view.scss'

class ProductProgressView extends Component {

    constructor(props, context) {
        super(props, context)

        const {product}        = this.props
        const product_progress = product && product.last_product && product.interval ? (new Date().getTime() - product.last_product) / product.interval : 0

        this.state = {
            product_progress,
        }

        this.onProduct                     = this.onProduct.bind(this)
        this.onProducerProgressDummyUpdate = this.onProducerProgressDummyUpdate.bind(this)

        this.makeProductProgressTween(product_progress)
    }
    
    render() {
        const {product, product_key, empire_facet, empire_facet_key} = this.props

        return (
            <div className="product-progress-view">
                <div className="product-progress-view-label">
                    <div className="yield-chance">+{product.count * (empire_facet_key === `citizens` ? empire_facet.count : 1)} {product_key}</div>
                </div>
                <progress className="progress product-progress-view-bar" value={this.state.product_progress} max={1}></progress>
            </div>      
        )
    }

    onProduct(data) {
        if (data.product_key !== this.props.product_key) return

        const {product}         = this.props
        const product_progress = (new Date().getTime() - product.last_product) / product.interval
        
        this.setState({
            product_progress,
        })

        this.makeProductProgressTween(product_progress)
    }

    makeProductProgressTween(product_progress) {
        const remaining_sec  = ((1 - product_progress) * this.props.product.interval) / 1000
        const progress_dummy = {product_progress}

        if (this.product_progress_tween) this.product_progress_tween.kill()
        this.product_progress_tween = TweenMax.to(progress_dummy, remaining_sec, {
            product_progress : 1,
            ease           : Linear.easeNone,
            onUpdate       : this.onProducerProgressDummyUpdate,
            onUpdateParams : [progress_dummy]
        })
    }

    onProducerProgressDummyUpdate(progress_dummy) {
        this.setState({product_progress: progress_dummy.product_progress})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.product) !== JSON.stringify(prevProps.product)) {
            const {product}        = this.props
            const product_progress = (new Date().getTime() - product.last_product) / product.interval

            this.setState({
                product_progress
            })

            this.makeProductProgressTween(product_progress)
        }
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.PRODUCT, this.onProduct)
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.PRODUCT, this.onProduct)

        if (this.product_progress_tween) this.product_progress_tween.kill()
    }
    
}
export default ProductProgressView
