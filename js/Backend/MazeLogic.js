
// Found from the website: https://www.4rknova.com/blog/2026/03/01/mulberry32-rng
function mulberry32(a){
    return function(){
        a += 0x6D2B79F5; // Uses this as the contant to shift
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function getRandomRange(min, max, func){
    return Math.floor(func() * (max - min + 1)) + min;
}

console.log("Here is a practice test: " + getRandomRange(20, 50, mulberry32(2552)));

const wordList = ["repeat", "other", "silicone", "quantity", "campaign", "world"];
// MAYBE: Later could add code to read in a separate file into an array

export class LogicNode {

    walls = {"UP": true, "DOWN": true, "LEFT": true, "RIGHT": true};

    letter = "";

    visualized = true;

    position = [-1, -1]; // [x, y]

    constructor(position){
        this.position = position;
    }

    reset(){
        for(const dir in walls){
            dir = true;
        }

        this.letter = "";

        this.visualized = true;
    }

}



export class LogicMaze{

    static directions = {
        "UP": { "shift": [0, -1], "opposite": "DOWN"}, 
        "DOWN": { "shift": [0, 1], "opposite": "UP"}, 
        "LEFT": { "shift": [-1, 0], "opposite": "RIGHT"}, 
        "RIGHT": { "shift": [1, 0], "opposite": "LEFT"}
    };

    #steps = 0;

    #maze; // Going to be an array of nodes (2d array)

    playerPosition; // [x, y]

    visualizedWord; // Going to be the array of letters visualized

    #word = "";

    seed = 25552;

    #randFunc; // Used for random number generation, allows different numbers each time

    #size;

    gameWon = false;

    #toBeVisualized = [];

    constructor(){
        // TODO: Setup the seed with Math.Random()
        let totMin = -100000000;
        let totMax = 100000000;

        // TODO: Set the seed value to the generated one
        this.seed = getRandomRange(totMin, totMax, Math.random);

        this.#randFunc = mulberry32(this.seed);
        // TODO: Add all the nodes to the maze array
        this.#size = getRandomRange(15, 20, this.#randFunc);
        let size = this.#size;
        this.#maze = Array.from({ length: size}, (_, y) => Array.from({ length: size}, (_, x) => new LogicNode([x, y])));

        console.log(this.#maze[size -1][size-1].position);
        // TODO: Pass to the generate maze function
        this.#generateGameObject();

        Object.seal(this.playerPosition); // Restricts the adding of new elements

    }

    /**
     * Generates the maze from the current contextual seed value, and size. Utilizes
     * the Recursive Backtracking maze generation algorithm. Will also pick the word to be
     * guessed.
     */
    #generateGameObject(){ // Pass in an integer

        // TODO: Set the player position relative to the size
        this.playerPosition = [-1, this.#size -1];
        // TODO: Implement the recursive back tracking algorithm
        this.#generateMaze();
        // TODO: Random index into the wordList to get the word
        this.#word = wordList[getRandomRange(0, wordList.length -1, this.#randFunc)];
        // TODO: Set the word visual list to the number of letters
        this.visualizedWord = Array.from({length: this.#word.length}, () => "");
    }

    /**
     * A getter for the steps, to allow viewing but not access to 
     * the steps value outside the class.
     * @returns The steps which is the number of steps that 
     * the player has stepped.
     */
    getScore(){
        return this.#steps;
    }

    #generateMaze(){

        // TODO: Use a local seed variable that you add to every time it is used to make it 
        let rnd = this.#randFunc;
        // actually seem random.
        let seed = this.seed;
        let currX = getRandomRange(0, this.#size -1, rnd);
        let currY = getRandomRange(0, this.#size -1, rnd);
        
        let currNode = this.#maze[currY][currX];
        currNode.visualized = false;
        
        let stack = [currNode]

        let nxtNode;
        while(stack.length > 0){
            let [x, y] = stack[stack.length -1].position;
            let newDirections = [];

            for(const [key, dir] of Object.entries(LogicMaze.directions)){
                let [dx, dy] = dir.shift;
                let nx = x + dx, ny = y + dy;
                
                let isOutOfBounds = (nx < 0 || nx >= this.#size) || (ny < 0 || ny >= this.#size);

                if(!isOutOfBounds){
                    if(this.#maze[ny][nx].visualized){
                        newDirections.push({nx, ny, key})
                    }
                }
            }

            if(newDirections.length > 0){
                let index = getRandomRange(0, newDirections.length -1, rnd);

                let path = newDirections[index];

                let chosenNode = this.#maze[path.ny][path.nx];
                chosenNode.visualized = false;

                chosenNode.walls[LogicMaze.directions[path.key].opposite] = false;
                currNode.walls[path.key] = false;
                
                stack.push(chosenNode);
            } else{
                stack.pop();
            }

        }
    }

    /**
     * Function to move the character. Checks the validity of the move that was
     * input.
     * @param {string} direction - Tells the direction that the 
     * @returns boolean value which tells whether an item was collected
     */
    move(direction){ // Pass in boolean values always
        
        // TODO: Check if the move is valid or not
        let [dx, dy] = directions[direction]["shift"];
        
        let [nx, ny] = [this.playerPosition[0] + dx, this.playerPosition[1] + dy];

        checkInBounds = (nx >= 0 && nx < this.#size) && (ny >= 0 && ny < this.#size);

        let validMove = false;
        if(checkInBounds && this.#steps === 0){
            if(direction === "RIGHT"){
                validMove = true;

            }
        } else if(checkInBounds){

            validMove = !(this.#maze[this.playerPosition[1]][this.playerPosition[0]].walls[direction]);

        }

        if(validMove){
            this.#steps++;

            this.playerPosition = [nx, ny];

            let tmpNode = this.#maze[ny][nx];

            if(tmpNode.letter.length > 0){
                let index = this.#word.indexOf(tmpNode.letter);

                this.visualizedWord[index] = tmpNode.letter;

                return true;
            }
        }

        // TODO: Index into the nodes at the player position
        // TODO: Check whether there was a letter at that position
        // TODO: If there was add this to the visualized letters list and then return true

        return false; 
    }

    #stageNodesForVisualization(dist){
        let currNode = this.#maze();

        if(!currNode.visualized){
            this.#toBeVisualized.push(currNode);
            currNode.visualized = true;
        }

        if(dist > 2){
            return;
        }

        for(const [key, dir] of Object.entries(LogicMaze.directions)){

            if(!currNode.walls[key]){
                
            }
        }
    }

    isGuessImminent(){
        // TODO: Index into the player's current position

        // TODO: Determine if this position is the final node (top right corner)
        // TODO: Return true if so, otherwise return false
        let [x, y] = [this.playerPosition[0], this.playerPosition[1]];
        if(x === this.#size - 1 && y === 0){
            return true;
        }

        return false;
    }

    /**
     * Will check the guessed word with the actual word and determine if
     * the guess can be made.
     * @param {string} wordGuess - The string that was input to be guessed
     * @returns boolean value of whether the guess was correct
     */
    guess(wordGuess){
        // TODO: Call isGuessImminent to determine if the character is able to guess
        // TODO: Check the guess with the stored word
        // TODO: If correct move the character to the right
        // TODO: If correct set gameNotWon to false
        // TODO: If correct return true, otherwise return false
        if(isGuessImminent()){
            if(wordGuess === this.#word){
                this.gameWon = true;
            }
        }

        return false;
    }

    /**
     * Will reset all the default 
     * @param {number} seed - Integer number that defines the new seed. If null will randomly generate.
     */
    reset(seed = null){ // Pass in an integer
        // TODO: Clear the nodes within the maze
        // TODO: Clear the word list and set the string to empty
        // TODO: Use general random numbers to create the seed, and then pass it to the generate Maze Function
        // TODO: If seed isn't null pass this into generate maze instead
    }
}


export const maze = new LogicMaze();