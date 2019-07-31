let minRowValue = 30
let maxRowValue = 90
let minColValue = 30
let maxColValue = 90
let numRows = maxRowValue-minRowValue
let numCols = maxColValue-minColValue

export function addRoomToMap(gameMap, room){
  let index = currentRoomCoordsToIndex(room.coordinates)
  gameMap[index] = room
  return gameMap
}

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

  console.log('initTestMap()')
  //{"76":["(59,65)",{"n":"?","e":"?","w":"?"}],"83":["(59,66)",{"s":"?","e":"?","w":"?"}],"125":["(58,66)",{"n":"?","e":"?","w":"?"}],
  //"130":["(60,66)",{"w":"?"}],"165":["(58,67)",{"n":"?","s":"?","w":"?"}],"203":["(58,68)",{"n":"?","s":"?","e":"?"}],"268":["(58,69)",{"s":"?","e":"?","w":"?"}],"299":["(59,68)",{"e":"?","w":"?"}],"311":["(60,68)",{"w":"?"}],"312":["(57,69)",{"n":"?","e":"?"}],"411":["(59,69)",{"w":"?"}]}
  
  let localStorageMap = JSON.parse(localStorage.getItem('map'))
  let coords = '', index = -1, exits = [], room = {}, roomExits = {}, roomToAdd = {}
  console.log('localStorageMap')
  console.log(localStorageMap)
  for (var roomKey in localStorageMap) {
    room = localStorageMap[roomKey]
    coords = room[0]
    index = currentRoomCoordsToIndex(coords)
    roomExits = room[1]
    exits = []
    for (var exitKey in roomExits){
      exits.push(exitKey)
    }
    roomToAdd = {
      coordinates: coords,
      exits: exits
    }
    addRoomToMap(gameMap, roomToAdd)
  }
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