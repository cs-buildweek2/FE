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
    console.log(this.props)
    let {map, currentRoom, currentPlayer} = this.props
    return (
      <BodyContainer>
          <GameMap gameMap={map} />
          <BodyRightContainer>
            <RoomDetails room={currentRoom} />
            <PlayerDetails player={currentPlayer} />
          </BodyRightContainer>
      </BodyContainer>
    );
  }
}

export default Body;