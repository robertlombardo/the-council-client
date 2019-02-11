import React       from 'react'
import ReactDOM    from 'react-dom'
import GameLogView from './game-log-view'

it(`renders without crashing`, () => {
  const div = document.createElement(`div`)
  ReactDOM.render(<GameLogView />, div)
  ReactDOM.unmountComponentAtNode(div)
})
