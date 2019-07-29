import React, { Component }  from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { initTestMap ,initTestCurrentRoom , initTestCurrentPlayer } from './gameFunctions/';
import './App.css';
import { connect } from 'react-redux';
import { simpleAction } from './actions/index.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: initTestMap(),
      players: [],
      currentRoom: initTestCurrentRoom(),
      currentPlayer: initTestCurrentPlayer()
    };
  }

  render() {
    let {map, currentRoom, currentPlayer} = this.state
    console.log('**app.js**')
    return (
      <div className="App">
        <Header />
        <Body map={map} currentRoom={currentRoom} currentPlayer={currentPlayer} />
        <Footer currentRoom={currentRoom} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
