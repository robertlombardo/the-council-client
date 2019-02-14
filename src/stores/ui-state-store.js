import EventEmitter from 'events'
import Dispatcher   from 'dispatcher'

// the stuff we serve
let header_control_view_key = `camps` // `avatar_overview`

const UIStateStore = Object.assign({}, EventEmitter.prototype, {
	// messages we emit
	HEADER_CONTROL_VIEW_CHANGED: `HEADER_CONTROL_VIEW_CHANGED`,

	get: () => {
		return Object.assign({}, {
			header_control_view_key
		})
	}
})
export default UIStateStore

Dispatcher.on(Dispatcher.HEADER_CONTROL_VIEW_SELECTED, action => {
	const old_header_control_view_key = header_control_view_key
	header_control_view_key           = action.payload.header_control_view_key

	if (header_control_view_key !== old_header_control_view_key) UIStateStore.emit(UIStateStore.HEADER_CONTROL_VIEW_CHANGED, header_control_view_key)
})
