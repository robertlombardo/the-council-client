import React, {Component} from 'react'
import {PlayerStateStore} from 'stores'
import './empire-overview.scss'

const EMPIRE_FACET_NAMES = {
    constructs : `Constructs`,
    citizens   : `Citizens`,
    resources  : `Resources`,
}

const EMPIRE_FACET_ITEM_NAMES = {
    // constructs
    camps      : `Camps`,

    // citizens
    hunters    : `Hunters`,
    gatherers  : `Gatherers`,

    // resources
    food       : `Food`,
    wood       : `Wood`,
    pelts      : `Pelts`,
    leather    : `Leather`,
}

class EmpireOverview extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            empire: PlayerStateStore.get().player.empire || {}
        }

        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
    }
    
    render() {
        const {empire} = this.state

        return (
            <div className="sidebar-view empire-overview">
               <div className="sidebar-view-title">Empire Overview</div>
               {Object.keys(empire).map(empire_facet_key => {
                    return (
                        <div className="empire-facet-view" key={empire_facet_key}>
                            <div className="empire-facet-name">{EMPIRE_FACET_NAMES[empire_facet_key]}</div>
                            {Object.keys(empire[empire_facet_key]).map(empire_facet_item_key => {
                                return (
                                    <div className="empire-facet-item" key={empire_facet_item_key}>
                                        <div className="empire-facet-item-label">{EMPIRE_FACET_ITEM_NAMES[empire_facet_item_key]}:</div>
                                        <div className="empire-facet-item-value">{empire[empire_facet_key][empire_facet_item_key]}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>      
        )
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }

    onPlayerStateChange(data) {
        this.setState({
            empire: data.new_player_state.empire
        })
    }
    
}
export default EmpireOverview
