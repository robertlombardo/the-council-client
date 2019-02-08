import Dispatcher from 'dispatcher'

const AppActions = {
	APISocketConnected: api_socket => {
		Dispatcher.dispatch({
			type    : Dispatcher.API_SOCKET_CONNECTED,
			payload : {api_socket} 
		})
	},

	APISocketError: api_socket_err => {
		Dispatcher.dispatch({
			type    : Dispatcher.API_SOCKET_ERROR,
			payload : {api_socket_err} 
		})
	},
}
export default AppActions
