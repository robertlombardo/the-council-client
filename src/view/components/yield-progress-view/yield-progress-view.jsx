import React, {Component} from 'react'
import './yield-progress-view.scss'

class YieldProgressView extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            current_view: `empire_overview`
        }
    }
    
    render() {
        return (
            <div className="yield-progress-view">
               <div className="yield-progress-view-label">
               </div>
               <progress value={this.props.progress} max={1}></progress>
            </div>      
        )
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
}
export default YieldProgressView
