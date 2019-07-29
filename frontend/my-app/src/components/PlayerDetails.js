import React, { Component } from 'react';
import styled from 'styled-components';

const PlayerDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid red;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid red;
`;

const PlayerName = styled.div`
  display: flex;
  border: 1px solid red;
`;

const PlayerNetworth = styled.div`
  display: flex;
  border: 1px solid red;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid red;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid red;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid red;
`;

const Item = styled.div`
  display: flex;
  border: 1px solid red;
`;

const Item2 = styled.div`
  display: flex;
  border: 1px solid red;
`;

const Title = styled.div`
  display: flex;
  border: 1px solid red;
`;

const Value = styled.div`
  display: flex;
  border: 1px solid red;
`;

class PlayerDetails extends Component {
  render() {
    //let {player} = this.props;
    return (
      <PlayerDetailsContainer>
        <TopContainer>
          <PlayerName>Pirate Ry</PlayerName>
          <PlayerNetworth>185601</PlayerNetworth>
        </TopContainer>
        <BottomContainer>
          <LeftContainer>
            <Item>
              <Title>Encumbrance</Title>
              <Value>1</Value>
            </Item>
            <Item>
              <Title>Strength</Title>
              <Value>10</Value>
            </Item>
            <Item>s
              <Title>Speed</Title>
              <Value>10</Value>
            </Item>
          </LeftContainer>
          <RightContainer>
            <Item2>
              <Title>Inventory</Title>
              <Value>Flower</Value>
            </Item2>
          </RightContainer>
        </BottomContainer>
      </PlayerDetailsContainer>
    );
  }
}

export default PlayerDetails;