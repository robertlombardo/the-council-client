import React              from 'react'
import ReactDOM           from 'react-dom'
import MainView           from './view/main-view.jsx'
import * as serviceWorker from './serviceWorker'

import 'stores/api-store'
import 'view/style/index.scss'

ReactDOM.render(<MainView />, document.getElementById(`root`))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
