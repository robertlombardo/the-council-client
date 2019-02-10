import EventEmitter   from 'events'
import Dispatcher     from 'dispatcher'
// import Config from 'constants/Config';
// import ChatActions from 'flux/actions/ChatActions';
// import ChatDispatcher from 'flux/dispatchers/ChatDispatcher';
// import text from 'text';
// import ArenaLobbyActions from 'flux/actions/ArenaLobbyActions';
// import GameStateStore from 'flux/stores/GameStateStore';

const NOTIFICATION_COLOR = '#d7d00e';

let api_socket
// var chatSocket;
let playerId = 'rob_player_id'
// var connected = false;

// the stuff we serve
var messageCache = {
    room: [ 
        {user: 'Wakefield Studios', text: 'You have entered the world of The Council ...', color: NOTIFICATION_COLOR},
        // { /*notification: true,*/ text: text('ui.join_forum_msg'), color: NOTIFICATION_COLOR },
        // { /*notification: true,*/ text: text('ui.join_discord_msg'), color: NOTIFICATION_COLOR },
        // { /*notification: true,*/ text: text('chat.help_msg'), color: NOTIFICATION_COLOR },
    ]
};
var currentChannel = `room`;

const GameTranscriptStore = Object.assign({}, EventEmitter.prototype, {
    SUBSCRIBED_TO_CHANNEL       : 'SUBSCRIBED_TO_CHANNEL',
    UNSUBSCRIBED_FROM_CHANNEL   : 'UNSUBSCRIBED_FROM_CHANNEL',      
    DISPLAY_NAME_EVENT          : 'DISPLAY_NAME_EVENT',
    GOT_MESSAGE_EVENT           : 'GOT_MESSAGE_EVENT',
    SHOW_CHAT_TEXT_COLOR_PICKER : 'SHOW_CHAT_TEXT_COLOR_PICKER',
    
    get: () => {
        return {
            messageCache,
            currentChannel
        }
    }
})
export default GameTranscriptStore

Dispatcher.on(Dispatcher.GOT_API_SOCKET, action => {
    api_socket = action.payload.api_socket
    api_socket.on(`subscribed`, onSubscribed)
    api_socket.on(`chatMessage`, onChatMessage)
    // TODO - remove listeners when socket closed/destroyed/broken

    api_socket.on(`player_joined_room`, onPlayerJoinedRoom)

    api_socket.emit(`subscribe`, {
        playerId,
        channel: `global`
    })
})

function onPlayerJoinedRoom(player) {
    pushToLog(`room`, {
        notification: true,
        color: `#6f6f6f`,
        text: `${player.display_name} enters the area.`
    })
}

// const HANDLERS = {
//     [ChatDispatcher.ENTER_MESSAGE]: onMessageEntered,
//     [ChatDispatcher.SET_CHAT_TEXT_COLOR]: requestChatTextColorChange,
//     [ChatDispatcher.GAME_NOTIFICATION]: onGameNotification,
//     [ChatDispatcher.LINK_GAME_ITEM]: sendGameItemLink
// };

// ChatDispatcher.register( function(payload) {
//     if( HANDLERS[payload.action.actionType] ) {
//         HANDLERS[payload.action.actionType]( payload.action );
//     }
//     return true;
// });
    
// function startup() {
//     try {
//         // console.log( 'Config.SERVER_ADDRESS: ' + Config.SERVER_ADDRESS, true );
//         chatSocket = io.connect( Config.CHAT_SERVER_ADDRESS, {
//             path: "/socket.io",
//             secure: true,
//             transports: ['websocket']
//         });

//         chatSocket.on( 'error', (error) => {
//           console.error( 'chatSocket error:' ); 
//           console.warn( 'Caught error: ' + error );
//         });

//         chatSocket.on( 'connected', onChatSocketConnected );
//     } catch( error ) {
//         console.log( "Error in ChatStore::startup() - probably waiting for socketio lib from CDN..." );
//         console.log( error.message );
//         TweenMax.delayedCall( 0.5, startup );
//         return;
//     } 
// }

// function onSocketConnected() {
//     if( !socket.listeners('chatCommandResponse')[0] ) {
//         socket.on( 'authenticated', onAuthenticated );
//         socket.on( 'accountDetails', onAccountDetails );
//         socket.on( 'newUsername', onNewUsername );
//         socket.on( 'chatCommandResponse', onChatCommandResponse );
//         socket.on( 'chatTextColorChanged', onChatTextColorChanged );
//     }
// }

