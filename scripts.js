const cards = document.querySelectorAll('.memory-card');
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const timer = document.getElementById("timer")



let hasFlippedCard = false;
let lockBoard = false;
let gameStarted = false;
let firstCard, secondCard;
let timeout = null;
let n = 0;


function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
};

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  anime({
    targets: this,
    rotateY: 180,
    duration: anime.stagger(200),
  })

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    console.log(firstCard)
    return;
  }

  // second click
  secondCard = this;
  console.log(secondCard, "second")

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    anime({
      targets: [firstCard, secondCard],
      rotateY: 0,
      duration: anime.stagger(200),
    })

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function reset() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  gameStarted = false
  n=0;
  clearInterval(timeout)
  timer.innerHTML=n+"s"
  anime({
    targets: cards,
    rotateY: 0,
    duration: anime.stagger(200),
  })
  cards.forEach(card => card.removeEventListener('click', flipCard));
}

function start() {
  shuffle()
  if(!gameStarted){
    gameStarted = true
    cards.forEach(card => card.addEventListener('click', flipCard));
    n=60;
    timeout = setInterval(countDown, 1000)
  }
}

function countDown() {
  n--;
  if(n==0) {
    clearInterval(timeout)
    reset()
  }
  timer.innerHTML=n+"s"
}