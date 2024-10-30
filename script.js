const hangmanWords = [
  "Apple", "Chair", "Eagle", "House", "Lemon", "Quiet", "River", "Tiger", "Angel", "Earth", "Happy", "Jelly", "Kite", "Olive",
  "Panda", "Robot", "Under", "Yawn"
];
let wrongLetters = []

// Väljer ett slumpmässigt ord
function decideRandomWord(myArray) {
  const randomIndex = Math.floor(Math.random() * myArray.length)
  return myArray[randomIndex]
}
const randomWord = decideRandomWord(hangmanWords)
console.log(randomWord) // skriv ut det hemliga ordet så det blir lättare att utveckla/testa

// Hittar bokstaven i ett ord
function findLetterInWord(letter, word) {
  word = word.toUpperCase() //konverterar till stora bokstäver för att kunna jämföra
  letter = letter.toUpperCase() //konverterar till stora bokstäver för att kunna jämföra
  let found = false //om bokstaven är hittad

  // for-loopar igenom ordet. if-kollar om bokstav stämmer med ord.
  for (let pos = 0; pos < word.length; pos++) {
    if (letter === word[pos]) {
      document.getElementById("letter-"+pos).textContent = letter // fyll i bokstaven på rätt plats genom att använda loopens position
      found = true //markerar att bokstaven är hittad=true
    }
  }
  if (!found) { //Om bokstaven inte passar i ordet så triggas showNextBodyPart
    showNextBodyPart();
    wrongLetters.push(letter)
    updateWrongLettersDisplay()
  }
  else { // annars kolla om hela ordet har blivit gissad
    checkWin()
  }
}

// Tar bokstaven som spelaren har matat in och skickar den till findLetterInWord function. Efter det så nollställer den input fältet
function verifyInput() {
  let letter = document.getElementById("verify-input").value
  findLetterInWord(letter, randomWord)
  document.getElementById("verify-input").value = ""; // töm input fältet / nollställ
}

// Function som kollar om alla bokstäver i ordet har blivit gissade
function checkWin() {
  let allLettersGuessed = true

  for (let i = 0; i < randomWord.length; i++) {
    const letterElement = document.getElementById('letter-' + i)

    if(!letterElement.textContent) {
      allLettersGuessed = false
      break
    }
  }

  if(allLettersGuessed) {
    const youWonAlert = document.getElementById('you-won-text')
    youWonAlert.innerText =`You won, the correct word was ${randomWord}!`

    const youWonPopUp = document.getElementById('you-won-popup')
    youWonPopUp.style.visibility = 'visible'
  }
}



// Function som gör dolda delar synliga
function toggleVisibility(id) {
  const element = document.getElementById(id)

  if (element.style.visibility === 'hidden') {
      element.style.visibility = 'visible'
  }
}

// Olika delar ska visas en för en
function showOnlyGround() {
  toggleVisibility("ground")
}

function showOnlyScaffold() {
  toggleVisibility("scaffold")
}

function showOnlyLegs() {
  toggleVisibility("legs")
}

function showOnlyArms() {
  toggleVisibility("arms")
}

function showOnlyBody() {
  toggleVisibility("body")
}

function showOnlyHead() {
  toggleVisibility("head")
}

// Gör en array av alla body parts functioner
const showBodyParts = [
  showOnlyGround,
  showOnlyScaffold,
  showOnlyLegs,
  showOnlyArms,
  showOnlyBody,
  showOnlyHead,
]

// Visar tidigare dolda delar
let currentBodyPart = 0

function showNextBodyPart() {
    if (currentBodyPart < showBodyParts.length) {
      const showPart = showBodyParts[currentBodyPart]
      showPart()
      currentBodyPart++
    }
    // När alla delar har visats så syns Gave Over rutan
    if (currentBodyPart === showBodyParts.length) {
      const youLostAlert = document.getElementById('you-lost-text')
      youLostAlert.innerText =`You lost, the correct word was ${randomWord}!`

      const youLostPopUp = document.getElementById('you-lost-popup')
      youLostPopUp.style.visibility = 'visible'
    }
}


// Allt ska vara dolt i början
document.addEventListener("DOMContentLoaded", function() {
  const svgElements = ["ground", "scaffold", "legs", "arms", "body", "head"]
  svgElements.forEach(id => {
      document.getElementById(id).style.visibility = 'hidden'
  })

  document.getElementById("verify-btn").addEventListener("click", verifyInput) // kör när man klickar på knappen för att "spela"
})


// Lägger fel-valda bokstäver i html 
function updateWrongLettersDisplay() {
  const wrongLettersOutput = document.getElementById('wrong-letters-output')
  wrongLettersOutput.textContent = wrongLetters.join(' ')
}