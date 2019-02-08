import React          from 'react'
import ReactDOM       from 'react-dom'
import ChatBodyScroll from './chat-body-scroll'

it(`renders without crashing`, () => {
  const div = document.createElement(`div`);
  ReactDOM.render(<ChatBodyScroll />, div);
  ReactDOM.unmountComponentAtNode(div);
})
