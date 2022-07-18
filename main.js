// declare global vars (bad practice, but I struggled to think of a better way)

playGame();

function playGame() {
    const SCORE_TO_WIN = 5;
    let playerScore = 0;
    let computerScore = 0;

// Determine which input the user clicks
    const bpsButtons = document.querySelectorAll('.bpsInputs > input');
    const playerBoard = document.querySelector('.board.player');
    const computerBoard = document.querySelector('.board.computer');
    // const resultsTable = document.querySelector('.board.computer');


    bpsButtons.forEach(button => button.addEventListener('click',() => {
        const playerPlay = button.id.valueOf();
        const computerPlay = determineComputerPlay();

// populate round results
        const roundResult = determineWinner(playerPlay, computerPlay);
        playerScore += (roundResult === 'win') ? 1 : 0;
        computerScore += (roundResult === 'lose') ? 1 : 0;
        const resultsData = (`Computer chooses ${computerPlay}. You ${roundResult}!`);

// populate boards
        updateBoard(playerBoard, playerPlay, playerScore);   
        updateBoard(computerBoard, computerPlay, computerScore);
        updateTable(resultsData);

// determine if game winner decided yet
    }));
};

function updateBoard(boardElement, selection, score) {
    boardElement.querySelector('img').src =`images/${selection}.svg`;
    boardElement.querySelector('p').innerText = `Computer selects ${selection}`;
    boardElement.querySelector('.score').innerText = `${score}`;
}

function updateTable(tableData) {

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
    let result = 'lose';
    if (playerChoice === computerChoice) {
            result = 'tie';
    }
    else {
        switch (playerChoice) {
            case 'boulder':
                if(computerChoice === 'shears') { result = 'win' };
                break;
            case 'parchment':
                if (computerChoice === 'boulder') { result = 'win'; }
                break;
            case 'shears':
                if (computerChoice === 'parchment') { result = 'win'; }
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

