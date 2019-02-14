import EventEmitter from 'events'
import Dispatcher   from 'dispatcher'

// private
let api_socket
let listeners_registered = false

// the stuff we serve
var player = {
    display_name    : undefined,
    gender          : undefined,
    chat_text_color : undefined,
    room_id         : undefined,
    room            : undefined,
    empire          : undefined,
}

const PlayerStateStore = Object.assign({}, EventEmitter.prototype, {
	PLAYER_STATE_CHANGE  : `PLAYER_STATE_CHANGE`,

	get: () => {
		return Object.assign({}, {
			player
		})
	}
})
export default PlayerStateStore

Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
	if (listeners_registered) return

	api_socket = action.payload.api_socket

	api_socket.on(`player_state`, onPlayerState)
	api_socket.on(`yield`       , onYield)

	listeners_registered = true
})

function onPlayerState(new_player_state) {
	const old_player_state = Object.assign({}, player)
	player                 = new_player_state

	PlayerStateStore.emit(PlayerStateStore.PLAYER_STATE_CHANGE, {old_player_state, new_player_state})
}

function onYield(data) {
	console.log('\onYield')
	console.log({data})

	onPlayerState(data.player)
}
