import Dispatcher from 'dispatcher'
import {APIStore} from 'stores'

const GameCommandActions = {
    enterGameCommand: text => {
        let command, command_body
        const first_char = text[0]
        if (first_char === `'` || first_char === `"`) {
            command = `say`
            command_body = text.slice(1)
        } else {
            command      = text.split(` `)[0]
            command_body = text.slice(command.length + 1)   
        }

        const func = FUNCS_BY_COMMAND[command]
        if (func) {
            func(command_body)

            Dispatcher.dispatch({
                type    : Dispatcher.GAME_COMMAND_ENTERED,
                payload : {text, command, command_body}
            })
        } else {
            Dispatcher.dispatch({
                type    : Dispatcher.UNKNOWN_COMMAND_ENTERED,
                payload : {command}
            })
        }
    },
}
export default GameCommandActions

let api_socket
APIStore.on(APIStore.API_SOCKET_CONNECTED, as => {
    api_socket = as
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

const FUNCS_BY_COMMAND = {
    [`'`]    : playerSay,
    [`"`]    : playerSay,
    [`say`]  : playerSay,
    [`go`]   : playerGo,
    [`look`] : look,
}
