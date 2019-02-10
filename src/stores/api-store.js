import EventEmitter from 'events'
import io           from 'socket.io-client'

// config
const API_ADDRESS = process.env.NODE_ENV === `production` ? 'foo'
	// : process.env.NODE_ENV === `qa` ? 'bar'
	: `http://localhost:8081`
const secure = process.env.NODE_ENV === `production` || process.env.NODE_ENV === `qa`

// the stuff we serve
let api_socket = io.connect(API_ADDRESS, {
    secure,
    transports : [`websocket`]
})

const APIStore = Object.assign({}, EventEmitter.prototype, {
	API_SOCKET_CONNECTED : `GOT_API_SOCKET`,
	API_SOCKET_ERROR     : `API_SOCKET_ERROR`,

	get: () => {
		return {
			api_socket
		}
	}
})
export default APIStore

api_socket.on(`connected`, () => {
	APIStore.emit(APIStore.API_SOCKET_CONNECTED, api_socket)
})

api_socket.on(`error`, api_socket_err => {
	APIStore.emit(APIStore.API_SOCKET_ERROR, api_socket_err)
})
