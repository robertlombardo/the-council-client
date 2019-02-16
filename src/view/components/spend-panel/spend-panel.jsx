import React, {Component}   from 'react'
import {PlayerStateStore}   from 'stores'
import {GameCommandActions} from 'action-creators'
import './spend-panel.scss'

class SpendPanel extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            empire: PlayerStateStore.get().player.empire
        }

        this.onBuildBtnClick     = this.onBuildBtnClick.bind(this)
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    }
    
    render() {
        const {cost}   = this.props.facet_item
        const {empire} = this.state

        return (
            <div className="spend-panel">
                <div className="spend-panel-cost-view">
                    {Object.keys(cost || {}).map(cost_key => {
                        const player_has   = empire ? empire.resources[cost_key].count : 0
                        const player_needs = cost[cost_key]
                        const color        = player_has >= player_needs ? `green` : `red`

                        return (
                            <div 
                                className="spend-panel-cost-item"
                                key={cost_key}
                                style={{color}}
                            >
                                {player_has}/{player_needs} {cost_key}
                            </div>
                        )
                    })}
                </div>
                <div className="spend-panel-build-btn" onClick={this.onBuildBtnClick}>+</div>
                <progress className="spend-panel-build-progress" value={0.3} max={1}></progress>
            </div>      
        )
    }

    onBuildBtnClick() {
        GameCommandActions.buildConstruct(this.props.facet_item_key)
    }

    onPlayerStateChange(data) {
        this.setState({
            empire: PlayerStateStore.get().player.empire
        })
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }
    
}
export default SpendPanel
