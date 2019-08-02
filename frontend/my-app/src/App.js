import React, { Component }  from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import { initTestMap , currentRoomCoordsToIndex , addRoomToMap } from './gameFunctions/';
import './App.css';
import styled from 'styled-components';
import axios from 'axios';
// import { URL, config} from './components/env'
////////////////////////////////////////////////////
const URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv"
const config = {
    headers: {Authorization: "Token 3d043586b25429e278eba26bfe1426267ecdf1f0"}
  // headers: {Authorization: "Token 07bc71474be560896f01e1b6e8202fd12628ead8"}
  // headers: {Authorization: "Token 80bd0d5dc2befdd2bb01d014daeb9b1780c36cf2"}
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
    this.direction = this.direction.bind(this);
    this.state = {
      map: initTestMap(),
      players: [],
      graph : {},
      curRoom : {},
      player: {},
      treasure: {},
    };
  }
  componentDidMount(){
    console.log("CompDidMount");  
    this.init();
  }
  //////////////////////////////////
  init = async () => {
    await this.getCurrentinfo();
  };
////////////////////////////////////////////////////
  getCurrentinfo = ()=> {
    try{
      axios
      .get(`${URL}/init`, config)
        .then( res =>{
          this.setState(prevState => {
            return {
              ...prevState,
              curRoom : res.data,
              map: addRoomToMap(this.state.map, res.data),
            };
          });
          if(res.data.items.length){
            setTimeout(()=> {
              this.collectTreasure();
            }, res.data.cooldown * 1001)
          // }else if(res.data.title == "Pirate Ry's" || res.data.room_id == 467){
          //   setTimeout(()=> {
          //     this.nameChanger();
          //   }, res.data.cooldown * 1001)
          }else{
            console.log("There no item to collect");
          }
          if(res.data.title == "Shop"){
            setTimeout(()=> {
              this.sellTreasure();
            }, res.data.cooldown * 1001)
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
  ////////////////////////////////////////////////////
  submitNewProof = ()=>{
    console.log("Collecting treasure: ")
    let newProof = { 'proof': '[new_proof]'}
    axios
      .post("https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/", newProof, config)
      .then( res => {
          // this.setState({: res.data.})
          console.log(res.data)
        })
      .catch(error => console.log(error));
  }
  collectLambdaCoin = ()=>{
    axios
      .post(`https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/`, config)
      .then( res => {
          // this.setState({res.data})
          console.log(res.data)
        })
      .catch(error => console.log(error));
  }
  checkbalance = ()=>{
    axios
      .post(`https://lambda-treasure-hunt.herokuapp.com/api/bc/get_balance/`, config)
      .then( res => {
          // this.setState({res.data})
          console.log(res.data)
        })
      .catch(error => console.log(error));
  }
  /////////////////////////////////////////////////////
  collectTreasure = ()=>{
    console.log("Collecting treasure: ")
    let treasureName = { 'name': 'treasure'}
    axios
      .post(`${URL}/take`, treasureName, config)
      .then( res => {
          this.setState({treasure: res.data.items})
          console.log("Trying to collect treasure" + res.data);
          console.log(this.state.treasure);
          if (res.data.errors.length){console.log("Can not collect item because: " + res.data.errors)} else{ console.log("Treasure collected successfully");}
        })
      .catch(error => console.log(error));
  }
////////////////////////////////////////////////////
sellTreasure = ()=>{
  console.log("Collecting treasure: ")
  let treasureName = { 'name': 'treasure'}
  axios
    .post(`${URL}/sell`, treasureName, config)
    .then( res => {
        console.log("Just sold a treasure")
      })
    .catch(error => console.log(error));
}

////////////////////////////////////////////////////
nameChanger = ()=>{
  console.log("Collecting treasure: ")
  let newName = { 'name': '[Mr Lion]'}
  axios
    .post(`${URL}/change_name`, newName, config)
    .then( res => {
        console.log("Name change successful")
      })
    .catch(error => console.log(error));
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

        this.setState(prevState => {
          return {
            ...prevState,
            curRoom : res.data,
            graph: graph,
            map: addRoomToMap(this.state.map, res.data),
          };
        });
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
        setTimeout(()=> {
          this.collectTreasure();
        }, res.data.cooldown * 1001)
      } else{
        console.log("There no item to collect");
      }
      if(res.data.title == "Shop"){
        setTimeout(()=> {
          this.sellTreasure();
        }, res.data.cooldown * 1001)}
      // } else if(res.data.title == "Pirate Ry's" || res.data.room_id == 467){
      //   setTimeout(()=> {
      //     this.nameChanger();
      //   }, res.data.cooldown * 1001)
      // }else{
      //   console.log("There no shop to sell or name change");
      
      const { room_id, coordinates, exits } = res.data;
      let graph = this.makingGraph(room_id, coordinates, exits)

      this.setState(prevState => {
        return {
          ...prevState,
          curRoom : res.data,
          graph: graph,
          map: addRoomToMap(this.state.map, res.data),
        };
      });

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
   
    console.log(" visited Room")
    visitedRooms[this.state.curRoom.room_id] = this.state.curRoom.exits;
    console.log(visitedRooms)

    while (Object.keys(visitedRooms).length < 500) {
      console.log('vistedROOMS LENGTH', Object.keys(visitedRooms).length)
      console.log('TRACKING', visitedRooms);
      if (!(this.state.curRoom.room_id in visitedRooms)) {
        console.log("First If");
        visitedRooms[this.state.curRoom.room_id] = this.state.curRoom.exits;

        let last_backtrack_val = backtrackPath[backtrackPath.length-1]
        let last_backtrack_val_index = visitedRooms[this.state.curRoom.room_id].indexOf(last_backtrack_val)
        console.log('VISITED ROOM', visitedRooms)
        console.log('ROOM', this.state.curRoom.room_id, 'REMOVE', last_backtrack_val)
        delete visitedRooms[this.state.curRoom.room_id].splice(last_backtrack_val_index, 1);
      }
      else if (visitedRooms[this.state.curRoom.room_id].length === 0 && backtrackPath.length > 0 ) {
        console.log("Second If");
        let backtrackDir = backtrackPath.pop();
        traversalPath.push(backtrackDir);

        console.log("about to move... (backtrack): " , backtrackDir, 'from room', this.state.curRoom.room_id);
        await wait(this.state.curRoom.cooldown * 2000);
        console.log('waiting in else if......', this.state.curRoom.cooldown * 2000)
        await move(backtrackDir);
      }
      else {
        console.log("Third if");
        let moveDir = visitedRooms[this.state.curRoom.room_id].shift()
        console.log('ROOM', this.state.curRoom.room_id, 'MOVE&REMOVE', moveDir)
        traversalPath.push(moveDir);
        backtrackPath.push(this.inverseDir(moveDir));

        console.log("about to move... (move): " , moveDir,'from room', this.state.curRoom.room_id);
        await wait(this.state.curRoom.cooldown * 2000);
        console.log('waiting in else......', this.state.curRoom.cooldown * 2000)
        await move(moveDir);
      };
    };  
    console.log('!!!!!!WHILE LOOP ENDED!!!!!!')
    console.log(Object.keys(visitedRooms).length, "ROOMS VISITED")
    console.log('TRAVERSED PATH', traversalPath)  
    console.log('BACKTRACK PATH', backtrackPath) 
  };

  render() {
    let {map, curRoom, graph} = this.state
    let currentRoomMapIndex = null
    if(Object.entries(this.state.curRoom).length !== 0 && this.state.curRoom.constructor === Object){
      console.log('Current room Message'+ curRoom.messages)
      currentRoomMapIndex = currentRoomCoordsToIndex(this.state.curRoom.coordinates);
    }
    console.log('**app.js**')
    return (
      <AppContainer>
        <Header />
        <Body map={map} currentRoomMapIndex={currentRoomMapIndex} curRoom={curRoom} /*currentRoom={currentRoom} currentPlayer={currentPlayer}*/ graph={graph} />
        <Footer messages= {curRoom.messages} autoTraversal = {this.autoTraversal} direction={this.direction} /*currentRoom={currentRoom}*/ />
      </AppContainer>
    );
  }
}

export default App;
