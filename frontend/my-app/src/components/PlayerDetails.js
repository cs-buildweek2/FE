import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PlayerDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
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

const URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/status"
const config = {
    headers: {Authorization: "Token 3d043586b25429e278eba26bfe1426267ecdf1f0"}
  // headers: {Authorization: "Token 07bc71474be560896f01e1b6e8202fd12628ead8"}
  // headers: {Authorization: "Token 80bd0d5dc2befdd2bb01d014daeb9b1780c36cf2"}
}
class PlayerDetails extends Component {
  constructor(){
    super();
    this.state ={
      name: " ",
      cooldown: 2.0,
      encumbrance: 2, 
      strength: 10,  
      speed: 10,  
      gold: null,
      inventory: [],
      status: [],
      errors: [],
      messages: []
    } 
  }
  // componentDidMount(){
  //   let {cooldown} = this.props
  //   setTimeout(()=> {
  //   this.collectPlayerinfo();
  //   }, cooldown* 1000 )
  // }
  firePlayerinfo = ()=>{
    let {cooldown} = this.props
    setTimeout(()=> {
         this.collectPlayerinfo();
         }, cooldown* 1002 )
  }
  collectPlayerinfo = () =>{
    
    console.log("Collect playerinfo")
    try{
      axios
        .post(URL, config)
        .then(res => {
          
          console.log(res.data)
          console.log("Collect playerinfo")
          this.setState(prevstate => {
            return{
              ...prevstate,
              name :res.data.name,
              cooldown: res.data.cooldown,
              encumbrance: res.data.encumbrance, 
              strength: res.data.strength,  
              speed: res.data.speed,  
              gold: res.data.gold,
              inventory: res.data.inventory,
              status: res.data.status,
              errors:  res.data.errors,
              messages: res.data.messages
            };
          })
        })
        .catch(error=> console.log(error))
    }catch(error){
      console.error(error);
    }

  }
  render() {
    let {name, cooldown, encumbrance, strength, speed, gold, inventory, status, errors, messages} = this.state
    return (
      <PlayerDetailsContainer>
        <Title><button onClick= {this.firePlayerinfo}> Player Detail</button></Title>
        <TopContainer>
          <PlayerName>{name}</PlayerName>
          <PlayerNetworth>{gold}</PlayerNetworth>
        </TopContainer>
        <BottomContainer>
          <LeftContainer>
            <Item>
              <Title>Encumbrance:</Title>
              <Value>{encumbrance}</Value>
            </Item>
            <Item>
              <Title>Cooldown:</Title>
              <Value>{cooldown}</Value>
            </Item>
            <Item>
              <Title>Strength:</Title>
              <Value>{strength}</Value>
            </Item>
            <Item>
              <Title>Speed:</Title>
              <Value>{speed}</Value>
            </Item>
          </LeftContainer>
          <RightContainer>
            <Item2>
              <Title>Inventory:</Title>
              <Value>{inventory}</Value>
            </Item2>
          </RightContainer>
        </BottomContainer>
      </PlayerDetailsContainer>
    );
  }
}

export default PlayerDetails;