import GameLogStore          from './game-log-store'
import GameLogStoreCallbacks from './game-log-store-callbacks'
const {
    onAnyPlayerLeftRoom,
    onLookCommand,
    onOtherPlayerJoinedRoom,
    onPlayerRoomChanged,
    onPlayerSaid,
    onPlayerState,
    onUnknownCommandEntered,
} = GameLogStoreCallbacks

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
onPlayerState({payload: {player: mock_player}})

it(`creates a log when another player exits a room`, () => {
	onAnyPlayerLeftRoom({player: {id: `3`, display_name: `mcDerpy`}})

	const room_log = GameLogStore.get().game_log.room
	const last_log = room_log[room_log.length - 1]
	expect(last_log.text.includes(`mcDerpy exits`)).toBe(true)
})

it(`logs the current room description on onLookCommand()`, () => {
	setTimeout(() => {
		onLookCommand()
		const room_log = GameLogStore.get().game_log.room
		const description_log = room_log[room_log.length - 3]
		expect(description_log.text.includes(mock_player.room.description)).toBe(true)
		done()
	}, 100)
})

it(`creates a log when another player enters a room`, () => {
	onOtherPlayerJoinedRoom({player: {id: `4`, display_name: `jerry`}})
	const room_log = GameLogStore.get().game_log.room
	const last_log = room_log[room_log.length - 1]
	expect(last_log.text.includes(`jerry enters`)).toBe(true)
})

it(`logs the new room description on onPlayerRoomChanged()`, () => {
	setTimeout(() => {
		onPlayerRoomChanged(mock_player)
		const room_log = GameLogStore.get().game_log.room
		const description_log = room_log[room_log.length - 3]
		expect(description_log.text.includes(mock_player.room.description)).toBe(true)
		done()
	}, 100)
})

it(`logs a player's speech on onPlayerSaid()`, () =>{
	onPlayerSaid({player: mock_player, text: `hello`})
	const room_log = GameLogStore.get().game_log.room
	const last_log = room_log[room_log.length - 1]
	expect(last_log.user).toBe(mock_player.display_name)
	expect(last_log.text.includes(`hello`)).toBe(true)
})

it(`creates a log when an unknown command is entered`, () => {
	onUnknownCommandEntered({payload: {command: `darpalot`}})
	const room_log = GameLogStore.get().game_log.room
	const last_log = room_log[room_log.length - 1]
	expect(last_log.text.includes(`Unknown command`)).toBe(true)
	expect(last_log.text.includes(`darpalot`)).toBe(true)
})
