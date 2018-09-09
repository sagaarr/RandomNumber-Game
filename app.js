/*

Rule's of the games 
- player must guess a number between min and the max
- player gets a certain amount of guesses 
- notify player of gusses remaining 
- notify the player of the correct answer if loose
- let player choose to play again
*/

// game value 
let min = 1,
    max = 10,
    winningNumber = getRandomNum(),
    guessLeft = 3;

const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again EventListener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);
  
  // validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`);
    guessInput.value = '';
  }else{
    // Lost the game 
    guessLeft -= 1;
    guessInput.value = '';
    guessInput.style.borderColor = 'red'; 
    setMessage(`Incorrect number you have ${guessLeft} guess left`, 'red');
    if(guessLeft === 0) {
      gameOver(false , `You Lost, Try again`);
    }
  }
  // Check if Won 
  if(guess === winningNumber){
    gameOver(true , ` ${winningNumber} is correct, YOU WIN! `);
  }
});

function gameOver(won , msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
   // Disable border color
   guessInput.disabled = true;
   // change border color 
   guessInput.style.borderColor = color;
   message.style.color = color;
   // Set message
   setMessage(msg);
  //  Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

function getRandomNum(){
  return Math.floor(Math.random()*(max-min+1)+min);
}
// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
