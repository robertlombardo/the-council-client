import React, {Component} from 'react'
import {
    WhichConstructUpgradeModal
}                         from './modal-content-index'
import Dispatcher         from 'dispatcher'
import TweenMax, {Linear} from 'gsap'
import './modal.scss'

class Modal extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            visible       : false,
            Content       : undefined,
            content_attrs : {}
        }

        this.hide                      = this.hide.bind(this)
        this.show                      = this.show.bind(this)
        this.onBuildConstructRequested = this.onBuildConstructRequested.bind(this)
    }
    
    render() {
        const {visible, Content, content_attrs} = this.state

        if (!visible || !Content) return (<div></div>)

        return (
            <div className="modal-root">
                <div className="modal">
                    <div className="modal-backdrop" ref={ref => this.backdrop = ref} onMouseDown={this.hide}></div>
                    <div className="container modal-content" ref={ref => this.modal_content = ref}>
                        <Content content_attrs={content_attrs} hide={this.hide}/>
                    </div>
                </div>
            </div>
        )
    }

    hide(event) {
        TweenMax.to(this.backdrop, 0.17, {
            autoAlpha: 0
        })

        TweenMax.to(this.modal_content, 0.17, {
            autoAlpha  : 0,
            x          : `-=250`,
            onComplete : () => {this.setState({visible: false})},
        })
    }

    show(Content, content_attrs) {
        this.setState({
            visible: true,
            Content,
            content_attrs
        })

        requestAnimationFrame(() => {
            this.backdrop.alpha = 0
            TweenMax.to(this.backdrop, 0.2, {
                alpha: 1
            })

            TweenMax.from(this.modal_content, 0.2, {
                autoAlpha : 0,
                x         : `+=250`,
                ease      : Linear.easeNone
            })
        })
    }

    onBuildConstructRequested(action) {
        this.show(WhichConstructUpgradeModal, action.payload)
    }

    componentWillMount() {
        Dispatcher.on(Dispatcher.BUILD_CONSTRUCT_REQUESTED, this.onBuildConstructRequested)
    }

    componentWillUnmount() {
        Dispatcher.removeListener(Dispatcher.BUILD_CONSTRUCT_REQUESTED, this.onBuildConstructRequested)
    }
}
export default Modal
