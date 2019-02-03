import React, {Component} from 'react'
import './App.css'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to narnia.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }
class App extends Component {
    render() {
        return (
            <div className="root-layout" id="root-layout">
                <div className="game-canvas" id="game-canvas"></div>
                <div>Hey yo jerry darbia floo floo poo poo pee pee</div>
                {/*<Chat />*/}
                {/*<Modals />*/}
                {/*this.getKongRegistrationBtn()*/}
                {/*<div className="overlay-canvas" id="overlay-canvas"></div>*/}
            </div>
        )
    }
}
export default App;
