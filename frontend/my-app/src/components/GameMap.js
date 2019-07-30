import React, { Component } from 'react';
import styled from 'styled-components';
import Room from './Room';
import { getAdjacentRooms, getRoomDisplayState, validAdjacentRooms } from '../gameFunctions/';

const MapContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 1200px;
  height: 900px;
  background-color: black;
`;

//room counter will used fixed positioning to overlay on map (top right)
//const RoomCounter = styled.div`
//`;


class GameMap extends Component {
  
  render() {
    let {gameMap, currentRoomMapIndex} = this.props
    let validMoveLabels = validAdjacentRooms(gameMap, currentRoomMapIndex)
    console.log(validMoveLabels)
    console.log('GameMap')
    return (
      <MapContainer>
        {gameMap.map((room, index) => (
          <Room index={index} displayState={getRoomDisplayState(gameMap, index, getAdjacentRooms(gameMap,index))} currentRoomMapIndex={currentRoomMapIndex} validMoveLabels={validMoveLabels} />
        ))}
      </MapContainer>
    );
  }
}

export default GameMap;