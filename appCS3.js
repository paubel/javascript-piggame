
let scores, roundScore, activePlayer;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
  //1. rand number
  document.querySelector('.info').textContent = '';
  let dice = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1;
  //let dice = 6;
  //2 display result
  let diceDOM = document.querySelector('.dice');
  let diceDOM2 = document.querySelector('.dice2');
  diceDOM.style.display = 'block';
  diceDOM2.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  diceDOM2.src = 'dice-' + dice2 + '.png';

  //3. update the round score IF number != 1

  if (dice === 6 && dice2 === 6) {
    //Player looses score
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = '0';
    //lastDice = 0;
    document.querySelector('.info').textContent = 'Rolled two sixes. Lost all points';
    nextPlayer();
  } else if (dice !== 1 && dice2 !== 1) {
    //Add score
    roundScore += (dice + dice2);
    console.log(dice, dice2);
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //lastDice = dice;


  } else {
    //Next player
    //lastDice = 0;
    document.querySelector('.info').textContent = 'Rolled a one. Lost all points';
    nextPlayer();
  }


});

document.querySelector('.btn-hold').addEventListener('click', function() {
  document.querySelector('.info').textContent = '';
  //add current scores to global score
  scores[activePlayer] += roundScore;
  console.log("scores[activePlayer], roundScore:" + scores[activePlayer], roundScore);
  //update the UI
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

  let input = document.querySelector('.final-score').value;
  let winningScore;

  if (input) {
    winningScore = input;
  } else {
    winningScore = 100;
  }

  //did player won the game
  if (scores[activePlayer] >= winningScore) {
    document.getElementById('name-' + activePlayer).textContent = 'WINNER';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
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
  //document.querySelector('.dice2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector('.info').textContent = '';

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

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
