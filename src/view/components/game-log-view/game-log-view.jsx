import React, {Component}   from 'react'
import {Pressable}          from 'view/components'
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
                    <textarea 
                        className    = "cmd-input"
                        ref          = "cmd_input"
                        type         = "text"
                        placeholder  = "Enter a command..."
                    />
                    <Pressable ref={ref => this.submit_btn = ref} child={(
                        <div className="submit-btn" onClick={this.onTextEntered}>
                            <div>SEND</div>
                        </div>
                    )} />
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
        
        var text = this.refs.cmd_input.value
        if (text !== ``) GameCommandActions.enterGameCommand(text)
            
        // clear the field
        this.refs.cmd_input.value = ``
    }

    componentDidMount() {
        this.refs.cmd_input.focus()

        // add ENTER key listeners for executing input
        this.refs.cmd_input.onkeydown = event => {
            if (event.which === 13 && !event.shiftKey) {
                event.preventDefault()
                this.submit_btn.onMouseDown() // simulate
            }
        }
        this.refs.cmd_input.onkeyup = event => {
            if (event.which === 13 && !event.shiftKey) {
                event.preventDefault()
                this.submit_btn.onMouseUp() // simulate

                this.onTextEntered(event)
            }
        }
    }
}
export default GameLogView
