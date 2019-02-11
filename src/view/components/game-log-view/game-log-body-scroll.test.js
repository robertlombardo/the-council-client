import React          from 'react'
import ReactDOM       from 'react-dom'
import GameLogBodyScroll from './game-log-body-scroll'

it(`renders without crashing`, () => {
  const div = document.createElement(`div`);
  ReactDOM.render(<GameLogBodyScroll />, div);
  ReactDOM.unmountComponentAtNode(div);
})
