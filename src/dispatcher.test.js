import Dispatcher from 'dispatcher'

it(`emits the message of the specified type`, done => {
	Dispatcher.on(`foo`, () => {
		done()
	})
	Dispatcher.dispatch({type: `foo`})
})

it(`emits the action payload`, done => {
	const payload = {bar: `baz`}

	Dispatcher.on(`foo`, action => {
		expect(JSON.stringify(action.payload)).toBe(JSON.stringify(payload))
		done()
	})
	Dispatcher.dispatch({type: `foo`, payload})
})
