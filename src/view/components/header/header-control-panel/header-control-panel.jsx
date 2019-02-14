import React, {Component} from 'react'
import AvatarOverview     from './avatar-overview/avatar-overview'
import ConstructView      from './construct-view/construct-view'
import CitizenView        from './citizen-view/citizen-view'
import {UIStateStore}     from 'stores'
import './header-control-panel.scss'

const CONTROL_VIEWS = {
    avatar_overview : AvatarOverview,

    camps           : ConstructView,
    villages        : ConstructView,
    hamlets         : ConstructView,

    hunters         : CitizenView,
    gatherers       : CitizenView,
}

class HeaderControlPanel extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            header_control_view_key: UIStateStore.get().header_control_view_key
        }

        this.onHeaderControlViewChanged = this.onHeaderControlViewChanged.bind(this)
    }
    
    render() {
        const {header_control_view_key} = this.state
        const ControlView = CONTROL_VIEWS[header_control_view_key] || AvatarOverview

        return (
            <div className="header-control-panel container">
               <ControlView view_key={header_control_view_key}/>
            </div>      
        )
    }

    onHeaderControlViewChanged(new_header_control_view_key) {
        this.setState({
            header_control_view_key: new_header_control_view_key
        })
    }

    componentWillMount() {
        UIStateStore.on(UIStateStore.HEADER_CONTROL_VIEW_CHANGED, this.onHeaderControlViewChanged)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        UIStateStore.removeListener(UIStateStore.HEADER_CONTROL_VIEW_CHANGED, this.onHeaderControlViewChanged)
    }
    
}
export default HeaderControlPanel
