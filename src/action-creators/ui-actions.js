import Dispatcher from 'dispatcher'

const UIActions = {
	selectHeaderControlView: header_control_view_key => {
		Dispatcher.dispatch({
			type    : Dispatcher.HEADER_CONTROL_VIEW_SELECTED,
			payload : {header_control_view_key} 
		})
	},
}
export default UIActions
