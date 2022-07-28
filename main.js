// declare global vars (bad practice, but I struggled to think of a better way)

function playGame() {
    const SCORE_TO_WIN = 5;
    let playerScore = 0;
    let computerScore = 0;
    let playerResults = [];
    let computerResults = [];
    let roundResults = [];

// Determine which input the user clicks
    const bpsButtons = document.querySelectorAll('.bpsInputs > input');

    bpsButtons.forEach(button => {
        button.removeAttribute('disabled','');
        button.classList.add('bpsButton');
        button.addEventListener('click', function playRound() {
        const playerPlay = button.id.valueOf();
        const computerPlay = determineComputerPlay();

// populate round results
        const roundResult = determineWinner(playerPlay, computerPlay);
        playerScore += (roundResult === 'player') ? 1 : 0;
        computerScore += (roundResult === 'computer') ? 1 : 0;
        playerResults.unshift([playerPlay, playerScore]);
        computerResults.unshift([computerPlay, computerScore]);
        roundResults.unshift(roundResult);

// calculate stats - total rounds; total r,b,s; ratio r,b,s; wins/losses

// populate boards
        updateBoards('player', playerPlay, playerScore);
        updateBoards('computer', computerPlay, computerScore);
        updateResults(playerResults[0], computerResults[0], roundResults[0]);

// stylize boards
        clearBoardStyle('.play-board > div', 'winner');
        if(roundResult !== 'tie') {
            stylizeWinnerBoard(roundResult);
        }
 
// determine if game winner decided yet
        if(playerScore === SCORE_TO_WIN || computerScore === SCORE_TO_WIN) {
            (playerScore === SCORE_TO_WIN) ? declareWinner('player') : declareWinner('computer');
            // remove event listener
            console.log(bpsButtons);
            bpsButtons.forEach(button => {
                 button.removeEventListener('click', playRound);
                 button.setAttribute('disabled','');
                 button.classList.remove('bpsButton');
            });
        }
    })});
};

function declareWinner(winner) {
    document.querySelector('.score-board > .middle-column').innerText = `${winner.toUpperCase()} wins!`;
}

function stylizeWinnerBoard(winner) {
    const winnerBoard = document.querySelector(`.play-board > .${winner}`);
    winnerBoard.classList.add('winner');
}

function clearBoardStyle(query,classToRemove) {
    const els = document.querySelectorAll(query);
    els.forEach(el => el.classList.remove(classToRemove));
}

function updateBoards(entity, entitySelection, entityScore) {
    document.querySelector(`.${entity} > .selection`).src =`images/${entitySelection}.svg`;
    document.querySelector(`.${entity} > .caption`).innerText = `${entitySelection}`;
    document.querySelector(`.${entity} > .score`).innerText = `${entityScore}`;
}

function updateResults(playerData, computerData, resultData) {
    const resultsTable = document.querySelector('.results-table > tbody');
    
    const tRow = document.createElement('tr');
    const tDataPlayer = document.createElement('td');
    const tDataResult = document.createElement('td');
    const tDataComputer = document.createElement('td');

    tDataPlayer.innerText = `${playerData[0]}`;
    tDataResult.innerText = `[${playerData[1]}]   ===   [${computerData[1]}]`;
    tDataComputer.innerText = `${computerData[0]}`;

    if(resultData !== 'tie') {
        
        if(resultData === 'player') {
            tDataPlayer.classList.add('highlight');
            tDataResult.innerText =  `[${playerData[1]}]   <==   [${computerData[1]}]`; //⏮⏪◀⬅        
         } else {
            tDataComputer.classList.add('highlight');
            tDataResult.innerText = `[${playerData[1]}]   ==>   [${computerData[1]}]`; //⏭⏩▶➡
         }
    }

    tRow.appendChild(tDataPlayer);
    tRow.appendChild(tDataResult);
    tRow.appendChild(tDataComputer);

    resultsTable.insertBefore(tRow,resultsTable.children[0]);

    const tRows = document.querySelectorAll('tr');
    if(tRows.length > 11) {
        resultsTable.removeChild(tRows[11]);
    }
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

