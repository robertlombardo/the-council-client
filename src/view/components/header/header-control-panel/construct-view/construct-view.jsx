import React, {Component}     from 'react'
import {
    ProducerProgressView,
    SpendPanel,
} from 'view/components'
import {PlayerStateStore}     from 'stores'
import './construct-view.scss'

const TITLES = {
    camps    : `Camps`,
    villages : `Villages`,
    hamlets  : `Hamlets`,
}

class ConstructView extends Component {

    constructor(props, context) {
        super(props, context)

        const {empire} = PlayerStateStore.get().player

        this.state = {
            construct: empire ? empire.constructs[props.view_key] : {}
        }

        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    }
    
    render() {
        const {view_key}  = this.props
        const {construct} = this.state

        return (
            <div className="header-empire-facet-view">
                <div className="sub-container header-empire-facet-view-quick-info">
                    <div className="header-empire-facet-view-title">{TITLES[view_key]}</div>
                    <div className="header-empire-facet-view-count">{construct.count}</div>
                </div>
                <div className="sub-container construct-view-main-panel">
                    <div className="construct-view-product-progress">
                        <ProducerProgressView producer={construct} producer_key="construct" />
                    </div>
                    <div className="construct-view-build-new">
                        <SpendPanel facet_item={construct} facet_item_key={view_key} />
                    </div>
                    <div className="construct-view-manual-controls">
                        manual controls
                    </div>
                </div>
            </div>      
        )
    }

    onPlayerStateChange(data) {
        this.setState({
            construct: data.new_player_state.empire.constructs[this.props.view_key]
        })
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }
    
}
export default ConstructView
