import React, {Component}   from 'react'
import ReactDOM             from 'react-dom'
import GameLogBodyScroll    from './game-log-body-scroll.jsx'
import {GameCommandActions} from 'action-creators'
import './game-log-view.scss'

class GameLogView extends Component {

    constructor(props, context) {
        super(props, context)

        this.toggleExpanded = this.toggleExpanded.bind(this)
        this.onTextEntered  = this.onTextEntered.bind(this)
    }
    
    render() {
        return (
            <div className="game-log">
                <div className="game-log-body-wrapper"> 
                    <GameLogBodyScroll />
                </div>
                <div className="game-log-input-form" onSubmit={this.onTextEntered} autoComplete="narbles">
                    <textarea className="msg-input" 
                        id = 'chat_input'
                        name='foo'
                        type="text"
                        placeholder="Enter a command..."
                        autoComplete="narbles"
                        ref="enteredText"/>
                    <button type="submit" className="form-control btn btn-xs submit-btn" onClick={this.onTextEntered}>SEND</button>
                </div>
            </div>      
        )
    }
    toggleExpanded() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    onTextEntered(event) {
        event.preventDefault()
        
        var text = this.refs.enteredText.value
        if (text !== ``) GameCommandActions.enterGameCommand(text)
            
        // clear the field
        this.refs.enteredText.value = ``
    }

    componentDidMount() {
        this.refs.enteredText.focus()

        // add ENTER key listener for executing input
        const node = ReactDOM.findDOMNode(this)
        if (node instanceof HTMLElement) {
            const chat_input = node.querySelector(`#chat_input`)
            if (chat_input) chat_input.onkeypress = event => {
                if (event.which === 13 && !event.shiftKey) { // ENTER key 
                    event.preventDefault()      
                    this.onTextEntered(event)
                    return false
                }
            }
        }
    }

    componentWillUnmount() {
    }
    
}
export default GameLogView
