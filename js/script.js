const canvas = document. getElementById('canvas1'); //this grabs the canvas element and allows us to work on the element and change in real time

const ctx = canvas.getContext('2d'); // this gives us special gaming powers by using the 2d syntax

//initializing height of our gamescreen
canvas.width = 900;
canvas.height = 600;

//global variables
const cellSize = 100; //size of our cell. each cell in our gameboard ends up being 100x100
const cellGap = 3; //a pixel gap between each cell
const gameGrid = [];

//mouse
const mouse = {
    x: 10,
    y: 10,
    width: 0.1,
    height: 0.1,
}

let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});
canvas.addEventListener('mouseleave', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})


//game board
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

class Cell {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }
    draw(){
        if( mouse.x && mouse.y && collision(this, mouse)){
          ctx.strokestyle = 'black';
        ctx.strokeRect(this.x,this.y,this.width,this.height);  
        }
    }
}
function createGrid(){
    for (let y = cellSize; y < canvas.height; y+= cellSize){
        for( let x = 0; x < canvas.width; x += cellSize){
            gameGrid.push(new Cell(x,y))
        }
    }
}

createGrid();
function handleGameGrid(){
    for (let i = 0; i < gameGrid.length; i ++){
        gameGrid[i].draw();
    }
}
//projectiles

//defenders
class Defender{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '20px Arial';
        ctx.fillText(Math.floor(this.health), this.x, this.y);
    }
}

canvas.addEventListener('click', function(){
    const gridPositionX = mouse.x - (mouse.x%cellSize);
    const gridPositionY = mouse.y - (mouse.y%cellSize);
    if (gridPositionY < cellSize) return;
})
//enemies

//resources

//utilities


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,controlsBar.width, controlsBar.height);
    handleGameGrid();
    requestAnimationFrame(animate);
}

animate();

function collision (first, second){ 
    //this function detects wether two rectangles are colliding with one another
    //this 'if' checks several coordinates and if any are false at any given moment that means that a rectangle is overlapping another at that time.
    //as long as the rectangles we pass into the function have coordinates, we can check collision of each.
    if( !(first.x > second.x + second.width ||
           first.x + first.width < second.x ||
           first.y > second.y+second.height ||
           first.y + first.height < second.y)
           ){
            return true;
           }
}