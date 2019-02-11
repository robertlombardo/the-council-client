import React, {Component}   from 'react'
import './player-avatar.scss'

class PlayerAvatar extends Component {

    constructor(props, context) {
        super(props, context)
    }
    
    render() {
        return (
            <div className="player-avatar container">
               I'm an avatar
            </div>      
        )
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
}
export default PlayerAvatar
