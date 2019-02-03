import EventEmitter from 'events'

const Dispatcher = Object.assign({}, EventEmitter.prototype, {
    // action types
    API_SOCKET_CONNECTED : `API_SOCKET_CONNECTED`,
	ENTER_MESSAGE        : `ENTER_MESSAGE`,

    dispatch: action => {
        Dispatcher.emit(action.type, action);
    },
})
export default Dispatcher