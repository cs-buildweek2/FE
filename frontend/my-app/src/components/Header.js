import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #515959;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
`;

const PirateImage = styled.div`
  display: flex;
  height: 100%;
  width: 5%;
`;

const Title = styled.div`
  display: flex;
  height: 100%;
  width: 30%
  color: white;
  font-size: 42px;
`;

const HeaderToggle = styled.div`
  display: flex;
  height: 100%;
  width: 5%;
  color: white;
  justify-content: space-between;
`;

const Item = styled.div`
    font-size: 15px;
`;

class Header extends Component {
  
  render() {
    //let {map, players} = this.props
    return (
      <HeaderContainer>
          <PirateImage />
          <Title>Lambda Treasure Hunt</Title>
          <HeaderToggle>
            <Item>Map</Item>
            <Item>About</Item>
          </HeaderToggle>
      </HeaderContainer>
    );
  }
}

export default Header;