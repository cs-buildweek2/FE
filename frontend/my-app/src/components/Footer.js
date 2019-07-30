import React, { Component } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  background: #515959;
`;

const Explore = styled.div`
  display: flex;
  height: 100%;
  color: white;
  margin-left: 8%;
  padding: 20px;
  width: 5%;
  justify-content: center;
`;

const ActionDescription = styled.div`
  display: flex;
  height: 100%;
  background: #dcdcdc;
  color: #505858;
  padding: 20px;
  width: 45%;
  justify-content: center;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-right: 5%;
  padding: 20px;
`;

const Action = styled.div`
  display: flex;
  height: 100%;
  color: white;
  margin-right: 15px;
`;


class Footer extends Component {
  
  render() {
    let {currentRoom} = this.props
    //You have flown south. Flight bonus: -10% CD. Wise ExplorerL -50% CD.
    return (
      <FooterContainer>
        <Explore>Explore</Explore>
        <ActionDescription>
          You have flown south. Flight bonus: -10% CD. Wise bonus: -50% CD.
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