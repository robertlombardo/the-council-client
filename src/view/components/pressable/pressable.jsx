import React, {Component} from 'react'
import './pressable.scss'

class Pressable extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {pressed: false}

        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp   = this.onMouseUp.bind(this)
        this.onMouseOut  = this.onMouseOut.bind(this)
    }
    
    render() {
        const child_style = this.state.pressed ? {transform : `scale(0.9)`} : {}

        return (
            <div className="pressable" onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseOut={this.onMouseOut}>
                <div className="pressable-child-invis">{this.props.child}</div>{/*maintains the wrapper size*/}
                <div className="pressable-child" style={child_style}>{this.props.child}</div>
            </div>      
        )
    }

    onMouseDown() {
        this.setState({pressed: true})
    }

    onMouseUp() {
        this.setState({pressed: false})
    }

    onMouseOut() {
        this.setState({pressed: false})
    }
}
export default Pressable
