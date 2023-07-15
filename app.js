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

function placePieces() {
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

function generateBoard() {
    // Generate the game board based on the piece positions
    resetBoard();
    placePieces();
    console.log("generating board");
    let boardHTML = '';
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const piece = getPieceAtPosition(i, j);
            boardHTML += piece !== ' ' ? `<span class="piece">${piece}</span>` : '<span></span>';
        }
        // boardHTML += '<br>';
    }
    document.getElementById('board').innerHTML = boardHTML;
}

function getPieceAtPosition(row, col) {
    // Get the piece at the given row and column
    for (let piece in piecePositions) {
        const position = piecePositions[piece];
        if (position.row === row && position.col === col) {
            return piece;
        }
    }
    return ' ';
}

function isWinner() {
    const position = piecePositions["X"];
    const {row, col} = position;
    if (row === 2 && col === 2) {
        generateBoard();
        alert("Congrats you win!");
        resetBoard();
    }
}

function resetBoard() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = ' ';
        }
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
    console.log("printing piece");
    console.log(piece);
    let {row, col} = position;
    console.log("row and col: " + row + " " + col);
    while (col > 0 && board[row][col - 1] === ' ') {
        col--;
    }
    console.log("row and col: " + row + " " + col);
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

function movePiece(piece, direction) {
    console.log(piecePositions);
    const position = piecePositions[piece];
    let {row, col} = position;
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
            return;
    }
    generateBoard();
    isWinner();
    if (row !== position.row || col !== position.col) {
        piecePositions[piece] = {row, col};
        generateBoard();
        isWinner();
    } else {
        console.log("Invalid move");
    }
}

function startGame() {
    console.log(piecePositions);
    generateBoard();

    const moveButton = document.getElementById('moveButton');
    moveButton.addEventListener('click', () => {
        const input = document.getElementById('moveInput').value;
        const [piece, direction] = input.split(' ');
        movePiece(piece, direction);
    });
}

console.log('Welcome to Lunar Landing!');
startGame();
