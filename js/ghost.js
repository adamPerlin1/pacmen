'use strict';
const GHOST = '&#9781;';

var gGhosts = [];
var gIntervalGhosts;
var gDeadGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()

    };
    gGhosts.push(ghost);
    //model
    board[ghost.location.i][ghost.location.j] = GHOST;
}

// 3 ghosts and an interval
function createGhosts(board) {
    gGhosts = [];
    createGhost(board);
    createGhost(board);
    createGhost(board);
    gIntervalGhosts = setInterval(moveGhosts, 3000);
}

// loop through ghosts
function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i]);
    }
}

function moveGhost(ghost) {
    // figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    };
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCellContent === WALL) return;
    if (nextCellContent === GHOST) return;
    // hitting a pacman?  call gameOver
    if (nextCellContent === PACMAN) {
        if (!gPacman.isSuper){
            gameOver();
            return;
        }
        return;
    }

    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent);
    // Move the ghost
    ghost.location = nextLocation;
    ghost.currCellContent = nextCellContent;
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost));
}

function showVulnerable(isVulnerable){
    if (isVulnerable){
        for (var i = 0; i < gGhosts.length; i++){
            gGhosts[i].color = 'blue';
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
        }
    } else {
        for (var i = 0; i < gGhosts.length; i++){
            gGhosts[i].color = getRandomColor();
            renderCell(gGhosts[i].location, getGhostHTML(gGhosts[i]));
        }
    }
}

function reviveGhosts(){
    for (var i = 0; i < gDeadGhosts.length; i++){
        gGhosts.push(gDeadGhosts.splice(i, 1)[0]);
    }
}


function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 };
    } else if (randNum < 50) {
        return { i: -1, j: 0 };
    } else if (randNum < 75) {
        return { i: 0, j: -1 };
    } else {
        return { i: 1, j: 0 };
    }
}


function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`;
}

function getGhostByLocation(location) { 
    for (var i = 0; i < gGhosts.length; i++) {
      if (gGhosts[i].location.i === location.i
        && gGhosts[i].location.j === location.j) {
        return i;
      }
    }
    return null;
}