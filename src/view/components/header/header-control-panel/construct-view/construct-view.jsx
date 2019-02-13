import React, {Component}   from 'react'
import './construct-view.scss'

class ConstructView extends Component {

    constructor(props, context) {
        super(props, context)
    }
    
    render() {
        return (
            <div className="container">
               I'm a construct view!
            </div>      
        )
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }
    
}
export default ConstructView
