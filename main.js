// declare global vars (bad practice, but I struggled to think of a better way)

playGame();

function playGame() {
    const SCORE_TO_WIN = 5;
    let playerScore = 0;
    let computerScore = 0;
    let resultsData = [];

// Determine which input the user clicks
    const bpsButtons = document.querySelectorAll('.bpsInputs > input');
    const playerBoard = document.querySelector('.board.player');
    const computerBoard = document.querySelector('.board.computer');
    const resultsTable = document.querySelector('.results-table');


    bpsButtons.forEach(button => button.addEventListener('click',() => {
        const playerPlay = button.id.valueOf();
        const computerPlay = determineComputerPlay();

// populate round results
        const roundResult = determineWinner(playerPlay, computerPlay);
        playerScore += (roundResult === 'player') ? 1 : 0;
        computerScore += (roundResult === 'computer') ? 1 : 0;
        resultsData.unshift(`Computer chooses ${computerPlay}. ${roundResult.toUpperCase()} wins the round!`);

// calculate stats - total rounds; total r,b,s; ratio r,b,s; wins/losses

// stylize boards
        clearBoardStyle([playerBoard, computerBoard]);
        if(roundResult !== 'tie') {
            stylizeWinnerBoard(`${roundResult}Board`);
        }
// populate boards
        updateBoard(playerBoard, playerPlay, playerScore);   
        updateBoard(computerBoard, computerPlay, computerScore);
        updateTable(resultsTable, resultsData);

// determine if game winner decided yet
    }));
};

function stylizeWinnerBoard(winnerBoard) {
    winnerBoard.setAttribute('.winner');
}

function clearBoardStyle(boardsToClear) {
    const boards = Array.from(boardsToClear);
    boards.forEach((board) => board.removeAttribute('.winner'));
}

function updateBoard(boardElement, selection, score) {
    boardElement.querySelector('img').src =`images/${selection}.svg`;
    boardElement.querySelector('p').innerText = `${selection}`;
    boardElement.querySelector('.score').innerText = `${score}`;
}

function updateTable(tableElement, tableData) {
    // tableElement.querySelector('p').innerText += `${tableData}\n`;
    const tableP = tableElement.querySelector('p');
    tableP.innerText = '';
    const tenResults = tableData.slice(0,10);
    tenResults.forEach((result) => {
        tableP.innerText += `${result}\n`;
    } );
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

