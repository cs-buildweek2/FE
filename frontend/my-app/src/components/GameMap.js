import React, { Component } from 'react';
import styled from 'styled-components';
import Room from './Room';
import { getAdjacentRooms, getRoomDisplayState} from '../gameFunctions/';

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
    console.log('GameMap')
    return (
      <MapContainer>
        {gameMap.map((room, index) => (
          <Room index={index} displayState={getRoomDisplayState(gameMap, index, getAdjacentRooms(gameMap,index))} currentRoomMapIndex={currentRoomMapIndex}/>
        ))}
      </MapContainer>
    );
  }
}

export default GameMap;