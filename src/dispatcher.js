import EventEmitter from 'events'

const Dispatcher = Object.assign({}, EventEmitter.prototype, {
    // action types
    GOT_API_SOCKET       : `GOT_API_SOCKET`,
    API_SOCKET_ERROR     : `API_SOCKET_ERROR`,
	GAME_COMMAND_ENTERED : `GAME_COMMAND_ENTERED`,

    dispatch: action => {
        Dispatcher.emit(action.type, action);
    },
})
export default Dispatcher
