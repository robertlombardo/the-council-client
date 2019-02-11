import EventEmitter          from 'events'
import Dispatcher            from 'dispatcher'
import GameLogStoreCallbacks from './game-log-store-callbacks'
import GameLogStoreFuncs     from './game-log-store-funcs'

// inject this func for access to the game_log & store emitter:
GameLogStoreFuncs.pushToGameLog = (channel, log_data) => {
    if (channel === `current`) channel = current_channel

    if (Array.isArray(log_data)) game_log[channel] = game_log[channel].concat(log_data) 
    else game_log[channel].push(log_data)

    GameLogStore.emit(GameLogStore.GOT_MESSAGE_EVENT) // TODO - call it NEW_LOG_DATA
}

const {
    onAnyPlayerLeftRoom,
    onLookCommand,
    onOtherPlayerJoinedRoom,
    onPlayerRoomChanged,
    onPlayerSaid,
    onPlayerState,
    onUnknownCommandEntered,
} = GameLogStoreCallbacks

// config
const NOTIFICATION_COLOR = `#d7d00e`;

// private
let api_socket
let listeners_registered = false

// the stuff we serve
let game_log = {
    room: [ 
        {user: `Wakefield Studios`, text: `You have entered the world of The Council ...`, color: NOTIFICATION_COLOR},
    ]
};
let current_channel = `room`;

const GameLogStore = Object.assign({}, EventEmitter.prototype, {  
    GOT_MESSAGE_EVENT: `GOT_MESSAGE_EVENT`,
    
    get: () => {
        return {
            game_log,
            current_channel
        }
    }
})
export default GameLogStore

Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
    if (listeners_registered) return

    api_socket = action.payload.api_socket

    // TODO - remove listeners when socket closed/destroyed/broken
    api_socket.on(`player_joined_room`, onOtherPlayerJoinedRoom)
    api_socket.on(`player_left_room`,   onAnyPlayerLeftRoom)
    api_socket.on(`player_said`,        onPlayerSaid)

    listeners_registered = true
})

Dispatcher.on(Dispatcher.GOT_PLAYER_STATE, onPlayerState)
Dispatcher.on(Dispatcher.LOOK, onLookCommand)
Dispatcher.on(Dispatcher.PLAYER_ROOM_CHANGED, onPlayerRoomChanged)
Dispatcher.on(Dispatcher.UNKNOWN_COMMAND_ENTERED, onUnknownCommandEntered)
