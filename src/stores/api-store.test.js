import APIStore   from './api-store'
import Dispatcher from 'dispatcher'

it(`provides a getter for the socket connection`, () => {
	const {api_socket} = APIStore.get()
	expect(api_socket.foo).toBe(`bar`)
})

it(`dispatches the API_SOCKET_CONNECTED event, with an api_socket payload`, done => {
	Dispatcher.on(Dispatcher.API_SOCKET_CONNECTED, action => {
		expect(action.payload.api_socket.foo).toBe(`bar`)
		done()
	})
})

it(`dispatches the API_SOCKET_ERROR event, with an api_socket_err payload`, done => {
	const mock_err = {foo: `bar`}

	Dispatcher.on(Dispatcher.API_SOCKET_ERROR, action => {
		expect(JSON.stringify(action.payload.api_socket_err)).toBe(JSON.stringify(mock_err))
		done()
	})

	APIStore.get().api_socket.emit(`error`, mock_err)
})
