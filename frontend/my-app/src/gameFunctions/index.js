let minRowValue = 30
let maxRowValue = 90
let minColValue = 30
let maxColValue = 90
let numRows = maxRowValue-minRowValue
let numCols = maxColValue-minColValue

export function currentRoomCoordsToIndex(coords){
  let {x,y} = convertCoordStringToNums(coords);
  return convertXYtoArrayIndex(x,y)
}

export function convertCoordStringToNums(coords){
  let s = coords.split(',');
  let x = parseInt(s[0].slice(1));
  let y = parseInt(s[1].slice(0,s[1].length-1));
  return {x,y}
}

export function convertXYtoArrayIndex(x,y){
  //map[0] = (30,90)
  //map[3599] = (90,30)
  let currentRow = -(y-90)
  let currentCol = x-30
  let index = currentRow*numRows + currentCol 
  return index
}


export function convertIndextoXY(index){
  let x = index % numRows + 30
  let y =  -Math.floor(index / numRows) + 90
  return { x, y }
}

export function getAdjacentRooms(gameMap, index){
  let room = gameMap[index];
  let nesw = [];

  let {x,y} = convertIndextoXY(index);

  //North
  if(y<maxColValue-1){
    nesw.push(gameMap[convertXYtoArrayIndex(x,y+1)]);
  }else{
    nesw.push(null);
  }

  //East
  if(x<maxRowValue-1){
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

export function validAdjacentRooms(gameMap, index){
  let coords = convertIndextoXY(index);
  let currX = coords.x
  let currY = coords.y
  let exits = gameMap[index].exits
  let movementOptions = {}

  for(let i = 0; i < exits.length; i++){
    var x = currX
    var y = currY
    if(exits[i]==="n"){
      y = currY+1
    }else if(exits[i]==="s"){
      y = currY-1
    }else if(exits[i]==="e"){
      x = currX + 1
    }else if(exits[i]==="w"){
      x = currX -1 
    }
    movementOptions[convertXYtoArrayIndex(x,y)] = exits[i]
  }
  return movementOptions
}

export function getRoomDisplayState(gameMap, index, nesw){
  let room  = gameMap[index]
  if(room!==null){
    return 'white' //x
  }else{
    //north
    if(nesw[0] != null){
      if(nesw[0].exits.indexOf('s') !== -1){
        return 'grey' //?
      }
    }
    //east
    if(nesw[1] != null){
      if(nesw[1].exits.indexOf('w') !== -1){
        return 'grey'
      }
    }
    //south
    if(nesw[2] != null){
      if(nesw[2].exits.indexOf('n') !== -1){
        return 'grey'
      }
    }
    //west
    if(nesw[3] != null){
      if(nesw[3].exits.indexOf('e') !== -1){
        return 'grey'
      }
    }
  }
  return 'black' //' '
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