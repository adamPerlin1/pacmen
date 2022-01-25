'use strict';
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    };
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return;

    var nextLocation = getNextLocation(ev);
    var nextCellContent = gBoard[nextLocation.i][nextLocation.j];

    if (nextCellContent === WALL) return;

    if (nextCellContent === GHOST) {
        if (!gPacman.isSuper) {
            gameOver(false);
            return;
        }
        var deadIdx = getGhostByLocation(nextLocation);
        gDeadGhosts.push(gGhosts.splice(deadIdx, 1)[0]);
    };

    if (nextCellContent === FOOD) {
        updateScore(1);
        gGame.eatenFoodCount++;

        if (checkVictory()) gameOver(true);

    } else if (nextCellContent === POWER_FOOD) {
        if (gPacman.isSuper) return;

        gPacman.isSuper = true;
        showVulnerable(gPacman.isSuper)
        setTimeout(function () {
            gPacman.isSuper = false;
            reviveGhosts();
            showVulnerable(gPacman.isSuper);
        }, 5000)

    } else if (nextCellContent === CHERRY) {
        updateScore(10);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
    // update the DOM
    renderCell(gPacman.location, EMPTY);
    // Move the pacman
    gPacman.location = nextLocation;
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}

function getNextLocation(ev) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    };
    // figure out nextLocation
    switch (ev.key) {
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
    }

    return nextLocation;
}