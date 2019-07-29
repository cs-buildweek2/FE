import React, { Component } from 'react';
import styled from 'styled-components';
import { getRoomDisplayState, getAdjacentRooms , convertIndextoXY} from '../gameFunctions/';

const RoomCell = styled.div`
  display: flex;
  width: 20px;
  height: 15px;
  
  background: white;
  color: black;

  font-size: 10px;
  overflow: visible;
`;

//need to figure out css/jsx to conditionally draw lines between rooms when a connecting pathway exists

class Room extends Component {
  render() {
    let {displayState, index, gameMap} = this.props
    let {x,y} = convertIndextoXY(index)
    if( x===59 && y === 61){
      console.log(index)
      console.log(x + ', ' + y)
      let nesw = getAdjacentRooms(gameMap, index)
      console.log(nesw)
    }
    /*
    if(index===1831){
      let nesw = getAdjacentRooms(gameMap, index)
      let {x,y} = convertIndextoXY(index)
      console.log(x + ', ' + y)
      console.log(nesw)
      console.log(getRoomDisplayState(gameMap, index, nesw))
    }*/
    /*
    if(index % 60 === 0){
      displayState = index
    }else{
      displayState = ''
    }*/
    return (
      <RoomCell>{displayState}</RoomCell>
    );
  }
}

export default Room;