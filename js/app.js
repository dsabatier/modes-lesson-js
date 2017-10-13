// 65 87 83 69 68 70 84 71 89 72 85 74 75 38        40
// A  W  S  E  D  F  T  G  Y  H  U  J  K  Up Arrow  Down Arrow
// C3 C# D  Eb E  F  F# G  Ab A  Bb B  C4


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
  "B4",
  "C5",
  "C5-sharp",
  "D5",
  "E5-flat",  //15
  "E5",
  "F5",
  "F5-sharp",
  "G5",
  "A5-flat",  //20
  "A5",
  "B5-flat",
  "B5"
];

const keySignatureOptions = notes.slice(0, 12)

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

const modeKeyMapping = {
  "ionian": 49,
  "dorian": 50,
  "phrygian": 51,
  "lydian": 52,
  "mixolydian": 53,
  "aeolian": 54,
  "locrian": 55
};

// gets the point we need to start at given a key signature and mode
const startPoint = (note, mode) => {
  const noteIndex = notes.indexOf(note);
  return steps.slice(0, modeSteps[mode]).reduce((accum, x) => accum + x, noteIndex);
}

const createMode = (keySignature, mode) => {
  const scaleDegree = startPoint(keySignature, mode)
  let adjustedSteps = steps.rotate(modeSteps[mode])
  adjustedSteps.push(1)
  return newNotes = adjustedSteps.map((step, index) => notes[adjustedSteps.slice(0, index).reduce((accum, x) => accum + x, scaleDegree)])
}

const PIANO_PATH = "./sounds/wav/";
const keyboardText = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const keyCodes = ['65', '83', '68', '70', '71', '72', '74', '75'];

let currentMode = "ionian";
let currentKey = "C3"

document.addEventListener('DOMContentLoaded', () => {

  // create a new key element for the keyboard
  const newKey = (keyType, note, key, dk) => {
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

  // prepare strings to switch no  matter if its sharp or flat
  const noteStringObj = function(noteName){
    if(noteName.indexOf("-sharp") > -1){
      return {
        "name": noteName.substring(0,1) +"#"+noteName.substring(1,2),
        "sharp":noteName.substring(0,1) +"#"+noteName.substring(1,2),
        "flat":notes[(notes.indexOf(noteName)+1)%notes.length].substring(0,1) +"b"+ notes[(notes.indexOf(noteName)+1)%notes.length].substring(1,2)
      }
    } else if(noteName.indexOf("-flat") > -1){
      return {
        "name":noteName.substring(0, 1) +"b"+ noteName.substring(1,2),
        "sharp":notes[(notes.indexOf(noteName)-1)%notes.length].substring(0,1) +"#"+ notes[(notes.indexOf(noteName)-1)%notes.length].substring(1,2),
        "flat":noteName.substring(0, 1) +"b"+ noteName.substring(1,2),
      }
    } else {
      // need to figure out if this note should be a sharp or flat still, i.e. E# instead of Fas
      return {
        "name":noteName.substring(0, 2)
      }
    }
  }

  const sharpOrFlatDefault = {
    "A":"sharp",
    "B":"sharp",
    "C":"sharp",
    "D":"sharp",
    "E":"sharp",
    "F":"flat"
  }

  // create a new keyboard from an array of notes
  const loadKeyboard = modeList => {

    const keyboard = document.getElementById("keyboard");
    const keysNode = document.getElementById("normalKeys");
    keysNode.innerHTML = "";

    // for each note in the array we pass in create a key
    for(let i = 0; i < modeList.length; i++){
      // create a new note object that includes everything we need to build a new key
      const note = noteString => {
        const dataKey = keyCodes[i];
        const kbdText = keyboardText[i];

        let noteText = noteStringObj(noteString).name
        let styleClass = "normal";

        if(noteString.indexOf('-flat') !== -1 || noteString.indexOf('-sharp') !== -1){
          styleClass = "sharp";

          if(currentKey.indexOf('-flat') !== -1){
            noteText = noteStringObj(noteString)['flat']
          } else if(currentKey.indexOf('-sharp') !== -1){
            noteText = noteStringObj(noteString)['sharp']
          } else {
            noteText = noteStringObj(noteString)['sharp']
          }
        }

        return {
          'dataKey': dataKey,
          'keyboardText': kbdText,
          'noteText': noteText,
          'styleClass' : styleClass,
        }
      }

      // create audio data element from a note.  leaving this inline for easier access to the array of notes passed in
      const audioData = noteSrc => {
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

  const changeMode = modeName => {
    loadKeyboard(createMode(currentKey, modeName));
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

  const changeKey = newKey => {
    currentKey = newKey;
    changeMode(currentMode);
  }

  const arrowKeyDownPress = () => {
    let newIndex = notes.indexOf(currentKey)-1;
    if(newIndex < 0) newIndex = 11
    currentKey = notes[Math.abs(newIndex) % 12];
    changeKey(currentKey)
  }

  const arrowKeyUpPress = () => {
    const newIndex = notes.indexOf(currentKey)+1;
    currentKey = notes[Math.abs(newIndex) % 12];
    changeKey(currentKey)
  }

  changeMode(currentMode);

  let keysPressed = new Array();

  window.oncontextmenu = (event) => {
       event.preventDefault();
       event.stopPropagation();
       return false;
  };

  const upArrowButton = document.getElementById('up-arrow')
  const downArrowButton = document.getElementById('down-arrow')

  upArrowButton.addEventListener('click', () => {
    arrowKeyUpPress();
  })

  downArrowButton.addEventListener('click', () => {
    arrowKeyDownPress();
  })

  window.addEventListener('keydown', (event) => _keyDown(event.keyCode));
  window.addEventListener('keyup', (event) => _keyUp(event.keyCode));

  const _keyDown = keyCode => {

    // explicit keyboard mapping checks
    if(Object.values(modeKeyMapping).indexOf(keyCode) > -1){ // check if key is mapped to a mode
      changeMode(getKeyByValue(modeKeyMapping, keyCode));
    } else if(keyCode === 38){
      upArrowButton.classList.add('arrowPressed');
      arrowKeyUpPress();
      return;
    } else if (keyCode == 40){
      downArrowButton.classList.add('arrowPressed');
      arrowKeyDownPress();
      return;
    } else {
      const audio = document.querySelector(`audio[data-key='${keyCode}']`);
      const key = document.querySelector(`.key[data-key='${keyCode}']`);

      if(audio && !keysPressed.contains(keyCode)) {
        keysPressed.push(keyCode);
        audio.currentTime = 0;
        audio.play();
        key.classList.add('playing');
      }
    }
  }

const _keyUp = keyCode => {
    if(keyCode === 38){
      upArrowButton.classList.remove('arrowPressed');
      return;
    } else if (keyCode == 40){
      downArrowButton.classList.remove('arrowPressed');
      return;
    }

    const audio = document.querySelector(`audio[data-key='${keyCode}']`);
    const key = document.querySelector(`.key[data-key='${keyCode}']`);

    if(audio) {
      keysPressed.remove(keyCode);
      key.classList.remove('playing');
    }
  }

}, false);
