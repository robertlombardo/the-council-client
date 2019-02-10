import EventEmitter   from 'events'
import Dispatcher     from 'dispatcher'

// config
const NOTIFICATION_COLOR = `#d7d00e`;

// private
let api_socket
let listeners_registered = false

// the stuff we serve
var messageCache = {
    room: [ 
        {user: `Wakefield Studios`, text: `You have entered the world of The Council ...`, color: NOTIFICATION_COLOR},
        // { /*notification: true,*/ text: text('ui.join_forum_msg'), color: NOTIFICATION_COLOR },
        // { /*notification: true,*/ text: text('ui.join_discord_msg'), color: NOTIFICATION_COLOR },
        // { /*notification: true,*/ text: text('chat.help_msg'), color: NOTIFICATION_COLOR },
    ]
};
var currentChannel = `room`;

const GameTranscriptStore = Object.assign({}, EventEmitter.prototype, {  
    GOT_MESSAGE_EVENT           : `GOT_MESSAGE_EVENT`,
    // DISPLAY_NAME_EVENT          : 'DISPLAY_NAME_EVENT',
    // SHOW_CHAT_TEXT_COLOR_PICKER : 'SHOW_CHAT_TEXT_COLOR_PICKER',
    
    get: () => {
        return {
            messageCache,
            currentChannel
        }
    }
})
export default GameTranscriptStore

Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
    if (listeners_registered) return

    api_socket = action.payload.api_socket

    // TODO - remove listeners when socket closed/destroyed/broken
    api_socket.on(`player_joined_room`, onAnyPlayerJoinedRoom)
    api_socket.on(`player_said`,        onPlayerSaid)

    listeners_registered = true
})

Dispatcher.on(Dispatcher.UNKNOWN_COMMAND_ENTERED, action => {
    pushToTranscript(currentChannel, {
        notification : true,
        color        : `#ff0000`,
        text         : `Unknown command: ${action.payload.command}.`,
    })
})

Dispatcher.on(Dispatcher.PLAYER_ROOM_CHANGED, action => {
    const {description, exits} = action.payload.player.room

    pushToTranscript(`room`, {
        notification : true,
        color        : `#bdbdbd`,
        text         : description,
    })

    pushToTranscript(`room`, {
        notification : true,
        color        : `#1ab10c`,
        text         : `Exits: ${Object.keys(exits).join(`, `)}`,
    })
})

function onAnyPlayerJoinedRoom(data) {
    pushToTranscript(`room`, {
        notification : true,
        color        : `#6f6f6f`,
        text         : `${data.player.display_name} enters the area.`,
    })
}

function onPlayerSaid(data) {
    const {player, text}                  = data
    const {display_name, chat_text_color} = player

    pushToTranscript(`room`, {
        user  : display_name,
        color : chat_text_color,
        text,
    })
}

function onChatMessage(data) {
    pushToTranscript(data.channel, data.message)
}
 
function pushToTranscript(channel, message) {
    messageCache[channel].push( message );
    GameTranscriptStore.emit(GameTranscriptStore.GOT_MESSAGE_EVENT)
}
