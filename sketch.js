var tiles = [];
var cols = 3;
var rows = 3;
var w, h;
var board = [];
let blankSpot;

function preload(){
  source = loadImage("mtmrfs_thumbnail.png");
}

function setup() {
  createCanvas(550, 500);
  w = width/cols;
  h = height/rows;
  
  for (let i=0; i<cols; i++ ){
    for (let j=0; j<rows; j++){
      let x= i*w;
      let y = j*h;
      let img = createImage(w,h);
      
      source.loadPixels();
      img.copy(source,x,y,w,h, 0,0,w,h);
      let index = i+j*cols;
      board.push(index);
  
      let tile = new Tile(index,img);
      tiles.push(tile);
    }
  }
  
  // deletes last array
  tiles.pop();
  board.pop();
  board.push(-1);
  // only swapping index (board)
  
  simpleShuffle(board);
  
}

// stores an array into a temporary slot and switches it witch current and swap current into empty slot
function swap(i,j, arr){
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}


// shuffles the board and i=amount of shuffles
function simpleShuffle(arr){
  for (let i=0; i<50; i++){
    let r1 = floor(random(cols));
    let r2 = floor(random(rows));
    move(r1,r2,arr);
  }
}

// converts mouseX and mouseY positions to grid in canvas
function mousePressed(){
  let i = floor(mouseX/w);
  let j = floor (mouseY/h);
  move(i,j, board);
}


function draw() {
  background("white");
  
  //translate(50,50);
  
  for (let i=0; i<cols; i++){
    for (let j=0; j<rows; j++){
      let index = i+j*cols;
      let x = i*w;
      let y = j*h;
      let tileIndex = board[index];
      if (tileIndex> -1){
        let img = tiles[tileIndex].img;
        image(img,x,y, w,h);
      }
    }
  }
    
  
  if(isSolved()){
  //console.log("SOLVED");
    image(source,0,0)
}
  

  //noLoop();
}

// detects if the puzzle is solved
function isSolved(){
  for (let i=0; i<board.length-1; i++){
    if (board[i] !== tiles[i].index){
      return false;
    }
  }
  return true;
}

// click on index and if valid move 
function move(i, j, arr){
  let blank = findBlank();
  let blankCol = blank % cols;
  let blankRow = floor(blank/rows);
  
  // if its a neighbor to the blankspot then it can be swapped
  if (isNeighbor(i,j,blankCol,blankRow)) {
    swap(blank, i+j*cols, arr);
  }
}

function isNeighbor(i,j,x,y){
  //not in the same column or row is not neighbor
  if (i !==x && j !== y){
    return false;
  }
  // i array is in correct row and column = neighbor
  if (abs(i-x)==1 || abs(j-y)==1){
    return true;
  }
  
  return false;
}

// blank spot in canvas
function findBlank(){
  for (let i=0; i<board.length;i++){
    if (board[i] == -1){
      return i;
    }
  }
}