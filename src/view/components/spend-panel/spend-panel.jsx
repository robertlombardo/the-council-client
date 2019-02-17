import React, {Component}   from 'react'
import {Pressable}          from 'view/components'
import {RenderTools}        from 'tools'
import {PlayerStateStore}   from 'stores'
import {GameCommandActions} from 'action-creators'
import './spend-panel.scss'

const {makeProgressTween} = RenderTools

class SpendPanel extends Component {

    constructor(props, context) {
        super(props, context)

        const {facet_item}   = this.props
        const {build_time}   = facet_item
        const build_progress = facet_item && facet_item.build_start_time && build_time ? 
            (new Date().getTime() - facet_item.build_start_time) / build_time : 0

        this.state = {
            empire: PlayerStateStore.get().player.empire,
            build_progress,
        }

        this.onBuildBtnClick       = this.onBuildBtnClick.bind(this)
        this.onPlayerStateChange   = this.onPlayerStateChange.bind(this)
        this.onBuildProgressUpdate = this.onBuildProgressUpdate.bind(this)

        if (facet_item.build_start_time) {
            if (this.build_progress_tween) this.build_progress_tween.kill()
            this.build_progress_tween = makeProgressTween(build_progress, build_time, this.onBuildProgressUpdate)
        }
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
                        const color        = player_has >= player_needs ? `#00ff00` : `#ff0000`

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
                <Pressable child={(<div className="spend-panel-build-btn no-select" onClick={this.onBuildBtnClick}>+</div>)} />
                <progress className="progress spend-panel-build-progress" value={this.state.build_progress} max={1}></progress>
            </div>      
        )
    }

    onBuildBtnClick() {
        const {facet_item, facet_item_key} = this.props
        GameCommandActions.buildConstruct(facet_item, facet_item_key)
    }

    onPlayerStateChange(data) {
        const {facet_item}   = this.props
        const {build_time}   = facet_item
        const build_progress = facet_item && facet_item.build_start_time && build_time ? 
            (new Date().getTime() - facet_item.build_start_time) / build_time : 0

        this.setState({
            empire: PlayerStateStore.get().player.empire,
            build_progress,
        })

        if (facet_item.build_start_time) {
            if (this.build_progress_tween) this.build_progress_tween.kill()
            this.build_progress_tween = makeProgressTween(build_progress, build_time, this.onBuildProgressUpdate)
        }
    }

    onBuildProgressUpdate(progress_dummy) {
        this.setState({
            build_progress: progress_dummy.progress
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
