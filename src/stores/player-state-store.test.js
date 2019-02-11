import Dispatcher       from 'dispatcher'
import io               from 'socket.io-client'
import PlayerStateStore from './player-state-store'

const mock_player = {
	id: `1`, 
	display_name: `bob`,
	room_id: `room_0`,
	room: {
		description: `a mock room`,
		players: [
			{id: `2`, display_name: `flerpy`}
		],
		exits: [{
			north: {
				to: `room_n`
			}
		}]
	}
}

const mock_api_socket = io.connect()
Dispatcher.emit(Dispatcher.GOT_API_SOCKET, {payload: {api_socket: mock_api_socket}})

it(`provides a getter for the player object`, () => {
	const {player} = PlayerStateStore.get()
	expect(typeof player).toBe('object')
})

it(`updates the player obj & emits a PLAYER_STATE_CHANGE event on the "player_state" socket msg`, done => {
	PlayerStateStore.on(PlayerStateStore.PLAYER_STATE_CHANGE, data => {
		expect(JSON.stringify(data.new_player_state)).toBe(JSON.stringify(mock_player))
		done()
	})

	mock_api_socket.emit(`player_state`, mock_player)
})
