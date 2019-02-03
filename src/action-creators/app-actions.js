import Dispatcher from 'dispatcher'

const AppActions = {
	APISocketConnected: api_socket => {
		Dispatcher.dispatch({
			type    : Dispatcher.API_SOCKET_CONNECTED,
			payload : {api_socket} 
		})
	}
}
export default AppActions
