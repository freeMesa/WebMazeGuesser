import { VisualMaze, VisualNode } from "./VisualMaze";
import { maze } from "./Backend/MazeLogic";

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

function move(x, y){

}

function getNodes(){
    
}


