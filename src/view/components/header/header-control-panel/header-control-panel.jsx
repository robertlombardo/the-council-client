import React, {Component}   from 'react'
import './header-control-panel.scss'

class HeaderControlPanel extends Component {

    constructor(props, context) {
        super(props, context)
    }
    
    render() {
        return (
            <div className="header-control-panel container">
               I'm a header control panel!
            </div>      
        )
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
}
export default HeaderControlPanel
