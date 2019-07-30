import React, { Component } from 'react';
import styled from 'styled-components';
import { getRoomDisplayState, getAdjacentRooms , convertIndextoXY} from '../gameFunctions/';

const RoomCell = styled.div`
  display: flex;
  width: 20px;
  height: 15px;
  color: black;
  font-size: 10px;
  overflow: visible;
  justify-content: center;

  border-radius: ${({color}) => 
    color === 'black' && '0%' ||
    '25%'
  };

  background-color: ${({color, isCurrentRoom}) => 
    isCurrentRoom && 'orange' ||
    color
  };

`;
//background-color: ${props => props.color};

//need to figure out css/jsx to conditionally draw lines between rooms when a connecting pathway exists

class Room extends Component {
  render() {
    let {displayState, currentRoomMapIndex, index, validMoveLabels} = this.props
    let displayValue = ' ';
    if(displayState==='white'){
      displayValue = 'x';
    }else{
      if(displayState==='grey'){
        displayValue = '?';
      }
    }
    if(validMoveLabels[index]){
      displayValue = validMoveLabels[index]
    }
    let isCurrentRoom = false;
    if(currentRoomMapIndex === index){
      isCurrentRoom = true;
    }
    //let {x,y} = convertIndextoXY(index)
    return (
      <RoomCell color={displayState} isCurrentRoom={isCurrentRoom} >{displayValue}</RoomCell>
    );
  }
}

export default Room;