import React, {Component} from 'react'
import TweenMax, {Linear} from 'gsap'
import {PlayerStateStore} from 'stores'
import './yield-progress-view.scss'

class YieldProgressView extends Component {

    constructor(props, context) {
        super(props, context)

        console.log({props})

        const {yielder}      = this.props
        const yield_progress = yielder && yielder.last_yield && yielder.interval ? (new Date().getTime() - yielder.last_yield) / yielder.interval : 0

        this.state = {
            yield_progress
        }

        this.onYield                    = this.onYield.bind(this)
        this.onYieldProgressDummyUpdate = this.onYieldProgressDummyUpdate.bind(this)

        this.makeYieldProgressTween(yield_progress)
    }
    
    render() {
        return (
            <div className="yield-progress-view">
               <div className="yield-progress-view-label">
               </div>
               <progress className="yield-progress-view-bar" value={this.state.yield_progress} max={1}></progress>
            </div>      
        )
    }

    onYield(data) {
        if (data.yielder_key !== this.props.yielder_key) return

        const {yielder}      = this.state
        const yield_progress = (new Date().getTime() - yielder.last_yield) / yielder.interval
        
        this.setState({
            yield_progress,
        })

        this.makeYieldProgressTween(yield_progress)
    }

    makeYieldProgressTween(yield_progress) {
        const remaining_sec               = ((1 - yield_progress) * this.props.yielder.interval) / 1000
        const yp_dummy                    = {yield_progress}

        if (this.yield_progress_tween) this.yield_progress_tween.kill()
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (JSON.stringify(this.props.yielder) !== JSON.stringify(prevProps.yielder)) {
            const {yielder}      = this.props
            const yield_progress = (new Date().getTime() - yielder.last_yield) / yielder.interval

            this.setState({
                yield_progress
            })

            this.makeYieldProgressTween(yield_progress)
        }
    }

    componentWillMount() {
        PlayerStateStore.on(PlayerStateStore.YIELD, this.onYield)
    }

    componentWillUnmount() {
        PlayerStateStore.removeListener(PlayerStateStore.YIELD, this.onYield)

        if (this.yield_progress_tween) this.yield_progress_tween.kill()
    }
    
}
export default YieldProgressView
