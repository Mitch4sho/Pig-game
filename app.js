/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, dice, gamePlaying, diceArray, winningScore;

init();


document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random Number generator 
        dice = Math.floor(Math.random() * 6) + 1;

        dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display results
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');

        //first Dice 
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //second Dice
        diceDOM2.style.display = ' block';
        diceDOM2.src = "dice-" + dice2 + '.png';

        //for new rule 
        diceArray.unshift(dice);
        console.log(diceArray);

        if (diceArray[0] === 6 && diceArray[1] === 6) {
            // Player loses all points
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';

            //move to the next player
            nextPlayer();
        }
        // removes the 3rd index in the array
        if (2 < diceArray.length) {
            diceArray.pop();
        }

        //3. update the round score IF the rolled was NOT 1
        if (dice === 1 && dice2 === 1) {
            nextPlayer();

        } else {
            roundScore += (dice + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Winning score 
        var input = document.querySelector('.winningScore').value;


        // check if value is there 
        //if true it will continue
        if (input) {
            winningScore = input
        } else {
            // the score should be defaulted to 100
            winningScore = 100;
        }


        //Update UI 
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player wins
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //nextPlayer 
            nextPlayer();
        }
    }
})

//New game button 
document.querySelector('.btn-new').addEventListener('click', init);

// Init New game 
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    diceArray = [];
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function nextPlayer() {
    //Next Player 
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //reset score 
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // add active class or remove active class for current player 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

// function inputScore() {

// }