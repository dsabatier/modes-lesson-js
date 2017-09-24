// 65 87 83 69 68 70 84 71 89 72 85 74 75
// A  W  S  E  D  F  T  G  Y  H  U  J  K
// C3 C# D  Eb E  F  F# G  Ab A  Bb B  C4

const modes = {
  "ionian": ["C", "D", "E", "F", "G", "A", "B"],
  "dorian": ["C", "D", "E-flat", "F", "G", "A", "B-flat"]
}

let keysPressed = new Array();

//console.log(modes);

window.addEventListener('keydown', () => _keyDown(event));

window.addEventListener('keyup', () => _keyUp(event));

function _keyDown(event) {
  const audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
  const key = document.querySelectorAll(`.key[data-key='${event.keyCode}']`, `.sharpKey[data-key='${event.keyCode}']`);
  console.log(key);
  if(audio && !keysPressed.contains(event.keyCode)) {
    keysPressed.push(event.keyCode);
    audio.currentTime = 0;
    audio.play();
    key[0].classList.add('playing');
  }
}

function _keyUp(event) {
  const audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
  const key = document.querySelectorAll(`.key[data-key='${event.keyCode}']`, `.sharpKey[data-key='${event.keyCode}']`);
  console.log(key);
  if(audio) {
    keysPressed.remove(event.keyCode);
    key[0].classList.remove('playing');
  }
}
