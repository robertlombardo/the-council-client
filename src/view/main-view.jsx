import React, {Component} from 'react'
import {GameLogView}      from 'view/components'

class MainView extends Component {
    render() {
        return (
            <div className="root-layout" id="root-layout">
                {/*<div className="game-canvas" id="game-canvas"></div>*/}
                <GameLogView />
                {/*<Modals />*/}
                {/*this.getKongRegistrationBtn()*/}
                {/*<div className="overlay-canvas" id="overlay-canvas"></div>*/}
            </div>
        )
    }
}
export default MainView
