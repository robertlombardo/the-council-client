import React, {Component}     from 'react'
import {ProducerProgressView} from 'view/components'
import {PlayerStateStore}     from 'stores'
import './citizen-view.scss'

const TITLES = {
    hunters   : `Hunters`,
    gatherers : `Gatherers`,
}

class CitizenView extends Component {

    constructor(props, context) {
        super(props, context)

        const {empire} = PlayerStateStore.get().player

        this.state = {
            citizen: empire ? empire.citizens[props.view_key] : {products: {}}
        }

        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    }
    
    render() {
        const {citizen} = this.state

        return (
            <div className="header-empire-facet-view">
                <div className="sub-container header-empire-facet-view-quick-info">
                    <div className="header-empire-facet-view-title">{TITLES[this.props.view_key]}</div>
                    <div className="header-empire-facet-view-count">{citizen.count}</div>
                </div>
                <div className="sub-container citizen-view-main-panel">
                    <div className="citizen-view-product-progress">
                        {Object.keys(citizen.products).map(product_key => {
                            return (
                                <ProducerProgressView key={product_key} producer={citizen.products[product_key]} producer_key={product_key} />
                            )})
                        }
                    </div>
                    <div className="citizen-view-manual-controls">
                        manual controls
                    </div>
                </div>
            </div>      
        )
    }

    onPlayerStateChange(data) {
        this.setState({
            citizen: data.new_player_state.empire.citizens[this.props.view_key]
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.view_key !== prevProps.view_key) {
            const {empire} = PlayerStateStore.get().player
            const citizen  = empire ? empire.citizens[this.props.view_key] : {}

            this.setState({
                citizen,
            })
        }
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }
    
}
export default CitizenView
