import GameLogStoreFuncs from './game-log-store-funcs'

it(`getRoomDescription() makes 3 log entries (description, players, exits`, () => {
	const mock_room = {
		description : `a mock room`,
		players     : [{id: `1`, display_name: `flerpy`}],
		exits       : {north: {to: `north_room`}}
	}

	const log_data = GameLogStoreFuncs.getRoomDescription(mock_room)
	expect(log_data.length).toBe(3)
	expect(log_data[0].text.includes(`a mock room`)).toBe(true)
	expect(log_data[1].text.includes(`flerpy`)).toBe(true)
	expect(log_data[2].text.includes(`north`)).toBe(true)
})
