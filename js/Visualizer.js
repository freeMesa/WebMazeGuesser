class VisualMaze{

    mazeGrid = [];
    playerPos = [-1, 0];
    constructor(size){
        for(let i = 0; i < size; i++){
            grid.push(new Array(size).fill(0));
            for(let j = 0; j < size; j++){
                mazeGrid[i][j] = new Node();
            }
        }
    }

    addIndex(node, x, y){
        mazeGrid[x][y] = node;
    }

    getIndex(x, y){
        return mazeGrid[x][y];
    }

    move(direction, mag){
        if(direction === "VERTICAL"){
            playerPos[1] += mag;
        } else if(direction === "HORIZONTAL"){
            playerPos[0] += mag;
        }
    }
}

class Node{
    // Showing which directions the node is "connected"
    up = false;
    down = false;
    right = false;
    left = false;

    letter = false; // Whether the cell contains a letter

    toBeVisualized = false; // Used to flag whether the node should be visulizd on the screen

}

// Draws at every frame, will draw the background, then maze, then "shadow", then player
function draw(maze){

    requestAnimationFrame(draw); // Used to request the next frame
}

// Call When a movement direction is called, utilized for the API call
function move(direction){
    if(direction === "UP"){

    } else if(direction === "DOWN"){

    } else if(direction === "RIGHT"){

    } else { // Direction is left

    }
}

document.addEventListener('keydown', (event) => {
    if(event.key === 'ArrowLeft'){
        move("LEFT");
    } else if(event.key === 'ArrowRight'){
        move("RIGHT");
    } else if(event.key === 'ArrowUp'){
        move("UP");
    } else if(event.key === 'ArrowDown'){
        move("DOWN");
    }
});

// used the set up the maze to be visualized
function setup(){
    // sends the related seed and gets back the size of the maze
    size = 2;
    const maze = new VisualMaze(size);

    draw(); // calling the draw function to start the loop


}

setup();


