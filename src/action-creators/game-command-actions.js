import Dispatcher from 'dispatcher'

const GameCommandActions = {
    enterGameCommand: text => {
        Dispatcher.dispatch({
            type    : Dispatcher.ENTER_GAME_COMMAND,
            payload : {text}
        })
    },

    // setChatTextColor: function( color ) {
    //     ChatDispatcher.handleChatAction({
    //         actionType: ChatDispatcher.SET_CHAT_TEXT_COLOR,
    //         color
    //     });
    // },

    // gameNotification: function( type, data ) {
    //     ChatDispatcher.handleChatAction({
    //         actionType: ChatDispatcher.GAME_NOTIFICATION,
    //         type,
    //         data
    //     });
    // },

    // linkGameItem: function( gameItem ) {
    //     ChatDispatcher.handleChatAction({
    //         actionType: ChatDispatcher.LINK_GAME_ITEM,
    //         gameItem
    //     });
    // }
}
export default GameCommandActions
