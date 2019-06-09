/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  //1. rand number
  //let dice = Math.floor(Math.random() * 6) + 1;
  let dice = 6;
  //räknare som håller koll på om spelare 1 eller 2 slagit två gånger
  //C1
  if (prevDice + dice === 12) {
    console.log(prevDice + dice);
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = '0';
    nextPlayer();

  }

  //2 display result
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';

  //3. update the round score IF njumer != 1
  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //C1
    prevDice = dice;



  } else {
    //next player
    lastDice = 0;
    nextPlayer();
  }


});



document.querySelector('.btn-hold').addEventListener('click', function() {

  //add current scores to global score
  scores[activePlayer] += roundScore;

  //update the UI
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

  //did player won the game
  if (scores[activePlayer] >= 100) {
    document.getElementById('name-' + activePlayer).textContent = 'WINNER';
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

  } else {
    //Next player
    nextPlayer();
  }
  lastDice = 0;
});

//changes the player, set rountScor to 0,
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.add('active');

  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//let x = document.querySelector('#score-0').textContent;
