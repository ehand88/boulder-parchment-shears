// declare global vars (bad practice, but I struggled to think of a better way)

playGame();

function playGame() {
    const SCORE_TO_WIN = 5;
    let playerScore = 0;
    let computerScore = 0;
    let playerResults = [];
    let computerResults = [];
    let roundResults = [];

// Determine which input the user clicks
    const bpsButtons = document.querySelectorAll('.bpsInputs > input');

    bpsButtons.forEach(button => button.addEventListener('click',() => {
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

// stylize boards
        clearBoardStyle('.play-board > div', 'winner');
        if(roundResult !== 'tie') {
            stylizeWinnerBoard(roundResult);
        }
// populate boards
        updateBoards('player', playerPlay, playerScore);
        updateBoards('computer', computerPlay, computerScore);
        updateResults(playerResults[0], computerResults[0], roundResults[0]);

// determine if game winner decided yet
    }));
};

function stylizeWinnerBoard(winner) {
    const winnerBoard = document.querySelector(`.play-board > .${winner}`);
    winnerBoard.classList.add('winner');
}

function clearBoardStyle(query,classToRemove) {
    const els = document.querySelectorAll(query);
    els.forEach(el => el.classList.remove(classToRemove));
}

function updateBoards(entity, selection, score) {
    document.querySelector(`.${entity} > .selection`).src =`images/${selection}.svg`;
    document.querySelector(`.${entity} > .caption`).innerText = `${selection}`;
    document.querySelector(`.${entity} > .score`).innerText = `${score}`;
}

function updateResults(playerData, computerData, resultData) {
    const resultsTable = document.querySelector('.results-table > tbody');
    
    const tRow = document.createElement('tr');
    const tDataPlayer = document.createElement('td');
    const tDataResult = document.createElement('td');
    const tDataComputer = document.createElement('td');

    tDataPlayer.innerText = `${playerData[0]}`;
    tDataResult.innerText = `${resultData.toUpperCase()}`;
    tDataComputer.innerText = `${computerData[0]}`;

    if(resultData !== 'tie') {
        (resultData === 'player') ? tDataPlayer.classList.add('highlight') : tDataComputer.classList.add('highlight');
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


/*  add round result to results table, 
    if number of wins = 5 then declare winner, else continue */
function playRound(playerSelection) {
    let computerSelection = '';
    let roundResult = '';
    let roundPrompt = 'Choose wisely!';
//    let roundLog = [];

    computerSelection = computerPlay();
    roundResult = playRound(playerSelection,computerSelection);
    
    
    roundPrompt = `The score is player: ${playerScore} to computer: ${computerScore}`;


    console.log('The bout is decided... ');
    console.log((playerScore === 5) ? 'You win!' : 'You lose!');

}

// Function to display results

