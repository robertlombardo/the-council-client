import Dispatcher           from 'dispatcher'
import {PlayerStateActions} from 'action-creators'
import {PlayerStateStore}   from 'stores'

const mock_old_player_state = {room_id: `a`, room: {players: {}, exits: {}}}
const mock_new_player_state = {room_id: `b`, room: {players: {}, exits: {}}}

it(`dispatches the PLAYER_ROOM_CHANGED message + payload when roomChange() is called`, done => {
	Dispatcher.on(Dispatcher.PLAYER_ROOM_CHANGED, action => {
		expect(JSON.stringify(action.payload.player)).toBe(JSON.stringify(mock_new_player_state))
		done()
	})

	PlayerStateActions.roomChange(mock_new_player_state)
})

it(`dispatches the GOT_PLAYER_STATE message + payload when sharePlayerState() is called`, done => {
	Dispatcher.on(Dispatcher.GOT_PLAYER_STATE, action => {
		expect(JSON.stringify(action.payload.player)).toBe(JSON.stringify(mock_new_player_state))
		done()
	})

	PlayerStateActions.sharePlayerState(mock_new_player_state)
})

it(`dispatches the PLAYER_ROOM_CHANGED message + payload when the store emits PLAYER_STATE_CHANGE with new room_id`, done => {
	Dispatcher.on(Dispatcher.PLAYER_ROOM_CHANGED, action => {
		expect(JSON.stringify(action.payload.player)).toBe(JSON.stringify(mock_new_player_state))
		done()
	})

	PlayerStateStore.emit(PlayerStateStore.PLAYER_STATE_CHANGE, {
		new_player_state: mock_new_player_state,
		old_player_state: mock_old_player_state,
	})
})

it(`dispatches the GOT_PLAYER_STATE message + payload when the store emits PLAYER_STATE_CHANGE`, done => {
	Dispatcher.on(Dispatcher.GOT_PLAYER_STATE, action => {
		expect(JSON.stringify(action.payload.player)).toBe(JSON.stringify(mock_new_player_state))
		done()
	})

	PlayerStateStore.emit(PlayerStateStore.PLAYER_STATE_CHANGE, {
		new_player_state: mock_new_player_state,
		old_player_state: mock_old_player_state,
	})
})
