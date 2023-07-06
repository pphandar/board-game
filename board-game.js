const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let board = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ']
];


let piecePositions = {
    'A': {row: 1, col: 1},
    'B': {row: 2, col: 4},
    'C': {row: 4, col: 0},
    'D': {row: 4, col: 2},
    'X': {row: 4, col: 4}
};

function generateBoard() {
    for (let piece in piecePositions) {
        const {row, col} = piecePositions[piece];
        board[row][col] = piece;
    }
}

function resetBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = ' ';
        }
    }
}

function printBoard() {
    resetBoard()
    generateBoard()
    console.log('\n' +
        ' ' + board[0][0] + ' | ' + board[0][1] + ' | ' + board[0][2] + ' | ' + board[0][3] + ' | ' + board[0][4] + '\n' +
        '---+---+---+---+---\n' +
        ' ' + board[1][0] + ' | ' + board[1][1] + ' | ' + board[1][2] + ' | ' + board[1][3] + ' | ' + board[1][4] + '\n' +
        '---+---+---+---+---\n' +
        ' ' + board[2][0] + ' | ' + board[2][1] + ' | ' + board[2][2] + ' | ' + board[2][3] + ' | ' + board[2][4] + '\n' +
        '---+---+---+---+---\n' +
        ' ' + board[3][0] + ' | ' + board[3][1] + ' | ' + board[3][2] + ' | ' + board[3][3] + ' | ' + board[3][4] + '\n' +
        '---+---+---+---+---\n' +
        ' ' + board[4][0] + ' | ' + board[4][1] + ' | ' + board[4][2] + ' | ' + board[4][3] + ' | ' + board[4][4] + '\n');
}

function isWinner() {
    const position = piecePositions["X"];
    const {row, col} = position;
    if(row === 2 && col === 2) {
        printBoard()
        console.log("Congrats you win!");
        process.exit();
    }
}




function moveUp(piece) {
    const position = piecePositions[piece];
    let {row, col} = position;
    while (row > 0 && board[row - 1][col] === ' ') {
        row--;
    }

    if (row !== 0) {
        piecePositions[piece] = {row, col};
    } else {
        console.log("Invalid move");
    }
}

function moveDown(piece) {
    const position = piecePositions[piece];
    let {row, col} = position;
    while (row < 4 && board[row + 1][col] === ' ') {
        row++;
    }

    if (row !== 4) {
        piecePositions[piece] = {row, col};
    } else {
        console.log("Invalid move");
    }
}

function moveLeft(piece) {
    const position = piecePositions[piece];
    let {row, col} = position;
    while (col > 0 && board[row][col - 1] === ' ') {
        col--;
    }

    if (col !== 0) {
        piecePositions[piece] = {row, col};
    } else {
        console.log("Invalid move");
    }
}

function moveRight(piece) {
    const position = piecePositions[piece];
    let {row, col} = position;
    while (col < 4 && board[row][col + 1] === ' ') {
        col++;
    }

    if (col !== 4) {
        piecePositions[piece] = {row, col};
    } else {
        console.log("Invalid move");
    }
}

function startGame() {
    printBoard();
    rl.question(`Enter the piece and direction (e.g. "X U") to make your move: `, (input) => {
        const [piece, direction] = input.split(' ');
        switch (direction) {
            case 'U':
                moveUp(piece);
                break;
            case 'D':
                moveDown(piece);
                break;
            case 'L':
                moveLeft(piece);
                break;
            case 'R':
                moveRight(piece);
                break;
            default:
                console.log("Invalid direction. Use 'U', 'D', 'L', or 'R'.");
        }
        isWinner();
        startGame();

        // if (row >= 1 && row <= 3 && col >= 1 && col <= 3) {
        //     makeMove(row - 1, col - 1);
        //     startGame();
        // } else {
        //     console.log('Invalid input. Please enter row and column numbers between 1 and 3.');
        //     startGame();
        // }
    });
}

console.log('Welcome to Lunar Landing!');
startGame();
