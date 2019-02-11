import React, {Component} from 'react'
import EmpireOverview     from './empire-overview/empire-overview'
import './sidebar.scss'

const VIEWS = {
    empire_overview: EmpireOverview
}

class Sidebar extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            current_view_key: `empire_overview`
        }
    }
    
    render() {
        const CurrentView = VIEWS[this.state.current_view_key]

        return (
            <div className="sidebar container">
               <CurrentView />
            </div>      
        )
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
}
export default Sidebar
