// declare global vars (bad practice, but I struggled to think of a better way)
const SCORE_TO_WIN = 5;
const bpsButtons = document.querySelectorAll('.bps-button');
let playerScore = 0;
let computerScore = 0;
let round = 0;
let playerResults = [];
let computerResults = [];
let roundResults = [];

function playGame() {
    playerScore = 0;
    computerScore = 0;
    clearStyle('.btn-start','active');
    document.querySelector('.score-board > .middle-column').innerText = '';
    updateScore('player', 0);
    updateScore('computer', 0);

// Determine which input the user clicks
    bpsButtons.forEach(button => {
        if(button.id !== 'computer') {
            button.removeAttribute('disabled','');
            button.parentElement.classList.remove('disabled');
            button.parentElement.classList.add('active');
            button.addEventListener('click', playRound);
        }
    });
}

function playRound() {
    const button = this;
    const playerPlay = button.id.valueOf();
    const computerPlay = determineComputerPlay();
    updateSelection('computer', computerPlay);

// populate round results
    const roundResult = determineWinner(playerPlay, computerPlay);
    playerScore += (roundResult === 'player') ? 1 : 0;
    computerScore += (roundResult === 'computer') ? 1 : 0;
    playerResults.unshift([playerPlay, playerScore]);
    computerResults.unshift([computerPlay, computerScore]);
    roundResults.unshift(roundResult);

    // stylize boards
    if(roundResult !== 'tie') {
        stylizeWinnerBoard(button, roundResult);
    }

    //animate boards
    animateSelections(button);
    setTimeout(() => {
        animateSelections(button);
        clearStyle('.bps-button', 'winner');
    }, 1500);

// calculate stats - total rounds; total r,b,s; ratio r,b,s; wins/losses

// populate boards
    updateScore('player', playerScore);
    updateScore('computer', computerScore);
    updateResults(playerResults[0], computerResults[0], roundResults[0]);

// determine if game winner decided yet
    if(playerScore === SCORE_TO_WIN || computerScore === SCORE_TO_WIN) {
        (playerScore === SCORE_TO_WIN) ? declareWinner('player') : declareWinner('computer');



        // drawChart('player', playerResults);
        // drawChart('computer', computerResults);
    }
    round++;
}

function animateSelections(clicked) {
    bpsButtons.forEach(button => {
        button.toggleAttribute('disabled');
        if(button !== clicked) {
            button.parentElement.classList.toggle('active');
            button.parentElement.classList.toggle('disabled');
        }
    });
}

function drawChart(entity, entityData) {;
    let xValues = ['boulder', 'parchment', 'shears'];
    let yValues = [0, 0, 0];
    for(let i = 0; i < entityData.length; i++) {
        switch (entityData[i][0]) {
            case 'boulder':
                yValues[0]++;
                break;
            case 'parchment':
                yValues[1]++;
                break;
            case 'shears':
                yValues[2]++;
                break;
        }
    }
    let barColors = [
    "#563f46",
    "#8ca3a3",
    "#484f4f"
    ];

    new Chart(`${entity}Pie`, {
    type: "pie",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        title: {
        display: true,
        responsive: true,
        maintainAspectRatio: false,
        text: "BPS Selection"
        }
    }
    });
}

function declareWinner(winner) {
    document.querySelector('.score-board > .middle-column').innerText = `${winner.toUpperCase()} wins!`;
    const startButton = document.querySelector('.btn-start')
    
    if(winner === 'player') {
        startButton.innerText = 'Defend Your Crown!';
    } else {
        startButton.innerText = 'Reclaim Your Honor!';
    }

    startButton.classList.add('active');

    // remove event listener
    bpsButtons.forEach(btn => {
        btn.removeEventListener('click', playRound);
        btn.setAttribute('disabled','');
        btn.classList.remove('active');
    });
}

function stylizeWinnerBoard(board, winner) {
    const winnerBoard = (winner === 'player') ? board : document.querySelector(`.${winner} > .bps-button`);
    winnerBoard.classList.add('winner');
}

function clearStyle(query,classToRemove) {
    const els = document.querySelectorAll(query);
    els.forEach(el => el.classList.remove(classToRemove));
}

function updateScore(entity, entityScore) {
    document.querySelector(`.${entity} > .score`).innerText = `${entityScore}`;
}

function updateSelection(entity, entitySelection) {
    document.querySelector(`.${entity} > .selection`).src =`images/${entitySelection}.svg`;
    document.querySelector(`.${entity} > .caption`).innerText = `${entitySelection}`;
}

function updateResults(playerData, computerData, resultData) {
    const resultsTable = document.querySelector('.results-table > tbody');
// 
    if(resultsTable.parentElement.clientHeight + 20 > resultsTable.parentElement.parentElement.clientHeight) {
        const tRows = document.querySelectorAll('tr');
        resultsTable.removeChild(tRows[tRows.length - 1]);
    }
    
    const tRow = document.createElement('tr');
    const tdPlayerPlay = document.createElement('td');
    const tdPlayerScore = document.createElement('td');
    const tDataResult = document.createElement('td');
    const tdComputerPlay = document.createElement('td');
    const tdComputerScore = document.createElement('td');

    tdPlayerPlay.innerText = `${playerData[0]}`;
    tdPlayerScore.innerText = `[ ${playerData[1]} ]`;
    tDataResult.innerText = `Round: ${round}`;
    tdComputerScore.innerText = `[ ${computerData[1]} ]`
    tdComputerPlay.innerText = `${computerData[0]}`;

    if(resultData !== 'tie') {
        if(resultData === 'player') {
            tdPlayerPlay.classList.add('highlight')
            tdPlayerScore.classList.add('highlight')
         } else {
            tdComputerPlay.classList.add('highlight');
            tdComputerScore.classList.add('highlight');
         }
    }

    tRow.appendChild(tdPlayerPlay);
    tRow.appendChild(tdPlayerScore);
    tRow.appendChild(tDataResult);
    tRow.appendChild(tdComputerScore);
    tRow.appendChild(tdComputerPlay);

    resultsTable.insertBefore(tRow,resultsTable.children[0]);
}


//  get random number, 1-3, for computer
function determineComputerPlay() {
    let randInt = Math.floor(Math.random()*3) +1;
    switch (randInt) {
        case 1:
            return 'boulder';
        case 2:
            return 'parchment';
        case 3:
            return 'shears';
    }
}


//  compare inputs to determine winner of round
function determineWinner(playerChoice,computerChoice) {
    let result = 'computer';
    if (playerChoice === computerChoice) {
            result = 'tie';
    }
    else {
        switch (playerChoice) {
            case 'boulder':
                if(computerChoice === 'shears') { result = 'player' };
                break;
            case 'parchment':
                if (computerChoice === 'boulder') { result = 'player'; }
                break;
            case 'shears':
                if (computerChoice === 'parchment') { result = 'player'; }
                break;
        }  
    }
    return result;
}

/* just use css :hover instead
document.querySelectorAll('.bpsButton').forEach((bps) => bps.addEventListener('pointerenter', function(e) {
    this.classList.add('grow');
}));

document.querySelectorAll('.bpsButton').forEach((bps) => bps.addEventListener('pointerleave', function(e) {
    this.classList.remove('grow');
}));
*/

// Function to display results

