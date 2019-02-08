import Chatctions from './chat-actions'
import Dispatcher from 'dispatcher'

it(`dispatches the ENTER_MESSAGE message + payload`, done => {
	const mock_message = `foo`

	Dispatcher.on(Dispatcher.ENTER_MESSAGE, action => {
		expect(action.payload.text).toBe(mock_message)
		done()
	})

	Chatctions.enterMessage(mock_message)
})