// function onAuthenticated( data ) {
//     ChatStore.emit( ChatStore.DISPLAY_NAME_EVENT );    
// }

// function onAccountDetails( data ) {
//     playerId = data.userId;
//     userObject.display_name = data.scriptData.display_name || 'New Player';
//     userObject.gender = data.scriptData.chat? (data.scriptData.chat.gender||'male') : 'male';
//     userObject.chat_text_color = data.scriptData.chat? (data.scriptData.chat.textColor||'#ffffff') : '#ffffff';
    
//     if( !connected ) { 
//         connected = true;
//         chatSocket.emit( 'subscribe', {
//             playerId,
//             channel: 'global'
//         });        
//     }   
// }

function onSubscribed(data) {
    // currentChannel = data.channel;

    // if( userObject.display_name && userObject.display_name!=='New Player' && process.env.NODE_ENV!=='development' ) {
    //     publish({ 
    //         user: userObject.display_name,
    //         // command: '/enter_channel',
    //         // target: data.target,
    //         // text: text.getChatCommandEmote( userObject.display_name, '/enter_channel', null ),
    //         text: '<enters the channel>',
    //         color: userObject.chat_text_color
    //     });
    // }
}

// function onChatCommandResponse( data ) {
//     console.log( 'ChatStore::onChatCommandResponse() - data:' );
//     console.log( data );

//     if( !data.legal ) {
//         return;
//     }

//     switch( data.command ) {
//         case '/emotes':
//             pushToLog( currentChannel, {
//                 text: text('chat.your_emotes'),
//                 notification: true,
//                 color: NOTIFICATION_COLOR
//             });
//             for( var i = 0; i < data.emotes.length; ++i ) {
//                 pushToLog( currentChannel, {
//                     text: data.emotes[i],
//                     color: NOTIFICATION_COLOR
//                 });
//             }
//             break;

//         case '/gender':
//             userObject.gender = data.newGender;
//             pushToLog( currentChannel, {
//                 text: text('chat.gender_changed') + text('chat.'+data.newGender),
//                 color: NOTIFICATION_COLOR
//             });
//             break;

//         case '/color':
//             ChatStore.emit( ChatStore.SHOW_CHAT_TEXT_COLOR_PICKER );
//             break;

//         case '/online':
//             var playersOnlineText = "";
//             for( var j in data.playerNamesOnline ) {
//                 playersOnlineText +=  (data.playerNamesOnline[j] || 'New Player') + ', ';
//             }
//             playersOnlineText = playersOnlineText.slice( 0, playersOnlineText.length-2 );

//             pushToLog( currentChannel, {
//                 text: text('chat.players_online') + ': ' + playersOnlineText,
//                 color: NOTIFICATION_COLOR
//             }); 
//             break; 

//         case '/creditpd':
//         case '/deleteplayer':
//             break;     

//         default: 
//             publish({ 
//                 user: userObject.display_name,
//                 command: data.command,
//                 target: data.target,
//                 text: text.getChatCommandEmote( userObject.display_name, data.command, (data.target&&data.targetIsOnline)?data.target:null ),
//                 color: userObject.chat_text_color
//             });
//             break;
//     }
// }

function onChatMessage(data) {
    pushToLog(data.channel, data.message)
}
 
function pushToLog(channel, message) {
    messageCache[channel].push( message );
    GameTranscriptStore.emit(GameTranscriptStore.GOT_MESSAGE_EVENT)
}



// function onNewUsername( name ) {
//     userObject.display_name = name || 'New Player';
// }

// function requestChatTextColorChange( action ) {
//     socket.emit( 'setChatTextColor', {
//         playerId,
//         color: action.color
//     });
// }

// function onChatTextColorChanged( data ) {
//     userObject.chat_text_color = data.newColor;
// }

// function onGameNotification( action ) {
//     publish({ 
//         notification: true,
//         text: text.getGameNotificationText( userObject.display_name, action.type, action.data ),
//         color: NOTIFICATION_COLOR
//     });
// }

// function sendGameItemLink( action ) {
//     publish({
//         gameItemLink: true,
//         gameItem: action.gameItem,
//         user: userObject.display_name
//     });
// }
