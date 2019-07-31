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
      currentRoomMapIndex: 1830,
      treasure: {},
    };
  }
  componentDidMount(){
    // console.log("Hello");  
    this.getCurrentinfo();   
    // console.log(localStorage.getItem('map')); 
  }
////////////////////////////////////////////////////
  getCurrentinfo = ()=> {
    try{
      axios
      .get(`${URL}/init`, config)
        .then( res =>{
          this.setState({curRoom : res.data})
          console.log(res.data)
          if(res.data.items.length){
            console.log("Running collecting data function")
            this.collectTreasure();
          } else{
            console.log("There no item to collect");
          }
          if(res.data.title == "Shop"){
            console.log("Running selling treasue function")
            this.sellTreasure();
          } else{
            console.log("There no shop to sell");
          }
        })
        .catch(error => console.log(error));
    }
    catch(error){
      console.error(error);
    }
  }
  /////////////////////////////////////////////////////
  collectTreasure = ()=>{
    console.log("Collecting treasure: ")
    let treasureName = { 'name': 'treasure'}
    // try{
    axios
      .post(`${URL}/take`, treasureName, config)
      .then( res => {
          this.setState({treasure: res.data.items})
          console.log("Trying to collect treasure" + res.data);
          console.log(this.state.treasure)
        })
      .catch(error => console.log(error));
    // }catch(error){
      // console.log("Could not collect item");
    // }
  }
////////////////////////////////////////////////////
sellTreasure = ()=>{
  console.log("Collecting treasure: ")
  let treasureName = { 'name': 'treasure'}
  // try{
  axios
    .post(`${URL}/sell`, treasureName, config)
    .then( res => {
        console.log("Just sold a treasure")
      })
    .catch(error => console.log(error));
  // }catch(error){
    // console.log("Could not sell item");
  // }
}
///////////////////////////////////////////////////
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
    axios
      .post(`${URL}/move`, movement , config)
      .then(res => {
        console.log(res)
        const { room_id, coordinates, exits } = res.data;
        let graph = this.makingGraph(room_id, coordinates, exits)

        this.setState({ curRoom: res.data, graph: graph });
      })
      .catch(error => console.log(error));
    };

////////////////////////////////////////////////////
autoExploring(time, dir) {
  console.log('Should be waiting.....')
  let movement = { 'direction': dir }
  axios
    .post(`${URL}/move`, movement , config)
    .then(res => {
      if(res.data.items.length){
        console.log("Running collecting data function from auto")
        this.collectTreasure();
      } else{
        console.log("There no item to collect");
      }
      if(res.data.title == "Shop"){
        console.log("Running selling treasue function from auto")
        this.sellTreasure();
      } else{
        console.log("There no shop to sell");
      }
      const { room_id, coordinates, exits } = res.data;
      let graph = this.makingGraph(room_id, coordinates, exits)
      this.setState({ curRoom: res.data, graph:graph });
      time();
    })
    .catch(error => console.log("Auto exploring error" + error));
  }; 
  /////////////////////////////////////////////////////
   inverseDir = (dir) => {
    if (dir === 'n'){
      return 's'
    }
    else if (dir === 's'){
      return 'n'
    }
    else if (dir === 'e'){
      return 'w'
    }
    else if (dir === 'w'){
      return 'e'
    }
  };
  autoTraversal = async() =>{
    let wait = (time) => new Promise(resolve => setTimeout(resolve, time));
    console.log('waiting......', )
    let move = (dir) => new Promise(resolve => this.autoExploring(resolve, dir));

    let traversalPath = [];
    let backtrackPath = [];
    let visitedRooms = {};
   
    visitedRooms[this.state.curRoom.room_id] = this.state.curRoom.exits;

    while (Object.keys(visitedRooms).length < 500) {
      if (!(this.state.curRoom.room_id in visitedRooms)) {
        visitedRooms[this.state.curRoom.room_id] = this.state.curRoom.exits;

        let last_backtrack_val = backtrackPath[backtrackPath.length-1]
        let last_backtrack_val_index = visitedRooms[this.state.curRoom.room_id].indexOf(last_backtrack_val)
        delete visitedRooms[this.state.curRoom.room_id].splice(last_backtrack_val_index, 1);
      }
      else if (visitedRooms[this.state.curRoom.room_id].length === 0 && backtrackPath.length > 0 ) {
        let backtrackDir = backtrackPath.pop();
        traversalPath.push(backtrackDir);
        await wait(this.state.curRoom.cooldown * 2000);
        await move(backtrackDir);
      }
      else {
        let moveDir = visitedRooms[this.state.curRoom.room_id].shift()
        traversalPath.push(moveDir);
        backtrackPath.push(this.inverseDir(moveDir));
        await wait(this.state.curRoom.cooldown * 2000);
        await move(moveDir);
      };
    };  

  };

  render() {
    let {map, currentRoom, currentPlayer, curRoom} = this.state
    let currentRoomMapIndex = currentRoomCoordsToIndex(this.state.currentRoom.coordinates);
    console.log('**app.js**')
    return (
      <AppContainer>
        <Header />
        <Body map={map} currentRoomMapIndex={currentRoomMapIndex} curRoom= {curRoom} currentRoom={currentRoom} currentPlayer={currentPlayer} />
        <Footer autoTraversal = {this.autoTraversal} direction={this.direction} currentRoom={currentRoom} />
      </AppContainer>
    );
  }
}

export default App;
