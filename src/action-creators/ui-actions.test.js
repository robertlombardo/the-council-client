import UIActions  from './ui-actions'
import Dispatcher from 'dispatcher'

it(`dispatches the specified header control view tag on selectHeaderControlView()`, done => {
	const mock_header_control_view_key = `foo_ninnies`

	Dispatcher.on(Dispatcher.HEADER_CONTROL_VIEW_SELECTED, action => {
		expect(action.payload.header_control_view_key).toBe(mock_header_control_view_key)
		done()
	})

	UIActions.selectHeaderControlView(mock_header_control_view_key)
})
