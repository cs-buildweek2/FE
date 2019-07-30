import React, { Component } from 'react';
import styled from 'styled-components';

const PlayerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #7dccbe;
  padding-top: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 5px 0px;
`;

const PlayerName = styled.div`
  display: flex;
  padding-left: 20px;
  font-weight: bold;
  font-size: 20px;
`;

const PlayerNetworth = styled.div`
  display: flex;
  padding-right: 20px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  margin: 15px;
`;

const Item2 = styled.div`
  display: flex;
`;

const Title = styled.div`
  display: flex;
  margin-right: 10px;
  color: #3b3f3f;
`;

const Value = styled.div`
  display: flex;
  color: #3b3f3f;
`;

class PlayerDetails extends Component {
  render() {
    let {player} = this.props;
    return (
      <PlayerDetailsContainer>
        <TopContainer>
          <PlayerName>Pirate Ry</PlayerName>
          <PlayerNetworth>185601</PlayerNetworth>
        </TopContainer>
        <BottomContainer>
          <LeftContainer>
            <Item>
              <Title>Encumbrance:</Title>
              <Value>1</Value>
            </Item>
            <Item>
              <Title>Strength:</Title>
              <Value>10</Value>
            </Item>
            <Item>
              <Title>Speed:</Title>
              <Value>10</Value>
            </Item>
          </LeftContainer>
          <RightContainer>
            <Item2>
              <Title>Inventory:</Title>
              <Value>Flower</Value>
            </Item2>
          </RightContainer>
        </BottomContainer>
      </PlayerDetailsContainer>
    );
  }
}

export default PlayerDetails;