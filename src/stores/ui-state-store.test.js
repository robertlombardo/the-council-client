import UIStateStore from './ui-state-store'
import Dispatcher   from 'dispatcher'

it(`stores a reference to the selected header control view`, () => {
	const mock_header_control_view_key = `foo_ninnies`
	Dispatcher.emit(Dispatcher.HEADER_CONTROL_VIEW_SELECTED, {
		payload: {
			header_control_view_key: mock_header_control_view_key
		}
	})
	expect(UIStateStore.get().header_control_view_key).toBe(mock_header_control_view_key)
})

it(`emits the header control view key when changed`, done => {
	UIStateStore.on(UIStateStore.HEADER_CONTROL_VIEW_CHANGED, () => {
		done()
	})

	Dispatcher.emit(Dispatcher.HEADER_CONTROL_VIEW_SELECTED, {
		payload: {
			header_control_view_key: `foo`
		}
	})

	Dispatcher.emit(Dispatcher.HEADER_CONTROL_VIEW_SELECTED, {
		payload: {
			header_control_view_key: `bar`
		}
	})
})
