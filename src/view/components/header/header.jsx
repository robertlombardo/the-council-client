import React, {Component} from 'react'
import PlayerAvatar       from './player-avatar/player-avatar'
import HeaderControlPanel from './header-control-panel/header-control-panel'
import './header.scss'

class Header extends Component {

    // constructor(props, context) {
    //     super(props, context)
    // }
    
    render() {
        return (
            <div className="header">
               <PlayerAvatar />
               <HeaderControlPanel />
            </div>      
        )
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
}
export default Header
