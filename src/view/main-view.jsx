import React, {Component} from 'react'
import {
    APIStore,
    PlayerStateStore,
}                         from 'stores'
import {AppActions}       from 'action-creators'
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

APIStore.on(APIStore.API_SOCKET_CONNECTED, api_socket => {
    AppActions.shareAPISocket(api_socket)
})        

APIStore.on(APIStore.API_SOCKET_ERROR, api_socket_err => {
    console.error({api_socket_err})
    AppActions.shareAPISocketError(api_socket_err)
})