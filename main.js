// declare global vars (bad practice, but I struggled to think of a better way)
const SCORE_TO_WIN = 5;
let playerScore = 0;
let computerScore = 0;

initializeGame();

function initializeGame() {
    playerScore = 0;
    computerScore = 0;

// Determine which input the user clicks
    const bpsButtons = document.querySelectorAll('.bpsInputs > input');
    const playerBoard = document.querySelector('.board.player');

    const playerSelectionImg = document.querySelector('.board.player > img'); 
    const playerSelectionLabel = document.querySelector('.board.player > img'); 

    bpsButtons.forEach(button => button.addEventListener('click',() => {
        console.log(button);
        console.log(playerSelectionImg);

        playerBoard.querySelector('img').src = 'images/boulder.svg';
        playerBoard.querySelector('p').innerText = 'Player selects ...';   
    }));
};


//  get random number, 1-3, for computer
function computerPlay() {
    let randInt = Math.floor(Math.random()*3) +1;
    switch (randInt) {
        case 1:
            return 'boulder';
            break;
        case 2:
            return 'parchment';
            break;
        case 3:
            return 'Shears';
            break;
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
                if (computerChoice === 'Shears') {
                    result = 'win';
                }
                break;
            case 'parchment':
                if (computerChoice === 'boulder') {
                    result = 'win';
                }
                break;
            case 'Shears':
                if (computerChoice === 'parchment') {
                    result = 'win';
                }
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
    playerScore += (roundResult === 'win') ? 1 : 0;
    computerScore += (roundResult === 'lose') ? 1 : 0;
    console.log(`Computer chooses ${computerSelection}. You ${roundResult}!`);
    
    roundPrompt = `The score is player: ${playerScore} to computer: ${computerScore}`;


    console.log('The bout is decided... ');
    console.log((playerScore === 5) ? 'You win!' : 'You lose!');

}

// Function to display results

