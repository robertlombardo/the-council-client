import AppActions from './app-actions'
import Dispatcher from 'dispatcher'

it(`dispatches the API_SOCKET_CONNECTED message + payload`, done => {
	const mock_api_socket = {foo: `bar`}

	Dispatcher.on(Dispatcher.API_SOCKET_CONNECTED, action => {
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
