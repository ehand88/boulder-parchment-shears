let computerSelection = computerPlay();
let userSelection = userPlay();
console.log(playRound(userSelection,computerSelection));

//  get input from the user
function userPlay() {
   let selection = prompt('Choose your strategy!'); 
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
    if (playerChoice === computerChoice) {
            return 'Tie!';
    }
    else {
        switch (playerChoice) {
            case 'Boulder':
                if (computerChoice === 'Shears') {
                    return `You win! ${playerChoice} beats ${computerChoice}`;
                }
                else {
                    `You lose! ${computerChoice} beats ${playerChoice}`;
                }
                break;
            case 'Parchment':
                if (computerChoice === 'Boulder') {
                    return `You win! ${playerChoice} beats ${computerChoice}`;
                }
                else {
                    `You lose! ${computerChoice} beats ${playerChoice}`;
                }
                break;
            case 'Shears':
                if (computerChoice === 'Parchment') {
                    return `You win! ${playerChoice} beats ${computerChoice}`;
                }
                else {
                    `You lose! ${computerChoice} beats ${playerChoice}`;
                }
                break;
        }  
    }
}


/*  add round result to results table, 
    if number of wins = 5 then declare winner, else continue */