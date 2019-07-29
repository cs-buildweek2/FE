import React, { Component } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid red;
`;

const Explore = styled.div`
  display: flex;
  height: 100%;
  background: black;
  color: white;
`;

const ActionDescription = styled.div`
  display: flex;
  height: 100%;
  background: grey;
  color: black;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: black;
`;

const Action = styled.div`
  display: flex;
  height: 100%;
  background: black;
  color: white;
`;


class Footer extends Component {
  
  render() {
    let {currentRoom} = this.props
    //You have flown south. Flight bonus: -10% CD. Wise ExplorerL -50% CD.
    return (
      <FooterContainer>
        <Explore>Explore</Explore>
        <ActionDescription>
          {currentRoom.messages} {currentRoom.cooldown}
        </ActionDescription>
        <ActionsContainer>
          <Action>N</Action>
          <Action>S</Action>
          <Action>W</Action>
          <Action>E</Action>
          <Action>Store</Action>
          <Action>$</Action>
          <Action>Drop</Action>
        </ActionsContainer>
      </FooterContainer>
    );
  }
}

export default Footer;