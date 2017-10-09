// 65 87 83 69 68 70 84 71 89 72 85 74 75
// A  W  S  E  D  F  T  G  Y  H  U  J  K
// C3 C# D  Eb E  F  F# G  Ab A  Bb B  C4

// const modes = {
//   "ionian": ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
//   "dorian":  ["C3", "D3", "E3-flat", "F3", "G3", "A3", "B3-flat", "C4"],
//   "phrygian": ["C3", "C3-sharp", "E3-flat", "F3", "G3", "A3-flat", "B3", "C4"],
//   "lydian": ["C3", "D3", "E3", "F3-sharp", "G3", "A3", "B3", "C4"],
//   "mixolydian": ["C3", "D3", "E3", "F3", "G3", "A3", "B3-flat", "C4"],
//   "aeolian": ["C3", "D3", "E3-flat", "F3", "G3", "A3-flat", "B3-flat", "C4"],
//   "locrian": ["C3", "C3-sharp", "E3-flat", "F3", "F3-sharp", "A3-flat", "B3-flat", "C4"],
// };

// extensions to mess up our arrays.  not sure how to import these in vanilla js
Array.prototype.contains = function(obj) {
  for(i = 0; i < this.length; i++) {
    if(this[i] == obj) return true;
  }
  return false;
}

Array.prototype.remove = function(obj) {
  const index = this.indexOf(obj);
  if(index > -1) this.splice(index, 1);
}

Array.prototype.rotate = function(steps) {
  return this.slice(steps, this.length).concat(this.slice(0, steps));
}


const notes = [
  "C3",       //0
  "C3-sharp",
  "D3",
  "E3-flat",
  "E3",
  "F3",       //5
  "F3-sharp",
  "G3",
  "A3-flat",
  "A3",
  "B3-flat",  //10
  "B3",
  "C4",
  "C4-sharp",
  "D4",
  "E4-flat",  //15
  "E4",
  "F4",
  "F4-sharp",
  "G4",
  "A4-flat",  //20
  "A4",
  "B4-flat",
  "B4"
];

// ionian mode steps (2 = W, 1 = H)
const steps = [2, 2, 1, 2, 2, 2, 1];

// mode steps, represents how many times to rotate steps array to get to this array
const modeSteps = {
  "ionian": 0,
  "dorian": 1,
  "phrygian": 2,
  "lydian": 3,
  "mixolydian": 4,
  "aeolian": 5,
  "locrian": 6
};

// gets the point we need to start at given a key signature and mode
const startPoint = function(note, mode){
  const noteIndex = notes.indexOf(note);
  return steps.slice(0, modeSteps[mode]).reduce(function(accum, x){
    return accum + x;
  }, noteIndex);
}

const createMode = function(keySignature, mode){
  const scaleDegree = startPoint(keySignature, mode)
  let adjustedSteps = steps.rotate(modeSteps[mode])
  adjustedSteps.push(1)
  return newNotes = adjustedSteps.map(function(step, index){
    const currentStepSum = adjustedSteps.slice(0, index).reduce(function(accum, x){
      return accum + x;
    }, scaleDegree)
    console.log(currentStepSum)
    return notes[currentStepSum]
  });

}



const PIANO_PATH = "./sounds/wav/";
const keyboardText = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keyCodes = ['65', '83', '68', '70', '71', '72', '74', '75'];

// set the starting mode
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
    loadKeyboard(createMode("C3", modeName));

    document.getElementById(modeName);
    const oldButton = document.getElementById(currentMode);
    oldButton.classList.remove("currentMode");
    const button = document.getElementById(modeName);
    button.classList.add("currentMode");
    currentMode = modeName;
  }

  for(let i = 0; i < Object.keys(modeSteps).length; i++){
    const button = document.getElementById(Object.keys(modeSteps)[i]);
    button.addEventListener('click', () => changeMode(Object.keys(modeSteps)[i]))
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
