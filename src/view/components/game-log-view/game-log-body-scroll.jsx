import React, {Component} from 'react'
import ReactDOM           from 'react-dom'
import {GameLogStore}     from 'stores'
import Linkify            from 'react-linkify'
import './game-log-body-scroll.scss'
// import EquipmentDisplay from 'components/common/EquipmentDisplay';
// import EditHeroActions from 'flux/actions/EditHeroActions';

import withImportantStyle from 'react-with-important-style';
var MySpan = withImportantStyle('span');

var lastMessageCacheLength = 0;

class GameLogBodyScroll extends Component {
  
    // getInitialState: function() {   
    //   this.getUsernameDisplay = this.getUsernameDisplay.bind(this);
    //   this.onGameItemLinkClick = this.onGameItemLinkClick.bind(this);

    //   return {
    //       game_log: ChatStore.getAll().game_log[ ChatStore.getAll().current_channel ]        
    //   };       
    // },
    constructor(props, context) {
      super(props, context)

      const {game_log, current_channel} = GameLogStore.get()

      this.state = {
        game_log: game_log[current_channel]
      }

      this.onGotMessage = this.onGotMessage.bind(this)
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return nextState.game_log.length > lastMessageCacheLength;
    }

    render() {
       lastMessageCacheLength = this.state.game_log.length;

       return(
         <div className="game-log-body-scroll" id='chatBodyScroll'>
            <div className="game-log-body">
                {this.state.game_log.map( (m,i) => {
                    // console.log({m});
                    if( m.gameItemLink ) {
                      // console.log(EquipmentDisplay.getName(m.gameItem))
                      // return(
                      //   <div className="game-log-message-field" key={i}>
                      //     <div className="game-log-display-name">{this.getUsernameDisplay(m.user)}: </div>
                      //     <div className="game-log-msg" style={{color:'#337ab7', pointerEvents:'all', cursor:'pointer'}} onClick={this.onGameItemLinkClick.bind(this,m.gameItem)}>{EquipmentDisplay.getName(m.gameItem)}</div>
                      //   </div>
                      // );
                      return(<div></div>)
                    } else if( m.command || m.notification ) {
                      return (
                        <div className="game-log-message-field" key={i} style={{paddingLeft:'10px', color:m.color||'#fff',fontWeight:m.notification?'bold':'normal'}}>
                          <div className="game-log-msg emote">{m.text}</div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="game-log-message-field" key={i} style={{color:m.color||'#fff'}}>
                          <div className="game-log-display-name">{this.getUsernameDisplay(m.user)}: </div>
                          <Linkify properties={{target:'_blank'}}><div className="game-log-msg">{m.text}</div></Linkify>
                        </div>
                      );
                    }
                })}
            </div>
          </div>
       )
    }

