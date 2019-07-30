import React, { Component }  from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { initTestMap ,initTestCurrentRoom , initTestCurrentPlayer, currentRoomCoordsToIndex } from './gameFunctions/';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';

////////////////////////////////////////////////////
const URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv"
const config = {
  headers: {Authorization: "Token 3d043586b25429e278eba26bfe1426267ecdf1f0"}
}
const AppContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
////////////////////////////////////////////////////
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: initTestMap(),
      players: [],
      currentRoom: initTestCurrentRoom(),
      currentPlayer: initTestCurrentPlayer(),
      graph : {},
      curRoom : {},
      player: {},
    };
  }
  componentDidMount(){
    console.log("Hello");  
    this.getCurrentinfo();   
    console.log(localStorage.getItem('map')); 
  }
////////////////////////////////////////////////////
  getCurrentinfo = ()=> {
    try{
      axios
      .get(`${URL}/init`, config)
        .then( res =>{
          this.setState({curRoom : res.data})
          console.log(res.data)
        })
        .catch(error => console.log(error));
    }
    catch(error){
      console.error(error);
    }
  }
////////////////////////////////////////////////////
makingGraph = (id, coords, exits) => {
  let graph = Object.assign({}, this.state.graph);
  if (!this.state.graph[id]) {
    let map = [];
    let roomExits = {};
    map.push(coords);
    exits.forEach(exit => {roomExits[exit] = '?'});
    map.push(roomExits);
    graph = { ...graph, [id]: map};
  };
  localStorage.setItem('map', JSON.stringify(graph));
  console.log("the graph view:");
  console.log(this.state.graph);
  return graph; 
};
////////////////////////////////////////////////////
direction= (dir)=> {
  let movement = { 'direction': dir }
  try{
    axios
    .post(`${URL}/move`, movement , config)
    .then(res => {
      const { room_id, coordinates, exits } = res.data;
      let graph = this.makingGraph(room_id, coordinates, exits)
      this.setState({currRoom: res.data, graph: graph });
    })
    .catch(error => console.log(error));
  }catch(error){ console.log(error)}

}


////////////////////////////////////////////////////
  render() {
    let {map, currentRoom, currentPlayer, curRoom} = this.state
    let currentRoomMapIndex = currentRoomCoordsToIndex(this.state.currentRoom.coordinates);
    console.log('**app.js**')
    return (
      <AppContainer>
        <Header />
        <Body map={map} currentRoomMapIndex={currentRoomMapIndex} curRoom= {curRoom} currentRoom={currentRoom} currentPlayer={currentPlayer} />
        <Footer direction={this.direction} currentRoom={currentRoom} />
      </AppContainer>
    );
  }
}
export default App;
