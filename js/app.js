// 65 87 83 69 68 70 84 71 89 72 85 74 75
// A  W  S  E  D  F  T  G  Y  H  U  J  K
// C3 C# D  Eb E  F  F# G  Ab A  Bb B  C4

const modes = {
  "ionian": ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
  "dorian":  ["C3", "D3", "E3-flat", "F3", "G3", "A3", "B3-flat", "C4"],
  "phrygian": ["C3", "C3-sharp", "E3-flat", "F3", "G3", "A3-flat", "B3", "C4"],
  "lydian": ["C3", "D3", "E3", "F3-sharp", "G3", "A3", "B3", "C4"],
  "mixolydian": ["C3", "D3", "E3", "F3", "G3", "A3", "B3-flat", "C4"],
  "aeolian": ["C3", "D3", "E3-flat", "F3", "G3", "A3-flat", "B3-flat", "C4"],
  "locrian": ["C3", "C3-sharp", "E3-flat", "F3", "F3-sharp", "A3-flat", "B3-flat", "C4"],
};

const PIANO_PATH = "./sounds/wav/"
const keyboardText = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keyCodes = ['65', '83', '68', '70', '71', '72', '74', '75'];
let currentMode = "ionian";

document.addEventListener('DOMContentLoaded', function() {

  const loadKeyboard = function(modeList){
    const keyboard = document.getElementById("keyboard");
    const bodyNode = document.getElementById("");
    const keysNode = document.getElementById("normalKeys");
    keysNode.innerHTML = "";
    const newKey = function(keyType, note, key, dk){
      const newKey = document.createElement("div");
      const kbd = document.createElement("kbd");
      const span = document.createElement("span");
      const keyboardKeyText = document.createTextNode(key); // string to indicate key on pc
      const noteText = document.createTextNode(note); // string to indicate the note itself

      kbd.appendChild(noteText);
      newKey.appendChild(kbd);
      newKey.classList.add('key');
      newKey.classList.add(keyType);
      newKey.setAttribute("data-key", dk); // they pc key for this note
      span.classList.add('sound');
      span.appendChild(keyboardKeyText);
      newKey.appendChild(span);
      return newKey;
    }

    for(let i = 0; i < modeList.length; i++){

      const note = function(noteString){

        const dataKey = keyCodes[i];

        let noteText = noteString;
        let styleClass = "normal";
        const kbdText = keyboardText[i];

        if(noteString.indexOf('-flat') !== -1){
          noteText = noteText.substring(0, 1) + "b" + noteText.substring(1,2);
          styleClass = "sharp";
        } else if(noteString.indexOf('-sharp') !== -1){
          noteText = noteText.substring(0, 1) + "#" + + noteText.substring(1,2);
          styleClass = "sharp";
        }

        return {
          'dataKey': dataKey,
          'keyboardText': kbdText,
          'noteText': noteText,
          'styleClass' : styleClass
        }

      }

      const audioData = function(noteSrc) {
        let audioElement = document.createElement("audio");
        audioElement.setAttribute("src", PIANO_PATH + modeList[i] +".wav");
        audioElement.setAttribute("data-key", noteSrc.dataKey);
        audioElement.setAttribute("auto", "auto");
        return audioElement;
      }

      keysNode.appendChild(newKey(note(modeList[i]).styleClass, note(modeList[i]).noteText, note(modeList[i]).keyboardText, note(modeList[i]).dataKey));
      keysNode.appendChild(audioData(note(modeList[i])));
    }
  }

  const changeMode = function(modeName) {
    loadKeyboard(modes[modeName]);
    document.getElementById(modeName);
    const oldButton = document.getElementById(currentMode);
    oldButton.classList.remove("currentMode");
    const button = document.getElementById(modeName);
    button.classList.add("currentMode");
    currentMode = modeName;
  }

  for(let i = 0; i < Object.keys(modes).length; i++){
    const button = document.getElementById(Object.keys(modes)[i]);
    button.addEventListener('click', () => changeMode(Object.keys(modes)[i]))
  }

  changeMode(currentMode);

}, false);



let keysPressed = new Array();

window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

window.addEventListener('keydown', (event) => _keyDown(event.keyCode));
window.addEventListener('keyup', (event) => _keyUp(event.keyCode));



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
