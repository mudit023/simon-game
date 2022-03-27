console.log("JS loaded");

const buttonArray = ['green','red', 'yellow', 'blue'];
let gamePattern = [];
let userInput = [];
let level = 0;
let started = false;

document.addEventListener('keydown', function () {
  if(!started){
    document.querySelector('#level-title').textContent = 'Level ' + level;
    nextSequence();
    started = true;
  }
})

const inputs = document.querySelectorAll('.btn');
inputs.forEach(input => input.addEventListener('click', function (){
  const btnId = this.id;
  userInput.push(btnId);
  console.log(userInput);
  addAnimationUser(btnId);
  addSound(btnId);
  checkAnswer(userInput.length-1);
}))

function checkAnswer(currentLevel){
  
  if (userInput[currentLevel]==gamePattern[currentLevel]) {
    if (userInput.length==gamePattern.length) {
      setTimeout(nextSequence, 1000); 
    }
  } else{
    const audio = new Audio('./sounds/wrong.mp3'); 
    audio.play();
    document.querySelector('body').classList.add('game-over');
    document.querySelector('#level-title').textContent = 'Game over! Press A Key To Restart';
    setInterval(function (){
      document.querySelector('body').classList.remove('game-over');
    }, 250);
    startOver();
  }
}

function nextSequence(){
  userInput = [];
  level++;
  document.querySelector('#level-title').textContent = 'Level ' + level;
  const randomNum = Math.floor(Math.random()*4);
  let randomColor = buttonArray[randomNum];
  gamePattern.push(randomColor);
  console.log("random color:" + gamePattern);
  addAnimation(randomColor);
  addSound(randomColor);
}

function addAnimationUser(btnId){
  document.querySelector('#'+btnId).classList.add('pressed-user');
  setTimeout(function (){document.querySelector('#'+btnId).classList.remove('pressed-user')}, 200);
}
function addAnimation(btnId){
  document.querySelector('#'+btnId).classList.add('pressed');
  setTimeout(function (){document.querySelector('#'+btnId).classList.remove('pressed')}, 100);
}

function addSound(btnId){
  const soundName = './sounds/' + btnId + '.mp3';
  const audio = new Audio(soundName);
  audio.play();
}

function startOver(){
  userInput = [];
  gamePattern = [];
  level = 0
  started = false;
}