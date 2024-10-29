const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');

const img = new Image(); // Skapa nytt bildobjekt
img.src = "hangman.svg"; // Ladda bilden från en URL

// Väntar tills bilden är laddad innan utskrift
img.onload = function() {
  ctx.drawImage(img, 5, 50, 250, 90); // placering x,y och bredd,höjd.
};
