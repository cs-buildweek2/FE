import React, { Component } from 'react';
import styled from 'styled-components';
import Room from './Room';
import { getAdjacentRooms, getRoomDisplayState, validAdjacentRooms } from '../gameFunctions/';

/*
  width: 20px;
  height: 15px;
  1200/20 = 
  45,45 -> 74,74

  30x30 = 900

  3600
 */
const MapContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 630px;
  height: 660px;
  background-color: black;
`;

//room counter will used fixed positioning to overlay on map (top right)
//const RoomCounter = styled.div`
//`;


class GameMap extends Component {
  
  render() {
    let {gameMap, currentRoomMapIndex} = this.props
    let validMoveLabels = null
    if(currentRoomMapIndex !== null){
      validMoveLabels = validAdjacentRooms(gameMap, currentRoomMapIndex)
    }
    console.log('GameMap')
    return (
      <MapContainer>
        {gameMap.map((room, index) => (
          <Room room={room} index={index} displayState={getRoomDisplayState(gameMap, index, getAdjacentRooms(gameMap, index))} currentRoomMapIndex={currentRoomMapIndex} validMoveLabels={validMoveLabels} />
        ))}
      </MapContainer>
    );
  }
}

export default GameMap;