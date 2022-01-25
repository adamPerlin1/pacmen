'use strict';
const WALL = '🧱';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🍕';
const CHERRY = '🍒';


var gBoard;
var gCherryInterval;
var gGame = {
    score: 0,
    isOn: false,
    foodCount: -4,
    eatenFoodCount: 0
};

function init() {
    console.log('hello');
    gBoard = buildBoard();
    createGhosts(gBoard);
    createPacman(gBoard);
    printMat(gBoard, '.board-container');
    gGame.isOn = true;
    gGame.score = 0;
    gCherryInterval = setInterval(addCherry, 15000);
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('h2 span').innerText = 0;
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                
            }
            if (board[i][j] === FOOD) gGame.foodCount++;
        }
    }
    
    board[1][1] = POWER_FOOD;
    board[SIZE-2][SIZE-2] = POWER_FOOD;
    board[1][SIZE-2] = POWER_FOOD;
    board[SIZE-2][1] = POWER_FOOD;

    return board;
}


// update model and dom
function updateScore(diff) {
    // model
    gGame.score += diff;

    //dom
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
}

function checkVictory() {
    return (gGame.foodCount === gGame.eatenFoodCount);
}

// TODO
function gameOver(isWin) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    var txt = isWin ? 'You Won!' : 'You Lose!';
    var color = isWin ? 'green' : 'red';
    document.querySelector('.modal h3').innerText = txt;
    document.querySelector('.modal').style.backgroundColor = color;
    document.querySelector('.modal').style.display = 'block';
}

function addCherry(){
    var emptySpaces = getEmptySpaces();
	if (emptySpaces.length === 0) return;
	var emptySpace = emptySpaces[getRandomIntInclusive(0, emptySpaces.length - 1)];
    gBoard[emptySpace.i][emptySpace.j] = CHERRY;
    renderCell(emptySpace, CHERRY);
}

function getEmptySpaces() {
	var emptySpaces = [];
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			if (gBoard[i][j] === WALL) continue;
			if (gBoard[i][j] === EMPTY) emptySpaces.push({ i: i, j: j });
		}
	}
	return emptySpaces;
}

