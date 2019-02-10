import EventEmitter from 'events'

const Dispatcher = Object.assign({}, EventEmitter.prototype, {
    // action types
    GOT_API_SOCKET          : `GOT_API_SOCKET`,
    API_SOCKET_ERROR        : `API_SOCKET_ERROR`,
    GOT_PLAYER_STATE        : `GOT_PLAYER_STATE`,
	GAME_COMMAND_ENTERED    : `GAME_COMMAND_ENTERED`,
	UNKNOWN_COMMAND_ENTERED : `UNKNOWN_COMMAND_ENTERED`,

    dispatch: action => {
        Dispatcher.emit(action.type, action);
    },
})
export default Dispatcher
