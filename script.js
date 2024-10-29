
/*Kelly testar lägga till*/

const hangmanWords = [
  "Apple", "Chair", "Eagle", "House", "Lemon", "Quiet", "River", "Tiger", "Angel", "Earth", "Happy", "Jelly", "Kite", "Olive",
  "Panda", "Robot", "Under", "Yawn"
];


// Väljer ett slumpmässigt ord
function decideRandomWord(myArray) {
  const randomIndex = Math.floor(Math.random() * myArray.length)
  return myArray[randomIndex]
}
const randomWord = decideRandomWord(hangmanWords)
console.log(randomWord) // skriv ut det hemliga ordet så det blir lättare att utveckla/testa

// Visar dolda delar
function toggleVisibility(id) {
  const element = document.getElementById(id)

  if (element.style.visibility === 'hidden') {
      element.style.visibility = 'visible'
  }
}

// Olika delar ska visas för sig
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


function findLetterInWord(letter, word) {
  word = word.toUpperCase() //konverterar till stora bokstäver för att kunna jämföra
  letter = letter.toUpperCase() //konverterar till stora bokstäver för att kunna jämföra

  // for-loopar igenom ordet. if-kollar om bokstav stämmer med ord.
  for (let pos = 0; pos < word.length; pos++) {
    if (letter === word[pos]) {
      document.getElementById("letter-"+pos).textContent = letter // fyll i bokstaven på rätt plats genom att använda loopens position
    }
  }
 
}

function verifyInput() {
  let letter = document.getElementById("verify-input").value
  findLetterInWord(letter, randomWord)
  document.getElementById("verify-input").value = ""; // töm input fältet / nollställ
}


// Allt ska vara dolt i början
document.addEventListener("DOMContentLoaded", function() {
  const svgElements = ["ground", "scaffold", "legs", "arms", "body", "head"]
  svgElements.forEach(id => {
      document.getElementById(id).style.visibility = 'hidden'
  })

  // Visar en del när man trycker på en button -> gör om till visa en del när man gissat fel!
  document.getElementById("show-ground-btn").addEventListener("click", showOnlyGround)
  document.getElementById("show-scaffold-btn").addEventListener("click", showOnlyScaffold)
  document.getElementById("show-head-btn").addEventListener("click", showOnlyHead)
  document.getElementById("show-body-btn").addEventListener("click", showOnlyBody)
  document.getElementById("show-arms-btn").addEventListener("click", showOnlyArms)
  document.getElementById("show-legs-btn").addEventListener("click", showOnlyLegs)
  document.getElementById("verify-btn").addEventListener("click", verifyInput) // kör när man klickar på knappen för att "spela"
})