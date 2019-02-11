import GameLogStoreFuncs, {getRoomDescription} from './game-log-store-funcs'

// keep a reference from the PlayerStateStore:
let player

const GameLogStoreCallbacks = {
    onAnyPlayerLeftRoom: data => {
        const is_me = data.player.id === player.id

        const text = `${is_me ? `You`:data.player.display_name} exit${is_me ? ``:`s`} to the ${data.exit_key}.`

        GameLogStoreFuncs.pushToGameLog(`room`, {
            notification : true,
            color        : `#6f6f6f`,
            text,
        })

        if (is_me) GameLogStoreFuncs.pushToGameLog(`room`, {
            notification : true,
            color        : `#6f6f6f`,
            text         : `...`,
        })
    },

    onLookCommand: action => {
        GameLogStoreFuncs.pushToGameLog(`room`, getRoomDescription(player.room))
    },

    onOtherPlayerJoinedRoom: data => {
        GameLogStoreFuncs.pushToGameLog(`room`, {
            notification : true,
            color        : `#6f6f6f`,
            text         : `${data.player.display_name} enters the area.`,
        })
    },

    onPlayerRoomChanged: action => {
        GameLogStoreFuncs.pushToGameLog(`room`, getRoomDescription(action.payload.player.room))
    },

    onPlayerSaid: data => {
        const {player, text}                  = data
        const {display_name, chat_text_color} = player

        GameLogStoreFuncs.pushToGameLog(`room`, {
            user  : display_name,
            color : chat_text_color,
            text,
        })
    },

    onPlayerState: action => {
        player = action.payload.player
    },

    onUnknownCommandEntered: action => {
        GameLogStoreFuncs.pushToGameLog(`current`, {
            notification : true,
            color        : `#ff0000`,
            text         : `Unknown command: ${action.payload.command}.`,
        })
    }
}
export default GameLogStoreCallbacks
