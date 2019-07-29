import React, { Component } from 'react';
import styled from 'styled-components';

const RoomDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  border: 1px solid red;
`;

const IDContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid green;
`;

const RoomID = styled.div`
  display: flex;
  border: 1px solid red;
`;

const RoomCoordinates = styled.div`
  display: flex;
  border: 1px solid red;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid red;
`;

const Item = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  border: 1px solid red;
`;

const Title = styled.div`
  display: flex;
  border: 1px solid red;
`;

const Description = styled.div`
  display: flex;
  border: 1px solid red;
`;

class RoomDetails extends Component {
  render() {
    let {room} = this.props;

    let items = room.items;
    let itemDisplayText = 'There are no items in this room.';
    if(items.length !== 0){
      itemDisplayText = items
    }

    let players = room.players;
    let playerDisplayText = 'There are no players in this room.';
    if(players.length !== 0){
      itemDisplayText = players
    }
    //consider adding indicators if a present player is on your team 
    //note: UI-wise, we need a way to jump to current locaiton of any player on our team

    return (
      <RoomDetailsContainer>
        <IDContainer>
          <RoomID>{room.title}</RoomID>
          <RoomCoordinates>{room.coords}</RoomCoordinates>
        </IDContainer>
        <DetailsContainer>
          <Item>
            <Title>Mt. Holloway</Title>
            <Description>{room.description}</Description>
          </Item>
          <Item>
            <Title>Items</Title>
            <Description>{itemDisplayText}</Description>
          </Item>
          <Item>
            <Title>Players</Title>
            <Description>{playerDisplayText}</Description>
          </Item>
        </DetailsContainer>
      </RoomDetailsContainer>
    );
  }
}

export default RoomDetails;