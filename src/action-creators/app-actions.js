import Dispatcher from 'dispatcher'

const AppActions = {
	shareAPISocket: api_socket => {
		Dispatcher.dispatch({
			type    : Dispatcher.GOT_API_SOCKET,
			payload : {api_socket} 
		})
	},

	shareAPISocketError: api_socket_err => {
		Dispatcher.dispatch({
			type    : Dispatcher.API_SOCKET_ERROR,
			payload : {api_socket_err} 
		})
	},
}
export default AppActions
