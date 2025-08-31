const flowers = ["🌸", "🌺", "🌻", "🌼", "🪻", "🌹", "🥀", "🌷"];
let cardPool = [...flowers, ...flowers]

let timerInterval = undefined
let totalSeconds = 0

function startGameTime() {
  let seconds = 0;
  let minutes = 0;
  totalSeconds = 0;
  const time = document.getElementById("time")
  
  timerInterval = setInterval(() => {
    totalSeconds++
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0
    }

    time.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, 1000)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]]; //Swap
  }

  return array
}

let shuffledCards = shuffle(cardPool)

function createGrid() {
  const gameContainer = document.getElementById("gameContainer")
  gameContainer.innerHTML = "" //Clear already existing content
  shuffledCards.forEach((emoji, idx) => {
    const card = document.createElement("div")
    card.classList.add("card")
    
    const cardBack = document.createElement("div")
    cardBack.classList.add("card-back")
    cardBack.innerText = emoji
    
    const cardFront = document.createElement("div")
    cardFront.classList.add("card-front")
    cardFront.innerText = "?"

    card.appendChild(cardFront)
    card.appendChild(cardBack)

    addCardFlipEvent(card)
    
    gameContainer.appendChild(card)
  })

  countMoves()
}

createGrid()
startGameTime()

function countMoves() {
  const cardsFront = document.querySelectorAll(".card-front")

  const moves = document.getElementById("moves")

  if (cardsFront.length > 0) {
    cardsFront.forEach((card) => {
      card.addEventListener('click', () => {
        let moveCount = parseInt(moves.innerText, 10)
        moveCount += 1
        moves.innerText = moveCount
      })
    })
  }
}

//Game logic
let firstCard = null
let secondCard = null
let lockFlip = false
let matches = 0
let flipTimeout = null

function resetVal() {
  firstCard = null
  secondCard = null
  lockFlip = false
}

function addCardFlipEvent(card) {
  card.addEventListener('click', () => {
  if (lockFlip) return; //Already 2 cards flipped
  if (card === firstCard) return;

  card.classList.add("flipped")

  if (!firstCard) {
    firstCard = card
    return;
  }

  secondCard = card
  lockFlip = true

  checkMatch()
  })
}

function checkMatch() {
  const firstVal = firstCard.querySelector(".card-back").textContent
  const secondVal = secondCard.querySelector(".card-back").textContent

  if (firstVal === secondVal) {
    matches++
    resetVal()

    if (matches === flowers.length) {
      setTimeout(() => {
        const finalScore = (parseInt(moves.innerText, 10)/ totalSeconds) * 1000
        alert(`🎉You won! \n Your score is: ${finalScore.toFixed(0)}`)
        clearInterval(timerInterval)
        restartGame()
      }, 100)
    }
  }
  else {
    flipTimeout = setTimeout(() => {
      firstCard.classList.remove("flipped")
      secondCard.classList.remove("flipped")

      resetVal()
    }, 500)
  }
}


function restartGame() {
  if (flipTimeout) {
    clearTimeout(flipTimeout)
    flipTimeout = null
  }
  
  shuffledCards = shuffle(cardPool)
  createGrid()
  clearInterval(timerInterval)
  startGameTime()
  resetVal()

  matches = 0
  moves.innerText = 0
}











































// Image data
// const images = [
//   {
//     url: 'https://plus.unsplash.com/premium_photo-1666863909125-3a01f038e71f?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Beautiful Mountain Landscape',
//   },
//   {
//     url: 'https://plus.unsplash.com/premium_photo-1690576837108-3c8343a1fc83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Ocean Sunset View',
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Autumn Forest Path',
//   },
//   {
//     url: 'https://plus.unsplash.com/premium_photo-1680466057202-4aa3c6329758?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     caption: 'Urban City Skyline',
//   },
// ];