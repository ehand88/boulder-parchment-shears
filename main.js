//playGame();

//  get input from the user
function userPlay(roundPrompt) {
   let selection = prompt(roundPrompt); 
   return selection;
}


//  get random number, 1-3, for computer
function computerPlay() {
    let randInt = Math.floor(Math.random()*3) +1;
    switch (randInt) {
        case 1:
            return 'Boulder';
            break;
        case 2:
            return 'Parchment';
            break;
        case 3:
            return 'Shears';
            break;
    }
}


//  compare inputs to determine winner of round
function playRound(playerChoice,computerChoice) {
    let result = 'lose';
    if (playerChoice === computerChoice) {
            result = 'tie';
    }
    else {
        switch (playerChoice) {
            case 'Boulder':
                if (computerChoice === 'Shears') {
                    result = 'win';
                }
                break;
            case 'Parchment':
                if (computerChoice === 'Boulder') {
                    result = 'win';
                }
                break;
            case 'Shears':
                if (computerChoice === 'Parchment') {
                    result = 'win';
                }
                break;
        }  
    }
    return result;
}


/*  add round result to results table, 
    if number of wins = 5 then declare winner, else continue */
function playGame() {
    const SCORE_TO_WIN = 5;
    let playerScore = 0;
    let computerScore = 0;
    let playerSelection = '';
    let computerSelection = '';
    let roundResult = '';
    let roundPrompt = 'Choose wisely!';
//    let roundLog = [];

    while (playerScore < SCORE_TO_WIN && computerScore < SCORE_TO_WIN) {
        computerSelection = computerPlay();
        playerSelection = userPlay(roundPrompt);
        roundResult = playRound(playerSelection,computerSelection);
        playerScore += (roundResult === 'win') ? 1 : 0;
        computerScore += (roundResult === 'lose') ? 1 : 0;
        console.log(`Computer chooses ${computerSelection}. You ${roundResult}!`);
        
        roundPrompt = `The score is player: ${playerScore} to computer: ${computerScore}`;
    }

    console.log('The bout is decided... ');
    console.log((playerScore === 5) ? 'You win!' : 'You lose!');

}