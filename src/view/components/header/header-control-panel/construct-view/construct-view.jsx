import React, {Component}  from 'react'
import {YieldProgressView} from 'view/components'
import TweenMax, {Linear} from 'gsap'
import {PlayerStateStore}  from 'stores'
import './construct-view.scss'

const TITLES = {
    camps    : `Camps`,
    villages : `Villages`,
    hamlets  : `Hamlets`,
}

class ConstructView extends Component {

    constructor(props, context) {
        super(props, context)

        const {empire}  = PlayerStateStore.get().player
        const construct = empire ? empire.constructs[props.view_key] : {}

        this.state = {
            construct,
            yield_progress : empire ? (new Date().getTime() - construct.last_yield) / construct.interval : 0
        }

        this.onPlayerStateChange        = this.onPlayerStateChange.bind(this)
        this.makeYieldProgressDummy     = this.makeYieldProgressDummy.bind(this)
        this.onYieldProgressDummyUpdate = this.onYieldProgressDummyUpdate.bind(this)

        this.makeYieldProgressDummy()
    }
    
    render() {
        const {construct, yield_progress} = this.state

        return (
            <div className="contstruct-view">
                <div className="sub-container construct-view-quick-info">
                    <div className="connstruct-view-title">{TITLES[this.props.view_key]}</div>
                    <div className="construct-view-count">{construct.count}</div>
                </div>
                <div className="sub-container construct-view-main-panel">
                    <div className="construct-view-build-new">
                        build new
                    </div>
                    <div className="construct-view-yield-progress">
                        <YieldProgressView progress={yield_progress} />
                    </div>
                    <div className="construct-view-manual-controls">
                        manual controls
                    </div>
                </div>
            </div>      
        )
    }

    onPlayerStateChange(data) {
        const construct      = data.new_player_state.empire.constructs[this.props.view_key]
        const yield_progress = (new Date().getTime() - construct.last_yield) / construct.interval
        
        this.setState({
            construct,
            yield_progress,
        })

        this.makeYieldProgressDummy()
    }

    makeYieldProgressDummy() {
        const {construct, yield_progress} = this.state
        const remaining_sec               = ((1 - yield_progress) * construct.interval) / 1000
        const yp_dummy                    = {yield_progress}

        this.yield_progress_tween = TweenMax.to(yp_dummy, remaining_sec, {
            yield_progress : 1,
            ease           : Linear.easeNone,
            onUpdate       : this.onYieldProgressDummyUpdate,
            onUpdateParams : [yp_dummy]
        })
    }

    onYieldProgressDummyUpdate(yp_dummy) {
        this.setState({yield_progress: yp_dummy.yield_progress})
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.PLAYER_STATE_CHANGE, this.onPlayerStateChange)

        if (this.yield_progress_tween) this.yield_progress_tween.kill()
    }
    
}
export default ConstructView
