import EventEmitter from 'events'
import io           from 'socket.io-client'
import {AppActions} from 'action-creators'

// config
const API_ADDRESS = process.env.NODE_ENV === `production` ? 'foo'
	// : process.env.NODE_ENV === `qa` ? 'bar'
	: `http://localhost:8081`
const secure = process.env.NODE_ENV === `production` || process.env.NODE_ENV === `qa`

let api_socket

const APIStore = Object.assign({}, EventEmitter.prototype, {
	get: () => {
		return {
			api_socket
		}
	}
})
export default APIStore

api_socket = io.connect(API_ADDRESS, {
    path       : `/socket.io`,
    secure,
    transports : [`websocket`]
})

api_socket.on(`connected`, () => {
	AppActions.APISocketConnected(api_socket)
})

api_socket.on(`error`, api_socket_err => {
  console.error({api_socket_err})
  AppActions.APISocketError(api_socket_err)
})
