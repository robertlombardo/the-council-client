import React, {Component} from 'react'
import TweenMax, {Linear} from 'gsap'
import {PlayerStateStore} from 'stores'
import './producer-progress-view.scss'

class ProducerProgressView extends Component {

    constructor(props, context) {
        super(props, context)

        const {producer}        = this.props
        const producer_progress = producer && producer.last_product && producer.interval ? (new Date().getTime() - producer.last_product) / producer.interval : 0

        this.state = {
            producer_progress,
        }

        this.onProduct                     = this.onProduct.bind(this)
        this.onProducerProgressDummyUpdate = this.onProducerProgressDummyUpdate.bind(this)

        this.makeProductProgressTween(producer_progress)
    }
    
    render() {
        const {producer, producer_key} = this.props

        return (
            <div className="producer-progress-view">
                <div className="producer-progress-view-label">
                    <div className="yield-chance">{producer.count} {producer_key}</div>
                </div>
                <progress className="progress producer-progress-view-bar" value={this.state.producer_progress} max={1}></progress>
            </div>      
        )
    }

    onProduct(data) {
        if (data.producer_key !== this.props.producer_key) return

        const {producer}        = this.state
        const producer_progress = (new Date().getTime() - producer.last_product) / producer.interval
        
        this.setState({
            producer_progress,
        })

        this.makeProductProgressTween(producer_progress)
    }

    makeProductProgressTween(producer_progress) {
        const remaining_sec  = ((1 - producer_progress) * this.props.producer.interval) / 1000
        const progress_dummy = {producer_progress}

        if (this.product_progress_tween) this.product_progress_tween.kill()
        this.product_progress_tween = TweenMax.to(progress_dummy, remaining_sec, {
            producer_progress : 1,
            ease           : Linear.easeNone,
            onUpdate       : this.onProducerProgressDummyUpdate,
            onUpdateParams : [progress_dummy]
        })
    }

    onProducerProgressDummyUpdate(progress_dummy) {
        this.setState({producer_progress: progress_dummy.producer_progress})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.producer) !== JSON.stringify(prevProps.producer)) {
            const {producer}        = this.props
            const producer_progress = (new Date().getTime() - producer.last_product) / producer.interval

            this.setState({
                producer_progress
            })

            this.makeProductProgressTween(producer_progress)
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
export default ProducerProgressView
