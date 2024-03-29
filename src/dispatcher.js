import EventEmitter from 'events'

const Dispatcher = Object.assign({}, EventEmitter.prototype, {
    // app-actions
    GOT_API_SOCKET   : `GOT_API_SOCKET`,
    API_SOCKET_ERROR : `API_SOCKET_ERROR`,
    
    // player-state-actions
    GOT_PLAYER_STATE    : `GOT_PLAYER_STATE`,
    PLAYER_ROOM_CHANGED : `PLAYER_ROOM_CHANGED`,
	
    // game-command-actions
    GAME_COMMAND_ENTERED      : `GAME_COMMAND_ENTERED`,
	UNKNOWN_COMMAND_ENTERED   : `UNKNOWN_COMMAND_ENTERED`,
	LOOK                      : `LOOK`,
    BUILD_CONSTRUCT_REQUESTED : `BUILD_CONSTRUCT_REQUESTED`,
    BUILD_CONSTRUCT_CONFIRMED : `BUILD_CONSTRUCT_CONFIRMED`,

    // ui-actions
    HEADER_CONTROL_VIEW_SELECTED : `HEADER_CONTROL_VIEW_SELECTED`,

    dispatch: action => {
        Dispatcher.emit(action.type, action);
    },
})
export default Dispatcher
