import GameCommandFuncs from './game-command-funcs'
import {AppActions}     from 'action-creators'
import {APIStore}       from 'stores'

const mock_api_socket = APIStore.get().api_socket

it(`['say']() emits the "player_say" message + payload from the api_socket`, done => {
	mock_api_socket.on(`player_say`, data => {
		expect(data.command_body).toBe(`hello`)
		done()
	})

	setTimeout(() => {
		GameCommandFuncs[`say`](`hello`)
	}, 120)
})

it(`["'"]() emits the "player_say" message + payload from the api_socket`, done => {
	mock_api_socket.on(`player_say`, data => {
		expect(data.command_body).toBe(`hello`)
		done()
	})

	setTimeout(() => {
		GameCommandFuncs[`'`](`hello`)
	}, 120)
})

it(`['"']() emits the "player_say" message + payload from the api_socket`, done => {
	mock_api_socket.on(`player_say`, data => {
		expect(data.command_body).toBe(`hello`)
		done()
	})

	setTimeout(() => {
		GameCommandFuncs[`"`](`hello`)
	}, 120)
})

it(`['go']() emits the "player_go" message + payload from the api_socket`, done => {
	mock_api_socket.on(`player_go`, data => {
		expect(data.command_body).toBe(`narnia`)
		done()
	})

	setTimeout(() => {
		GameCommandFuncs[`go`](`narnia`)
	}, 120)
})
