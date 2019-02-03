import {EventEmitter} from 'events'
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
var userObject = {
    displayName: 'rob',
    gender: 'male',
    chatTextColor: '#ffffff'
};
var messageCache = {
    global: [ 
        {user: 'Wakefield Studios', text: 'Welcome to The Commons!', color: NOTIFICATION_COLOR},
        // { /*notification: true,*/ text: text('ui.join_forum_msg'), color: NOTIFICATION_COLOR },
        // { /*notification: true,*/ text: text('ui.join_discord_msg'), color: NOTIFICATION_COLOR },
        // { /*notification: true,*/ text: text('chat.help_msg'), color: NOTIFICATION_COLOR },
    ]
};
var currentChannel = 'global';

const ChatStore = Object.assign({}, EventEmitter.prototype, {
    SUBSCRIBED_TO_CHANNEL       : 'SUBSCRIBED_TO_CHANNEL',
    UNSUBSCRIBED_FROM_CHANNEL   : 'UNSUBSCRIBED_FROM_CHANNEL',      
    DISPLAY_NAME_EVENT          : 'DISPLAY_NAME_EVENT',
    GOT_MESSAGE_EVENT           : 'GOT_MESSAGE_EVENT',
    SHOW_CHAT_TEXT_COLOR_PICKER : 'SHOW_CHAT_TEXT_COLOR_PICKER',
    
    get: () => {
        return {
            userObject,
            messageCache,
            currentChannel
        }
    }
})
export default ChatStore

Dispatcher.on(Dispatcher.API_SOCKET_CONNECTED, action => {
    api_socket = action.payload.api_socket
    api_socket.on(`subscribed`, onSubscribed)
    api_socket.on(`chatMessage`, onChatMessage)
    // TODO - remove listeners when socket closed/destroyed/broken

    api_socket.emit(`subscribe`, {
        playerId,
        channel: `global`
    })
})

Dispatcher.on(Dispatcher.ENTER_MESSAGE, action => {
   const {text} = action.payload

   if(text[0] === '/' ) {
        const command = text.split( ' ' )[0];
        const target = text.slice( command.length+1 );

        switch( command ) {
            // case '/help': 
            //     pushToLog( currentChannel, {
            //         text: text('chat.help_info')[0],
            //         notification: true,
            //         color: NOTIFICATION_COLOR
            //     });
            //     for( var i = 1; i < text('chat.help_info').length; ++i ) {
            //         pushToLog( currentChannel, {
            //             text: text('chat.help_info')[i],
            //             color: NOTIFICATION_COLOR
            //         });
            //     }
            //     break;

            // case '/challenge':
            //     ArenaLobbyActions.challengePlayerByName( target, GameStateStore.getAll().gameState.competitionData.lastMatchType||'arena1v1' );
            //     break;

            default: 
                api_socket.emit( 'chatCommand', {
                    playerId,
                    command: text
                });
                break;
        }        
    } else if (userObject.displayName && userObject.displayName !== `New Player`) {
        publish({
            user  : userObject.displayName,
            text,
            color : userObject.chatTextColor 
        });
    } else {
        pushToLog( currentChannel, {
            text: 'make a username', // text('chat.make_a_username'),
            notification: true,
            color: NOTIFICATION_COLOR
        });
    }
})

// ApplicationDispatcher.register( function(payload) {
//     if( payload.action.actionType === ApplicationDispatcher.STARTUP ) {
//         startup();
//     } else if( payload.action.actionType === ApplicationDispatcher.SOCKET_CONNECTED ) {
//         socket = payload.action.socket;
//         onSocketConnected();
//     }
    
//     return true;
// });

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
//     userObject.displayName = data.scriptData.displayName || 'New Player';
//     userObject.gender = data.scriptData.chat? (data.scriptData.chat.gender||'male') : 'male';
//     userObject.chatTextColor = data.scriptData.chat? (data.scriptData.chat.textColor||'#ffffff') : '#ffffff';
    
//     if( !connected ) { 
//         connected = true;
//         chatSocket.emit( 'subscribe', {
//             playerId,
//             channel: 'global'
//         });        
//     }   
// }

function onSubscribed(data) {
    currentChannel = data.channel;

    if( userObject.displayName && userObject.displayName!=='New Player' && process.env.NODE_ENV!=='development' ) {
        publish({ 
            user: userObject.displayName,
            // command: '/enter_channel',
            // target: data.target,
            // text: text.getChatCommandEmote( userObject.displayName, '/enter_channel', null ),
            text: '<enters the channel>',
            color: userObject.chatTextColor
        });
    }
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
//                 user: userObject.displayName,
//                 command: data.command,
//                 target: data.target,
//                 text: text.getChatCommandEmote( userObject.displayName, data.command, (data.target&&data.targetIsOnline)?data.target:null ),
//                 color: userObject.chatTextColor
//             });
//             break;
//     }
// }

function onChatMessage(data) {
    pushToLog(data.channel, data.message)
}
 
function pushToLog(channel, message) {
    messageCache[channel].push( message );
    ChatStore.emit(ChatStore.GOT_MESSAGE_EVENT)
}

function publish(message) {
    api_socket.emit('publish', {
        channel: currentChannel,        
        message
    })
}

// function onNewUsername( name ) {
//     userObject.displayName = name || 'New Player';
// }

// function requestChatTextColorChange( action ) {
//     socket.emit( 'setChatTextColor', {
//         playerId,
//         color: action.color
//     });
// }

// function onChatTextColorChanged( data ) {
//     userObject.chatTextColor = data.newColor;
// }

// function onGameNotification( action ) {
//     publish({ 
//         notification: true,
//         text: text.getGameNotificationText( userObject.displayName, action.type, action.data ),
//         color: NOTIFICATION_COLOR
//     });
// }

// function sendGameItemLink( action ) {
//     publish({
//         gameItemLink: true,
//         gameItem: action.gameItem,
//         user: userObject.displayName
//     });
// }
