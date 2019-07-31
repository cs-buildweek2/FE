import React, { Component } from 'react';
import styled from 'styled-components';

const RoomDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  background: #d4e5e6;
  padding: 10px;
  margin: 0 auto;
`;

const IDContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 10px 0px;
  padding-left: 20px;
`;

const RoomID = styled.div`
  display: flex;
  padding-left: 20px;
`;

const RoomCoordinates = styled.div`
  display: flex;
  padding-right: 50px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 20px;
`;

const Item = styled.div`
  display: inline;
  width: 100%;
  flex-direction: row;
`;

const Title = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 15px;
  color: #3b3f3f;
`;

const Description = styled.div`
  display: flex;
  margin-bottom: 20px;
  color: #3b3f3f;
`;

class RoomDetails extends Component {
  render() {
    // let {room} = this.props;
    const { room_id, title, description,players, items, exits, cooldown, errors, messages } = this.props.curRoom;
    console.log(messages)
    console.log(items)
    // let items = room.items;
    // let itemDisplayText = 'There are no items in this room.';
    // if(items.length !== 0){
    //   itemDisplayText = items
    // }

    // let players = room.players;
    // let playerDisplayText = 'There are no players in this room.';
    // if(players.length !== 0){
    //   itemDisplayText = players
    // }
    //consider adding indicators if a present player is on your team 
    //note: UI-wise, we need a way to jump to current locaiton of any player on our team

    return (
      <RoomDetailsContainer>
        <IDContainer>
        <p>Your Room id: <RoomID>{room_id}</RoomID> </p>
        <Title>{title}</Title>
        <h3> Message: </h3>
        <Description>{messages}</Description>
        </IDContainer>
        <DetailsContainer>
          <Item>
            <Title>About</Title>
            <Description>{description}</Description>
          </Item>
          <Item>
            <Title>Items:</Title>
            <Description>{items} </Description>
          </Item>
          <Item>
            <Title>Players: </Title>
            <Description>{players}</Description>
          </Item>
          <p>Cooldown time : <strong>{cooldown} seconds</strong> </p>
          <p>Moving options:  <strong>{exits}</strong>.</p>

        </DetailsContainer>
      </RoomDetailsContainer>
    );
  }
}

export default RoomDetails;