import Dispatcher from 'dispatcher'

let api_socket
Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
    api_socket = action.payload.api_socket
})

const playerSay = command_body => {
    api_socket.emit(`player_say`, {        
        command_body
    })
}

const playerGo = command_body => {
    api_socket.emit(`player_go`, {
        command_body
    })
}

const look = command_body => {
    Dispatcher.dispatch({type: Dispatcher.LOOK})
}

export default {
    // text commands
    [`'`]    : playerSay,
    [`"`]    : playerSay,
    [`say`]  : playerSay,
    [`go`]   : playerGo,
    [`look`] : look,
}
