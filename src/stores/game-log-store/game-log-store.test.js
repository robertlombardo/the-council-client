import Dispatcher           from 'dispatcher'
import {PlayerStateActions} from 'action-creators'
import GameLogStore         from './game-log-store'

// set a mock player reference
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
PlayerStateActions.sharePlayerState(mock_player)

it(`provides a getter for the game_log & current_channel`, () => {
	const {game_log, current_channel} = GameLogStore.get()
	expect(Array.isArray(game_log.room)).toBe(true)
	expect(typeof current_channel).toBe(`string`)
})

it(`logs the current room description on the Dispatcher.LOOK message`, done => {
	Dispatcher.emit(Dispatcher.LOOK)
	setTimeout(() => {
		const room_log = GameLogStore.get().game_log.room
		const description_log = room_log[room_log.length - 3]
		expect(description_log.text.includes(mock_player.room.description)).toBe(true)
		done()
	}, 100)
})