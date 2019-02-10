import Dispatcher         from 'dispatcher'
import {PlayerStateStore} from 'stores'

const PlayerStateActions = {
	roomChange: player => {
		Dispatcher.dispatch({
			type    : Dispatcher.PLAYER_ROOM_CHANGED,
			payload : {player} 
		})
	},
}
export default PlayerStateActions

PlayerStateStore.on(PlayerStateStore.GOT_PLAYER_STATE, data => {
	const {new_player_state, old_player_state} = data
	if (new_player_state.room_id != old_player_state.room_id) PlayerStateActions.roomChange(new_player_state)
})        
