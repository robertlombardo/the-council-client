import React, {Component}   from 'react'
import {GameCommandActions} from 'action-creators'
import './which-construct-upgrade.scss'

const SINGULAR_CONSTRUCT_NAMES = {
    camps: `camp`
}

class WhichConstructUpgradeModal extends Component {
    
    constructor(props, context) {
        super(props, context)

        this.onSelection = this.onSelection.bind(this)
    }

    render() {
        const {construct, construct_key} = this.props.content_attrs

        return (
            <div className="which-construct-upgrade">
                <div className="modal-content-question">Which citizens should the new {SINGULAR_CONSTRUCT_NAMES[construct_key]} produce?</div>
                <div className="sub-container modal-content-choice-btns">
                    {Object.keys(construct.products).map(product_key => {
                        return (
                            <div className="container modal-content-btn no-select" key={product_key} onClick={this.onSelection.bind(null, product_key)}>
                                <div>{product_key}</div>
                            </div>
                        )
                    })}
                </div>
            </div>      
        )
    }

    onSelection(product_key) {
        GameCommandActions.confirmBuildConstruct(this.props.content_attrs.construct_key, product_key)
        this.props.hide()
    }
}
export default WhichConstructUpgradeModal
