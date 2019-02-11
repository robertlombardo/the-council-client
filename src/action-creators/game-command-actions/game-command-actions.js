import Dispatcher       from 'dispatcher'
import GameCommandFuncs from './game-command-funcs'

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

        const func = GameCommandFuncs[command]
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
