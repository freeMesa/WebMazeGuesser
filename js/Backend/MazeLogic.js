
class Node {

    up = false;
    down = false;
    right = false;
    left = false;

    letter = "";

    visualized = false;
}

class LogicMaze{

    maze = [];

    playerPosition = [-1, 0];

    word = "";

    seed = 25552;

    constructor(){
        Object.seal(this.playerPosition);
    }

    generateMaze(seed){ // Pass in an integer

    }

    move(x, y){ // Pass in boolean values

    }

    reset(seed){ // Pass in an integer

    }
}

console.log("This is a test");