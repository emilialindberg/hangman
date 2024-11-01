// Skapa lista

const hangmanWords = [
  "Banana", "Cherry", "Orange", "Grapes", "Lemony", 
  "Papaya", "Tomato", "Jungle", "Donuts", "Radish", "Peanut", "Wizard", 
  "Rocket", "Candle", "Brunch", "Guitar", "Salmon", "Circle", "Travel", 
  "Puzzle", "Coffee", "Beauty", "Kitten", "School", "Market", "Spirit", 
  "Frozen", "Silver", "Anchor", "Breeze", "Magnet", "Wealth", "Valley", 
  "Plenty", "Summit", "Stream", "Savory", "Floral", "Tackle", "Unique", 
  "Winter", "Spirit", "Thrill", "Voyage", "Crayon", "Jigsaw", "Pillow", 
  "Falcon", "Knight", "Turtle", "Funnel", "Pirate", "Jacket", "Banter"
]
let wrongLetters = []
let counterNumber = 0

// Väljer ett slumpmässigt ord

function decideRandomWord(myArray) {
  const randomIndex = Math.floor(Math.random() * myArray.length)
  return myArray[randomIndex]
}

// Skriv ut det hemliga ordet så det blir lättare att utveckla/testa

const randomWord = decideRandomWord(hangmanWords) // Spara slumpässiga ordet i randomWord
console.log(randomWord) 

/********************** Main functions **************************/

// Hittar bokstaven i ett ord
    
    function findLetterInWord(letter, word) {
      word = word.toUpperCase() // Konverterar till stora bokstäver för att kunna jämföra
      letter = letter.toUpperCase() // -""-
      let found = false // för att hålla koll på om bokstaven finns i ordet eller ej - EJ från början
    
      // For-loopar igenom ordet. if-kollar om bokstav stämmer med ord.
    
      for (let pos = 0; pos < word.length; pos++) {
        if (letter === word[pos]) {
          document.getElementById("letter-"+pos).textContent = letter // fyll i bokstaven på rätt plats genom att använda loopens position
          found = true // markerar att bokstaven är hittad=true
        }
      }
    
      if (!found) { // Om bokstaven inte passar i ordet så triggas showNextBodyPart etc
        showNextBodyPart();
        wrongLetters.push(letter)
        updateWrongLettersDisplay()
        incorrectGuessCount()
      }
      else { // Annars kolla om hela ordet har blivit gissad
        checkWin()
      }
    }

// Funktion för att öka incorrect-guess-texten

function incorrectGuessCount() {
  counterNumber = counterNumber + 1 // Plussar på med ett
  document.getElementById("counter").innerText = counterNumber // Skriver över html-taggen counterNumber
}

// Tar bokstaven som spelaren har matat in och skickar den till findLetterInWord function. Efter det så nollställer den input fältet

function verifyInput() {
  let letter = document.getElementById("verify-input").value
  findLetterInWord(letter, randomWord) // Ropar på findLetterInWord function, ger den letter och vårat sparade randomWord
  document.getElementById("verify-input").value = ""; // nollställ input fältet
}

// Function som kollar om alla bokstäver i ordet har blivit gissade

function checkWin() {

  for (let i = 0; i < randomWord.length; i++) {
    const letterElement = document.getElementById('letter-' + i)

    if(!letterElement.textContent) { // Om det finns bokstäver kvar att gissa så är inte Win
      return // Gå ut från funktionen
    }
  }

  const youWonAlert = document.getElementById('you-won-text')
  youWonAlert.innerText =`You won, the correct word was ${randomWord}!`
  const youWonPopUp = document.getElementById('you-won-popup')
  youWonPopUp.style.visibility = 'visible'
}


/********************** Visibility **************************/
// Function som gör dolda delar synliga

function toggleVisibility(id) {
  const element = document.getElementById(id)

  if (element.style.visibility === 'hidden') {
      element.style.visibility = 'visible'
  }
}

// Gör en array av alla body parts - för vi ska kunna loopa igenom alla

const showBodyParts = [
  "ground",
  "scaffold",
  "head",
  "body",
  "arms",
  "legs"
]

// Visar tidigare dolda delar, och bestämmer när spelet är över

let currentBodyPart = 0

function showNextBodyPart() {
    if (currentBodyPart < showBodyParts.length) {
      toggleVisibility(showBodyParts[currentBodyPart])
      currentBodyPart++
    }
    
    // När alla delar har visats så syns Game Over rutan

    if (currentBodyPart === showBodyParts.length) {
      const youLostAlert = document.getElementById('you-lost-text')
      youLostAlert.innerText =`You lost, the correct word was ${randomWord}!`

      const youLostPopUp = document.getElementById('you-lost-popup')
      youLostPopUp.style.visibility = 'visible'
    }
}


// Allt ska vara dolt i början

const svgElements = ["ground", "scaffold", "legs", "arms", "body", "head"]
  svgElements.forEach(id => {
       document.getElementById(id).style.visibility = 'hidden'
})


// Lägger fel-valda bokstäver i html 

function updateWrongLettersDisplay() {
  const wrongLettersOutput = document.getElementById('wrong-letters-output')
  wrongLettersOutput.textContent = wrongLetters.join(' ')
}

/*************************** Buttons *****************************/

// Spela igen knappen

const PlayagainButton = document.getElementById("wonBtn")
PlayagainButton.addEventListener("click", function() {
console.log("Play again")
location.reload()
})

const PlayagainButton2 = document.getElementById("lostBtn")
PlayagainButton2.addEventListener("click", function() {
console.log("Play again")
location.reload()
})

//Newgame-knappen

const PlayNewGame = document.getElementById("new-game")
PlayNewGame.addEventListener("click", function() {
console.log("New game!")
location.reload()
})

document.getElementById("verify-btn").addEventListener("click", verifyInput) // kör när man klickar på knappen för att "spela"
