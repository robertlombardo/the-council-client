import React, {Component} from 'react'
import {
    GameLogView,
    Header,
    Sidebar,
} from 'view/components'
import './main-view.scss'

class MainView extends Component {
    render() {
        return (
            <div className="root-layout" id="root-layout">
                <div className="main-column">
                    <Header />
                    <GameLogView />
                </div>
                <Sidebar />
            </div>
        )
    }
}
export default MainView
