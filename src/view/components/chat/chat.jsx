import React, {Component} from 'react';
import ChatBodyScroll from './chat-body-scroll.jsx';
// import ChatActions from 'flux/actions/ChatActions';
// import ApplicationStore from 'flux/stores/ApplicationStore';
// import ChatStore from 'flux/stores/ChatStore';
import './chat.css'

class Chat extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            expanded: true,
            playersOnline: 0 // ApplicationStore.getAll().playersOnline
        }

        this.toggleExpanded = this.toggleExpanded.bind(this)
    }
    
    render() {
        return (
            <div className={this.state.expanded?'chat-root chat-root-max':'chat-root'} ref='chatRoot' id='chatRoot'>
                <a className={this.state.expanded?"btn size-toggle-btn size-toggle-btn-max":"btn size-toggle-btn"} onClick={this.toggleExpanded}>{this.getArrow()}</a>
                <p className='players-online'>Players Online: {this.state.playersOnline}</p>
                <div className={this.state.expanded?"chat chat-max":"chat"}>
                    <div className={this.state.expanded?"chat-body-wrapper chat-body-wrapper-max":"chat-body-wrapper"}> 
                        <ChatBodyScroll id="chatBodyScroll"/>
                    </div>
                    <form className="chat-input-form" onSubmit={this.onTextEntered} autoComplete="narbles">
                        <ul className="form-list">
                            <li className="msg-input-li">
                                <textarea className="form-control msg-input" 
                                    id = 'chat-input'
                                    name='foo'
                                    type="text"
                                    placeholder="Say something..."
                                    autoComplete="narbles"
                                    ref="enteredText"/>
                            </li>
                            <li>
                                <div>
                                    <button type="submit" className="form-control btn btn-xs submit-btn">SEND</button>
                                </div>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>      
        )
    }

    getArrow() {
        if( this.state.expanded ) {
            return( <img src="assets/img/down_arrow.png"/> );
        } else {
            return( <img src="assets/img/up_arrow.png"/> );
        }
    }

    toggleExpanded() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    onTextEntered(e) {
        // no page reload
        e.preventDefault();
        
        console.log(this.refs);
        var text = this.refs.enteredText.value;
        
        if( text !== '' ) {
            // ChatActions.enterMessage( text );
        }
            
        // clear the field
        this.refs.enteredText.value = '';
    }

    onNumPlayersOnline() {
        // this.setState( {playersOnline:ApplicationStore.getAll().playersOnline} );
    }

    componentDidMount() {
        // TweenMax.from( this.refs.chatRoot, 0.3, {y:window.innerHeight} ).delay( 2.0 );

        // ApplicationStore.on( ApplicationStore.NUM_PLAYERS_ONLINE, this.onNumPlayersOnline );

        // document.getElementById("chat-input").keypress( (e) => {
        //     if( e.which===13 && !e.shiftKey ) { 
        //         e.preventDefault();       
        //         this.onTextEntered( e );
        //         return false;
        //     }
        // });
    }

    componentWillUnmount() {
        // ApplicationStore.removeListener( ApplicationStore.NUM_PLAYERS_ONLINE, this.onNumPlayersOnline );
    }
    
}
export default Chat
