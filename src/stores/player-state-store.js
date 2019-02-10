import EventEmitter from 'events'
import Dispatcher   from 'dispatcher'

// private
let api_socket

// the stuff we serve
var player = {
    display_name    : undefined,
    gender          : undefined,
    chat_text_color : undefined,
    room_id         : undefined,
}

const PlayerStateStore = Object.assign({}, EventEmitter.prototype, {
	GOT_PLAYER_STATE: `GOT_PLAYER_STATE`,

	get: () => {
		return Object.assign({}, {
			player
		})
	}
})
export default PlayerStateStore

Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
	api_socket = action.payload.api_socket

	api_socket.on(`player_state`, onPlayerState)
})

function onPlayerState(player) {
	player = player
	PlayerStateStore.emit(PlayerStateStore.GOT_PLAYER_STATE, player)
}
