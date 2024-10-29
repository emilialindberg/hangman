const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');

const img = new Image(); // Skapa nytt bildobjekt
img.src = "hangman.svg"; // Ladda bilden från en URL

// Väntar tills bilden är laddad innan utskrift
img.onload = function() {
  ctx.drawImage(img, 5, 50, 250, 90); // placering x,y och bredd,höjd.
};








/*Kelly testar lägga till*/


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

// Allt ska vara dolt i början
document.addEventListener("DOMContentLoaded", function() {
  const svgElements = ["ground", "scaffold", "legs", "arms", "body", "head"]
  svgElements.forEach(id => {
      document.getElementById(id).style.visibility = 'hidden'
  })

  // Visar en del när man trycker på en button
  document.getElementById("show-ground-btn").addEventListener("click", showOnlyGround)
  document.getElementById("show-scaffold-btn").addEventListener("click", showOnlyScaffold)
  document.getElementById("show-head-btn").addEventListener("click", showOnlyHead)
  document.getElementById("show-body-btn").addEventListener("click", showOnlyBody)
  document.getElementById("show-arms-btn").addEventListener("click", showOnlyArms)
  document.getElementById("show-legs-btn").addEventListener("click", showOnlyLegs)

  const inputField = document.getElementById('key-input')
  inputField.addEventListener('keydown', displayKeyPressed)
})


function keyIsA(pressedKey) {
  if (pressedKey === 'A' || pressedKey === 'a')  {
    showOnlyGround()
  }
}
