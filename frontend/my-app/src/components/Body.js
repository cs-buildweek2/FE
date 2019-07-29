import React, { Component } from 'react';
import GameMap from './GameMap';
import RoomDetails from './RoomDetails';
import PlayerDetails from './PlayerDetails';
import styled from 'styled-components';

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid red;
`;

const BodyRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid green;
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