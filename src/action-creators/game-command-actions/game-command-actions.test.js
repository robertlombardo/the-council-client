import Dispatcher           from 'dispatcher'
import {GameCommandActions} from 'action-creators'
import {APIStore}           from 'stores'

it(`dispatches the GAME_COMMAND_ENTERED payload for a valid command`, done => {
	const mock_say_command = `say hello`

	Dispatcher.on(Dispatcher.GAME_COMMAND_ENTERED, action => {
		const {text, command, command_body} = action.payload
		expect(text).toBe(mock_say_command)
		expect(command).toBe(`say`)
		expect(command_body).toBe(`hello`)
		done()
	})

	setTimeout(() => {
		GameCommandActions.enterGameCommand(mock_say_command)
	}, 120) // have to wait for the mock socket to connect
})

it(`dispatches the UNKNOWN_COMMAND_ENTERED payload for an invalid command`, done => {
	const mock_unknown_command = `jarby fruit flies`

	Dispatcher.on(Dispatcher.UNKNOWN_COMMAND_ENTERED, action => {
		const {command} = action.payload
		expect(command).toBe(`jarby`)
		done()
	})

	setTimeout(() => {
		GameCommandActions.enterGameCommand(mock_unknown_command)
	}, 120) // have to wait for the mock socket to connect
})
