
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

    up = false;
    down = false;
    right = false;
    left = false;

    letter = "";

    visualized = true;

    position = [-1, -1]; // [x, y]

    constructor(position){
        this.position = position;
    }

    reset(){
        this.up = false;
        this.down = false;
        this.right = false;
        this.left = false;

        this.letter = "";

        this.visualized = true;
    }

}

export class LogicMaze{

    #maze; // Going to be an array of nodes (2d array)

    playerPosition; // [x, y]

    visualizedWord; // Going to be the array of letters visualized

    #word = "";

    seed = 25552;

    #size;

    #gameNotWon = true;

    constructor(){
        Object.seal(this.playerPosition); // Restricts the adding of new elements
        // TODO: Setup the seed with Math.Random()
        let int32_min = 1 << 31;
        let int32_max = Math.pow(2, 31) - 1;


        // TODO: Set the seed value to the generated one
        this.seed = getRandomRange(int32_min, int32_max, Math.random);

        // TODO: Add all the nodes to the maze array
        this.#size = getRandomRange(15, 20, mulberry32(this.seed));
        let size = this.#size;
        this.#maze = Array.from({ length: size}, (_, x) => Array.from({ length: size}, (_, y) => new LogicNode([x, y])));

        console.log(this.#maze[size -1][size-1].position);
        // TODO: Pass to the generate maze function
        this.#generateMaze();
    }

    /**
     * Generates the maze from the current contextual seed value, and size. Utilizes
     * the Recursive Backtracking maze generation algorithm. Will also pick the word to be
     * guessed.
     */
    #generateMaze(){ // Pass in an integer

        // TODO: Set the player position relative to the size

        // TODO: Implement the recursive back tracking algorithm

        // TODO: Random index into the wordList to get the word
        // TODO: Set the word visual list to the number of letters
    }

    /**
     * Function to move the character. Checks the validity of the move that was
     * input.
     * @param {boolean} x - Whether the player traveled horizontally
     * @param {boolean} y - Whether the player traveled vertically
     * @returns boolean value which tells whether an item was collected
     */
    move(x, y){ // Pass in boolean values always
        let tmpX = x ? this.playerPosition[0] + 1 : this.playerPosition[0];
        let tmpY = y ? this.playerPosition[1] + 1 : this.playerPosition[1];

        // TODO: Check if the move is valid or not
        if(validMove){
            this.playerPosition[0] = tmpX;
            this.playerPosition[1] = tmpY;

        }

        // TODO: Index into the nodes at the player position
        // TODO: Check whether there was a letter at that position
        // TODO: If there was add this to the visualized letters list and then return true

        return false; 
    }

    isGuessImminent(){
        // TODO: Index into the player's current position
        // TODO: Determine if this position is the final node (top right corner)
        // TODO: Return true if so, otherwise return false
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