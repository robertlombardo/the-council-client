import io         from 'socket.io-client'
import Dispatcher from 'dispatcher'
import AppActions from './app-actions'
import {APIStore} from 'stores'

const mock_api_socket = io.connect()

it(`dispatches the GOT_API_SOCKET message + payload`, done => {
	Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
		expect(JSON.stringify(action.payload.api_socket)).toBe(JSON.stringify(mock_api_socket))
		done()
	})

	AppActions.shareAPISocket(mock_api_socket)
})

it(`dispatches the API_SOCKET_ERROR message + payload`, done => {
	const mock_api_err = {foo: `bar`}

	Dispatcher.on(Dispatcher.API_SOCKET_ERROR, action => {
		expect(JSON.stringify(action.payload.api_socket_err)).toBe(JSON.stringify(mock_api_err))
		done()
	})

	AppActions.shareAPISocketError(mock_api_err)
})

it(`dispatches the API_SOCKET_ERROR message + payload (when originated from APIStore)`, done => {
	const mock_api_err = {foo: `bar`}

	Dispatcher.on(Dispatcher.API_SOCKET_ERROR, action => {
		expect(JSON.stringify(action.payload.api_socket_err)).toBe(JSON.stringify(mock_api_err))
		done()
	})

	APIStore.emit(APIStore.API_SOCKET_ERROR, mock_api_err)
})
