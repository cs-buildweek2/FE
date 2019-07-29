let minRowValue = 30
let maxRowValue = 90
let minColValue = 30
let maxColValue = 90
let numRows = maxRowValue-minRowValue
let numCols = maxColValue-minColValue

export function convertXYtoArrayIndex(x,y){
  //(30,30) = 0
  //(90,90) = 3599
  let index = (x-minRowValue) + (y-minColValue)*numCols;
  return index
}


export function convertIndextoXY(index){
  let y = Math.floor(index / numRows)+30 //btw 1-50
  let x = (index % numRows)+30
  return { x, y }
}

export function getAdjacentRooms(gameMap, index){
  let room = gameMap[index];
  let nesw = [];

  let {x,y} = convertIndextoXY(index);

  //North
  if(y<numCols-1){
    nesw.push(gameMap[convertXYtoArrayIndex(x,y+1)]);
  }else{
    nesw.push(null);
  }

  //East
  if(x<numRows-1){
    nesw.push(gameMap[convertXYtoArrayIndex(x+1,y)]);
  }else{
    nesw.push(null);
  }

  //South
  if(y>0){
    nesw.push(gameMap[convertXYtoArrayIndex(x,y-1)]);
  }else{
    nesw.push(null);
  }

  //West
  if(x>0){
    nesw.push(gameMap[convertXYtoArrayIndex(x-1,y)]);
  }else{
    nesw.push(null);
  }
  
  return nesw
}

export function getRoomDisplayState(gameMap, index, nesw){
  let room  = gameMap[index]
  if(room!==null){
    return 'x'
  }else{
    //north
    if(nesw[0] != null){
      if(nesw[0].exits.indexOf('s') !== -1){
        return '?'
      }
    }
    //east
    if(nesw[1] != null){
      console.log(nesw[1])
      if(nesw[1].exits.indexOf('w') !== -1){
        return '?'
      }
    }
    //south
    if(nesw[2] != null){
      if(nesw[2].exits.indexOf('n') !== -1){
        return '?'
      }
    }
    //west
    if(nesw[3] != null){
      if(nesw[3].exits.indexOf('e') !== -1){
        return '?'
      }
    }
  }
  return ' '
}

export function initTestMap(){
  let gameMap = []
  for( let x = 0; x <3600; x++){
    gameMap[x] = null;
  }
  let index = convertXYtoArrayIndex(60,60);
  let room6060 = {
    "room_id": 0,
    "title": "Room 0",
    "description": "You are standing in an empty room.",
    "coordinates": "(60,60)",
    "players": [],
    "items": ["small treasure"],
    "exits": ["n", "s", "e", "w"],
    "cooldown": 60.0,
    "errors": [],
    "messages": []
  }
  gameMap[index] = room6060;

  index = convertXYtoArrayIndex(60,61)
  let room6061 = {
    "room_id": 10,
    "title": "A misty room",
    "description": "You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction.",
    "coordinates": "(60,61)",
    "elevation": 0,
    "terrain": "NORMAL",
    "players": ["player82", "player146"],
    "items": [],
    "exits": ["n", "s", "w"],
    "cooldown": 60.0,
    "errors": [],
    "messages": ["You have walked north."]
  }
  gameMap[index] = room6061;
  return gameMap;
}

export function initTestCurrentRoom(){
  return {
    "room_id": 0,
    "title": "Room 0",
    "description": "You are standing in an empty room.",
    "coordinates": "(60,60)",
    "players": [],
    "items": ["small treasure"],
    "exits": ["n", "s", "e", "w"],
    "cooldown": 60.0,
    "errors": [],
    "messages": []
  }
}

export function initTestCurrentPlayer(){
  return {
    "name": "Testy",
    "networth": 168232,
    "emcumbrance": 1,
    "strength": 10,
    "speed": 10,
    "inventory": ["flower"]
  }
}