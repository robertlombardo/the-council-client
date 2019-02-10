import Dispatcher from 'dispatcher'
import {APIStore} from 'stores'

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

APIStore.on(APIStore.API_SOCKET_CONNECTED, api_socket => {
    AppActions.shareAPISocket(api_socket)
})        

APIStore.on(APIStore.API_SOCKET_ERROR, api_socket_err => {
    console.error({api_socket_err})
    AppActions.shareAPISocketError(api_socket_err)
})
