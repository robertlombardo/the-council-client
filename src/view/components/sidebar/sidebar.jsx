import React, {Component}   from 'react'
import './sidebar.scss'

class Sidebar extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            current_view: `empire_overview`
        }
    }
    
    render() {
        return (
            <div className="sidebar container">
               I'm a sidebar!
            </div>      
        )
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
}
export default Sidebar
