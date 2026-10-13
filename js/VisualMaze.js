export class VisualMaze{

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

export class VisualNode{
    // Showing which directions the node is "connected"
    walls = {"UP": true, "DOWN": true, "LEFT": true, "RIGHT": true};

    letter = false; // Whether the cell contains a letter

    toBeVisualized = false; // Used to flag whether the node should be visulizd on the screen

}