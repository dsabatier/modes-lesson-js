// 65 87 83 69 68 70 84 71 89 72 85 74 75
// A  W  S  E  D  F  T  G  Y  H  U  J  K
// C3 C# D  Eb E  F  F# G  Ab A  Bb B  C4

const modes = {
  "ionian": ["C", "D", "E", "F", "G", "A", "B"],
  "dorian": ["C", "D", "E-flat", "F", "G", "A", "B-flat"]
}

let keysPressed = new Array();

//console.log(modes);

window.addEventListener('keydown', () => _keyDown(event.keyCode));

window.addEventListener('keyup', () => _keyUp(event.keyCode));

function _keyDown(keyCode) {
  const audio = document.querySelector(`audio[data-key='${keyCode}']`);
  const key = document.querySelector(`.key[data-key='${keyCode}']`);

  if(audio && !keysPressed.contains(keyCode)) {
    keysPressed.push(keyCode);
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  }
}

function _keyUp(keyCode) {
  const audio = document.querySelector(`audio[data-key='${keyCode}']`);
  const key = document.querySelector(`.key[data-key='${keyCode}']`);

  if(audio) {
    keysPressed.remove(keyCode);
    key.classList.remove('playing');
  }
}
