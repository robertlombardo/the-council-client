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
    room            : undefined,
}

const PlayerStateStore = Object.assign({}, EventEmitter.prototype, {
	GOT_PLAYER_STATE     : `GOT_PLAYER_STATE`,
	PLAYER_CHANGED_ROOMS : `PLAYER_CHANGED_ROOMS`,

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

function onPlayerState(new_player_state) {
	const old_player_state = Object.assign({}, player)
	player                 = new_player_state

	PlayerStateStore.emit(PlayerStateStore.GOT_PLAYER_STATE, {old_player_state, new_player_state})
}
