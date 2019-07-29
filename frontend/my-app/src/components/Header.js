import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid blue;
  background: black;
`;

const PirateImage = styled.div`
  display: flex;
  height: 100%;
  border: 1px solid yellow;
`;

const Title = styled.div`
`;

const HeaderToggle = styled.div`
`;

class Header extends Component {
  
  render() {
    //let {map, players} = this.props
    return (
      <HeaderContainer>
          <PirateImage />
          <Title>Lambda Treasure Hunt</Title>
          <HeaderToggle>Map   About</HeaderToggle>
      </HeaderContainer>
    );
  }
}

export default Header;