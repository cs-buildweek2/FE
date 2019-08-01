import React, { Component } from 'react';
import GameMap from './GameMap';
import RoomDetails from './RoomDetails';
import PlayerDetails from './PlayerDetails';
import styled from 'styled-components';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const BodyRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;


class Body extends Component {
  
  render() {
    console.log('Body')
    let {map, currentRoom, currentRoomMapIndex, curRoom} = this.props
    console.log(this.props)
    return (
      <BodyContainer>
          <GameMap gameMap={map} currentRoomMapIndex={currentRoomMapIndex} />
          <BodyRightContainer>
            <RoomDetails room={currentRoom} curRoom={curRoom} />
            <PlayerDetails cooldown={curRoom.cooldown} player={curRoom.players} />
          </BodyRightContainer>
      </BodyContainer>
    );
  }
}

export default Body;