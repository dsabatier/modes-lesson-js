// 65 87 83 69 68 70 84 71 89 72 85 74 75
// A  W  S  E  D  F  T  G  Y  H  U  J  K
// C3 C# D  Eb E  F  F# G  Ab A  Bb B  C4

let lastKeyCode = 0;

window.addEventListener('keydown', function(event) {
  const audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
  const key = document.querySelector(`.key[data-key='${event.keyCode}']`);

  if(audio && this.lastKey != event.keyCode) {
    this.lastKey = event.keyCode;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  }
});

window.addEventListener('keyup', function(event) {
  const audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
  const key = document.querySelector(`.key[data-key='${event.keyCode}']`);

  if(audio) {
    this.lastKey = 0;
    //audio.pause();
    //audio.currentTime = 0;
    key.classList.remove('playing');
  }
});
