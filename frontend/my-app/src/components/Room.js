import React, { Component } from 'react';
import styled from 'styled-components';
import { getRoomWalls} from '../gameFunctions/';

//add 3px to border
//means add 1.5 px to margin[0]
//means reduce height by 3
///18, .5, 2
///
///21 = 1+1(m)+3+3(b)+__base__

const RoomCell = styled.div`
  display: flex;
  width: 14px;
  height: 14px;
  color: black;
  font-size: 10px;
  overflow: visible;
  justify-content: center;
  align-items: center;
  margin: .5px .5px

  border-top: ${({roomWalls, color}) => 
    color==='black' && '3px solid black' ||
    roomWalls.indexOf('n') != -1 && '3px solid grey' ||
    '3px solid white'
  };

  border-bottom: ${({roomWalls, color}) => 
    color==='black' && '3px solid black' ||
    roomWalls.indexOf('s') != -1 && '3px solid grey' ||
    '3px solid white'
  };

  border-right: ${({roomWalls, color}) => 
    color==='black' && '3px solid black' ||
    roomWalls.indexOf('e') != -1 && '3px solid grey' ||
    '3px solid white'
  };

  border-left: ${({roomWalls, color}) => 
    color==='black' && '3px solid black' ||
    roomWalls.indexOf('w') != -1 && '3px solid grey' ||
    '3px solid white'
  };


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
    let {displayState, currentRoomMapIndex, index, validMoveLabels, room} = this.props
    let displayValue = ' ';
    let roomWalls = [];
    if(displayState!=='black'){
      roomWalls = getRoomWalls(room)
      console.log('*')
      console.log(roomWalls.indexOf('n') === -1)
    }else{
      roomWalls = []
    }
    if(displayState==='white'){
      displayValue = ' '; //previously 'x'
    }else if(displayState==='grey'){
        //displayValue = '?';
    }else if(displayState==='green'){
      displayValue = '$'
    }else if(displayState==='blue'){
      displayValue = '@'
    }
    if(validMoveLabels !== null){
      if(validMoveLabels[index]){
        displayValue = validMoveLabels[index]
      }
    }
    let isCurrentRoom = false;
    if(currentRoomMapIndex === index){
      isCurrentRoom = true;
    }

    //displayValue = index

    return (
      <RoomCell color={displayState} isCurrentRoom={isCurrentRoom} roomWalls={roomWalls} >{displayValue}</RoomCell>
    );
  }
}

export default Room;