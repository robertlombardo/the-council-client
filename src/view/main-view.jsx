import React, {Component} from 'react'
import {Chat}             from 'view/components'

class MainView extends Component {
    render() {
        return (
            <div className="root-layout" id="root-layout">
                <div className="game-canvas" id="game-canvas"></div>
                <Chat />
                {/*<Modals />*/}
                {/*this.getKongRegistrationBtn()*/}
                {/*<div className="overlay-canvas" id="overlay-canvas"></div>*/}
            </div>
        )
    }
}
export default MainView
