import Dispatcher from 'dispatcher'

const GameCommandActions = {
    enterGameCommand: text => {
        const command      = text.split(` `)[0]
        const command_body = text.slice(command.length + 1)

        console.log({command, command_body})

        Dispatcher.dispatch({
            type    : Dispatcher.GAME_COMMAND_ENTERED,
            payload : {text}
        })
    },
}
export default GameCommandActions

const say = message => {
    // api_socket.emit(`publish`, {
    //     channel: currentChannel,        
    //     message
    // })
}

const FUNCS_BY_COMMAND = {
    [`'`]   : say,
    [`"`]   : say,
    [`say`] : say,
}
