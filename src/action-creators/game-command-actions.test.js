import GameCommandActions from './game-command-actions'
import Dispatcher         from 'dispatcher'

it(`dispatches the ENTER_MESSAGE message + payload`, done => {
	const mock_message = `foo`

	Dispatcher.on(Dispatcher.GAME_COMMAND_ENTERED, action => {
		expect(action.payload.text).toBe(mock_message)
		done()
	})

	GameCommandActions.enterGameCommand(mock_message)
})
