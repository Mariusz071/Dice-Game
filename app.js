document.addEventListener('DOMContentLoaded', function () {

    let scores, roundScore, activePlayer, diceValue, diceValueB, diceImg, diceBImg, gamePlaying, globalScore, twoRolls, winningValue, form, input; 

    initializeGame();

    // roll dice btn listener
    const diceRoll = document.querySelector('.btn-roll');
    diceRoll.addEventListener('click', function () {
    if (gamePlaying) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let diceB = Math.floor(Math.random() * 6) + 1;

        diceValue = document.querySelector('#current-' + activePlayer);
        diceImg.style = 'block';
        diceImg.src = `img/dice-${dice}.png`;

        diceValueB = document.querySelector('#current-' + activePlayer);
        diceBImg.style = 'block';
        diceBImg.src = `img/dice-${diceB}.png`;

        if(dice !== 1 || diceB !== 1) {
            //add score
            roundScore+= (dice + diceB);
            diceValue.textContent = roundScore;
            twoRolls.push(dice);
            console.log(dice, diceB);
            // sets score to 0 when two six in a row are rolled
            if (twoRolls.length === 2) {
                if (twoRolls[0] === 6 && twoRolls[1] === 6) {
                    scores[activePlayer] = 0;
                    roundScore = 0;
                    globalScore.textContent = `${scores[activePlayer]}`;
                    twoRolls = [];
                    nextPlayer();
                } else {
                    twoRolls = [];
                }
            }
        }
        if (dice === 1 || diceB === 1) {
            nextPlayer();
        }
    }

});

    const holdPoints = document.querySelector('.btn-hold');
    holdPoints.addEventListener('click', function () {
        if(gamePlaying) {
            scores[activePlayer] += roundScore;
            globalScore = document.getElementById(`score-${activePlayer}`);
            globalScore.textContent=`${scores[activePlayer]}`;

        let winner = document.getElementById(`name-${activePlayer}`);

        if (scores[activePlayer] >= winningValue) {
            diceImg.style.display = "none";
            diceBImg.style.display = "none";
            winner.parentElement.classList.remove('active');
            winner.parentElement.classList.add('winner');
            winner.textContent = "Winner!";
            gamePlaying = false;
        } else {
            nextPlayer();
        }

    }
});

    // submitting the winning value to the game
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        winningValue = document.querySelector('input').value;

        //input type validation
        if (isNaN(winningValue)) {
            alert('Value must be a number');
        } else {
            document.querySelector('form').style.display="none";
            document.querySelector('.winning-header').textContent = `You need to score ${winningValue} points to win.`;
            document.querySelector('.winning-header').style.display = "inline-block";
        }
});


    //function switching players
    function nextPlayer() {
        twoRolls = [];
        roundScore = 0;

        diceImg.style.display = "none";
        diceValue.textContent = roundScore;

        diceBImg.style.display = "none";
        diceValueB.textContent = roundScore;

        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    }

    // sets all scores to 0
    function initializeGame() {
        gamePlaying = true;
        scores = [0,0];
        roundScore = 0;
        activePlayer = 0;
        document.querySelector('.winning-header').style.display = "none";

        // set initial values to 0
        document.getElementById('score-0').textContent = '0';
        document.getElementById('score-1').textContent = '0';
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //hiding the dice initially
        diceImg = document.querySelector('.dice');
        diceImg.style.display = "none";
        
        diceBImg = document.querySelector('.diceB');
        diceBImg.style.display = "none";

        // display the winning value input
        document.querySelector('form').style.display = "flex";

        //revert player name
        document.getElementById(`name-0`).parentElement.classList.remove('winner');
        document.getElementById(`name-1`).parentElement.classList.remove('winner');
        document.getElementById(`name-0`).parentElement.classList.remove('active');
        document.getElementById(`name-1`).parentElement.classList.remove('active');
        document.getElementById(`name-0`).parentElement.classList.add('active');
        document.getElementById('name-0').textContent = 'Player 1';
        document.getElementById('name-1').textContent = 'Player 2';

        //rolls array
        twoRolls = [];
    }

    const newGame = document.querySelector('.btn-new');
    newGame.addEventListener('click', initializeGame);
});





