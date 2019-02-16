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
    empire          : undefined,
}

const PlayerStateStore = Object.assign({}, EventEmitter.prototype, {
	PLAYER_STATE_CHANGE : `PLAYER_STATE_CHANGE`,
	PRODUCT             : `PRODUCT`,

	get: () => {
		return Object.assign({}, {
			player
		})
	}
})
export default PlayerStateStore

Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
	api_socket = action.payload.api_socket

	if (!api_socket.player_state_store_listeners_registered) {
		api_socket.on(`player_state`,             onPlayerState)
		api_socket.on(`product`     ,             onProduct)
		api_socket.on(`construct_build_started`,  onConstructBuildStarted)
		api_socket.on(`construct_build_complete`, onConstructBuildComplete)
		// TODO - `already_building`
		// TODO - `not_enough_resources`

		api_socket.player_state_store_listeners_registered = true
	}
})

function onPlayerState(new_player_state) {
	const old_player_state = Object.assign({}, player)
	player                 = new_player_state

	PlayerStateStore.emit(PlayerStateStore.PLAYER_STATE_CHANGE, {old_player_state, new_player_state})
}

function onProduct(data) {
	onPlayerState(data.player)
	PlayerStateStore.emit(PlayerStateStore.PRODUCT, data)
}

function onConstructBuildStarted(data) {
	onPlayerState(data.player)
}

function onConstructBuildComplete(data) {
	onPlayerState(data.player)
}