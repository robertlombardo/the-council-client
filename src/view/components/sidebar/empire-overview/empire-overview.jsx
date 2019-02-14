import React, {Component} from 'react'
import {
    PlayerStateStore,
    UIStateStore,
}                         from 'stores'
import {UIActions}        from 'action-creators'
import './empire-overview.scss'

const EMPIRE_FACET_NAMES = {
    constructs : `Constructs`,
    citizens   : `Citizens`,
    resources  : `Resources`,
}

const EMPIRE_FACET_ITEM_NAMES = {
    // constructs
    camps     : `Camps`,

    // citizens
    hunters   : `Hunters`,
    gatherers : `Gatherers`,

    // resources
    food      : `Food`,
    wood      : `Wood`,
    pelts     : `Pelts`,
    leather   : `Leather`,
}

class EmpireOverview extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            empire                  : PlayerStateStore.get().player.empire || {},
            header_control_view_key : UIStateStore.get().header_control_view_key 
        }

        this.onPlayerStateChange        = this.onPlayerStateChange.bind(this)
        this.onHeaderControlViewChanged = this.onHeaderControlViewChanged.bind(this)
    }
    
    render() {
        const {empire} = this.state

        return (
            <div className="sidebar-view empire-overview">
               <div className="sidebar-view-title">Empire Overview</div>
               {Object.keys(empire).map(empire_facet_key => {
                    return (
                        <div className="sub-container empire-facet-view" key={empire_facet_key}>
                            <div className="empire-facet-name">{EMPIRE_FACET_NAMES[empire_facet_key]}</div>
                            {Object.keys(empire[empire_facet_key]).map(empire_facet_item_key => {
                                const selected_class = this.state.header_control_view_key === empire_facet_item_key ? " empire-facet-item-selected" : ""

                                return (
                                    <div className={"empire-facet-item" + selected_class}
                                         key={empire_facet_item_key}
                                         onClick={this.onEmpireFacetItemClicked.bind(null, empire_facet_item_key)}
                                    >
                                        <div className="empire-facet-item-label">{EMPIRE_FACET_ITEM_NAMES[empire_facet_item_key]}:</div>
                                        <div className="empire-facet-item-value">{empire[empire_facet_key][empire_facet_item_key].count}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>      
        )
    }

    onPlayerStateChange(data) {
        this.setState({
            empire: data.new_player_state.empire
        })
    }

    onHeaderControlViewChanged(new_header_control_view_key) {
        this.setState({
            header_control_view_key: new_header_control_view_key
        })
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
        UIStateStore.on(UIStateStore.HEADER_CONTROL_VIEW_CHANGED, this.onHeaderControlViewChanged)
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
        UIStateStore.removeListener(UIStateStore.HEADER_CONTROL_VIEW_CHANGED, this.onHeaderControlViewChanged)
    }

    onEmpireFacetItemClicked(empire_facet_item_key) {
        UIActions.selectHeaderControlView(empire_facet_item_key)
    }
    
}
export default EmpireOverview