    getUsernameDisplay(usernameString) {    
      switch( usernameString ) {
        
       // case 'BugSmasher9006':
       case 'Kierus':
         return(
            <span>
              <MySpan style={{color:"#c10000 !important"}}>K</MySpan>
              <MySpan style={{color:"#c10000 !important"}}>i</MySpan>
              <MySpan style={{color:"#ffffff !important"}}>e</MySpan>
              <MySpan style={{color:"#ffffff !important"}}>r</MySpan>
              <MySpan style={{color:"#0030e1 !important"}}>u</MySpan>
              <MySpan style={{color:"#0030e1 !important"}}>s</MySpan>
            </span>
          );


       case 'Duke Garland':
          return(
            <span>
              <MySpan style={{color:"#4b4b4b !important"}}>D</MySpan>
              <MySpan style={{color:"#4b4b4b !important"}}>u</MySpan>
              <MySpan style={{color:"#4b4b4b !important"}}>k</MySpan>
              <MySpan style={{color:"#4b4b4b !important"}}>e</MySpan>
              <MySpan style={{color:"#e10000 !important"}}> </MySpan>
              <MySpan style={{color:"#e10000 !important"}}>G</MySpan>
              <MySpan style={{color:"#e10000 !important"}}>a</MySpan>
              <MySpan style={{color:"#e10000 !important"}}>r</MySpan>
              <MySpan style={{color:"#e5a700 !important"}}>l</MySpan>
              <MySpan style={{color:"#e5a700 !important"}}>a</MySpan>
              <MySpan style={{color:"#e5a700 !important"}}>n</MySpan>
              <MySpan style={{color:"#e5a700 !important"}}>d</MySpan>
            </span>
          );

       case 'Vyn Ryder':
          return(
            <span>
              <MySpan style={{color:"#3fb0ea !important"}}>V</MySpan>
              <MySpan style={{color:"#47a1cf !important"}}>y</MySpan>
              <MySpan style={{color:"#4182a4 !important"}}>n</MySpan>
              <MySpan style={{color:"#22d462 !important"}}> </MySpan>
              <MySpan style={{color:"#396e8a !important"}}>R</MySpan>
              <MySpan style={{color:"#3f8088 !important"}}>y</MySpan>
              <MySpan style={{color:"#38647b !important"}}>d</MySpan>
              <MySpan style={{color:"#38596a !important"}}>e</MySpan>
              <MySpan style={{color:"#2e434e !important"}}>r</MySpan>
            </span>
          );

       case 'Mrs. Gentle':
          return(
            <span>
              <MySpan style={{color:"#4900e8 !important"}}>M</MySpan>
              <MySpan style={{color:"#690083 !important"}}>r</MySpan>
              <MySpan style={{color:"#b427b5 !important"}}>s</MySpan>
              <MySpan style={{color:"#22d462 !important"}}>.</MySpan>
              <MySpan style={{color:"#22d462 !important"}}> </MySpan>
              <MySpan style={{color:"#40e0d0 !important"}}>G</MySpan>
              <MySpan style={{color:"#22d462 !important"}}>e</MySpan>
              <MySpan style={{color:"#22d462 !important"}}>n</MySpan>
              <MySpan style={{color:"#b427b5 !important"}}>t</MySpan>
              <MySpan style={{color:"#690083 !important"}}>l</MySpan>
              <MySpan style={{color:"#4900e8 !important"}}>e</MySpan>
            </span>
          );

       case 'Swag':
        return(
            <span>
              <MySpan style={{color:"#202ffc !important"}}>S</MySpan>
              <MySpan style={{color:"#202ffc !important"}}>w</MySpan>
              <MySpan style={{color:"#202ffc !important"}}>a</MySpan>
              <MySpan style={{color:"#202ffc !important"}}>g</MySpan>
              </span>
          );

       case 'Defenser?':
        return(
            <span>
              <MySpan style={{color:"#80ff00 !important"}}>D</MySpan>
              <MySpan style={{color:"#00ff8b !important"}}>e</MySpan>
              <MySpan style={{color:"#5400ff !important"}}>f</MySpan>
              <MySpan style={{color:"#ed00ff !important"}}>e</MySpan>
              <MySpan style={{color:"#ff0002 !important"}}>n</MySpan>
              <MySpan style={{color:"#ff4700 !important"}}>s</MySpan>
              <MySpan style={{color:"#ffcd00 !important"}}>e</MySpan>
              <MySpan style={{color:"#80ff00 !important"}}>r</MySpan>
              <MySpan style={{color:"#00ff8b !important"}}>?</MySpan>
            </span>
          );

        case 'Hulz':
          return(
              <span>
                <MySpan style={{color:"#27ff01 !important"}}>H</MySpan>
                <MySpan style={{color:"#5c9727 !important"}}>u</MySpan>
                <MySpan style={{color:"#5c9727 !important"}}>l</MySpan>
                <MySpan style={{color:"#5c9727 !important"}}>z</MySpan>
              </span>
            );

        case 'Krate':
          return(
            <span><a href='http://dungeonteamdatabase.com' target='_blank' rel="noopener noreferrer">Krate</a></span>
          );

        case 'Donate':
          return(
            <span>
              <MySpan style={{color:"#cb9400 !important"}}>D</MySpan>
              <MySpan style={{color:"#464646 !important"}}>o</MySpan>
              <MySpan style={{color:"#cb9400 !important"}}>n</MySpan>
              <MySpan style={{color:"#464646 !important"}}>a</MySpan>
              <MySpan style={{color:"#cb9400 !important"}}>t</MySpan>
              <MySpan style={{color:"#464646 !important"}}>e</MySpan>
            </span>
          );

        case 'Mr. Gentle':
          return(
            <span>
              <MySpan style={{color:"red !important"}}>M</MySpan>
              <MySpan style={{color:"orange !important"}}>r</MySpan>
              <MySpan style={{color:"yellow !important"}}>.</MySpan>
              <MySpan style={{color:"green !important"}}> </MySpan>
              <MySpan style={{color:"#0087f9 !important"}}>G</MySpan>
              <MySpan style={{color:"purple !important"}}>e</MySpan>
              <MySpan style={{color:"red !important"}}>n</MySpan>
              <MySpan style={{color:"orange !important"}}>t</MySpan>
              <MySpan style={{color:"yellow !important"}}>l</MySpan>
              <MySpan style={{color:"green !important"}}>e</MySpan>
            </span>
          );

        case 'Bloodrag':
          return(
            <span>
              <MySpan style={{color:"#fb0000 !important"}}>B</MySpan>
              <MySpan style={{color:"#791100 !important"}}>l</MySpan>
              <MySpan style={{color:"#3b2a00 !important"}}>o</MySpan>
              <MySpan style={{color:"#213600 !important"}}>o</MySpan>
              <MySpan style={{color:"#213600 !important"}}>d</MySpan>
              <MySpan style={{color:"#3b2a00 !important"}}>r</MySpan>
              <MySpan style={{color:"#791100 !important"}}>a</MySpan>
              <MySpan style={{color:"#fb0000 !important"}}>g</MySpan>
            </span>
          );

        case 'DirtyStaves':
          return(
            <span>
              <MySpan style={{color:"#ffffff !important"}}>D</MySpan>
              <MySpan style={{color:"#eeeeee !important"}}>i</MySpan>
              <MySpan style={{color:"#dddddd !important"}}>r</MySpan>
              <MySpan style={{color:"#cccccc !important"}}>t</MySpan>
              <MySpan style={{color:"#bbbbbb !important"}}>y</MySpan>
              <MySpan style={{color:"#aaaaaa !important"}}>S</MySpan>
              <MySpan style={{color:"#999999 !important"}}>t</MySpan>
              <MySpan style={{color:"#888888 !important"}}>a</MySpan>
              <MySpan style={{color:"#777777 !important"}}>v</MySpan>
              <MySpan style={{color:"#666666 !important"}}>e</MySpan>
              <MySpan style={{color:"#555555 !important"}}>s</MySpan>
            </span>
          );

        
        case 'Wakefield Studios':
          return(
            <span>
              <MySpan style={{color:"#555555 !important"}}>W</MySpan>
              <MySpan style={{color:"#493e36 !important"}}>a</MySpan>
              <MySpan style={{color:"#5f4836 !important"}}>k</MySpan>
              <MySpan style={{color:"#6f4f26 !important"}}>e</MySpan>
              <MySpan style={{color:"#835d1c !important"}}>f</MySpan>
              <MySpan style={{color:"#a06b0e !important"}}>i</MySpan>
              <MySpan style={{color:"#c17c04 !important"}}>e</MySpan>
              <MySpan style={{color:"#c19b04 !important"}}>l</MySpan>
              <MySpan style={{color:"#c19b04 !important"}}>d</MySpan>
              <MySpan style={{color:"#e7be00 !important"}}> </MySpan>
              <MySpan style={{color:"#e7be00 !important"}}>S</MySpan>
              <MySpan style={{color:"#c19b04 !important"}}>t</MySpan>
              <MySpan style={{color:"#c17c04 !important"}}>u</MySpan>
              <MySpan style={{color:"#835d1c !important"}}>d</MySpan>
              <MySpan style={{color:"#5f4836 !important"}}>i</MySpan>                  
              <MySpan style={{color:"#555555 !important"}}>o</MySpan>
              <MySpan style={{color:"#333333 !important"}}>s</MySpan>
            </span>
          );

          default: return usernameString;
        }
    }

    onGameItemLinkClick(gameItem) {
      // console.log('GameLogBodyScroll::onGameItemLinkClick()');
      // console.log({gameItem});
      // EditHeroActions.selectItem( gameItem );
    }

    componentDidUpdate() {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
    }

    onGotMessage() {
        const {game_log, current_channel} = GameLogStore.get()
        this.setState({
          game_log: game_log[current_channel]
        });
    }

    componentDidMount() {
        GameLogStore.on(GameLogStore.GOT_MESSAGE_EVENT, this.onGotMessage)
    }

    componentWillUnmount() {
        GameLogStore.removeListener(GameLogStore.GOT_MESSAGE_EVENT, this.onGotMessage)
    }
}
export default GameLogBodyScroll
         