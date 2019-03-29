import React, {Component} from 'react';
import './App.css';
import Navbar from "./navbar/navbar";
import {BrowserRouter as Router, Route} from "react-router-dom";
import GamesList from "./games/GamesList";
import ChessGame from "./chess/ChessGame";


class App extends Component {
  render() {
    return (
        <Router>
          <div className="App">
            <Navbar/>
            <div className="page-body">
              <Route path="/" exact component={GamesList} />
              <Route path="/chess" exact component={ChessGame} />
            </div>
          </div>
        </Router>
    );
  }
}

export default App;


