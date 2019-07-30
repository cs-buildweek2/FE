import React, { Component }  from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { initTestMap ,initTestCurrentRoom , initTestCurrentPlayer } from './gameFunctions/';
import './App.css';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: initTestMap(),
      players: [],
      currentRoom: initTestCurrentRoom(),
      currentPlayer: initTestCurrentPlayer(),
      currentRoomMapIndex: 1830,
    };
  }

  render() {
    let {map, currentRoom, currentPlayer, currentRoomMapIndex} = this.state
    console.log('**app.js**')
    return (
      <AppContainer>
        <Header />
        <Body map={map} currentRoomMapIndex={currentRoomMapIndex} currentPlayer={currentPlayer} currentRoom={currentRoom} />
        <Footer currentRoom={currentRoom} />
      </AppContainer>
    );
  }
}

export default App;
