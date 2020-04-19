//sounds.js
//
//This document loads all the sound/music files used in the game using Howler.js

let sfxSelect = new Howl({
  src: ['assets/sounds/Select.wav']
});

let sfxSelect2 = new Howl({
  src: ['assets/sounds/Select2.wav']
});

let sfxCheck = new Howl({
  src: ['assets/sounds/Check.wav']
});

let sfxChimes = new Howl({
  src: ['assets/sounds/MorphText.wav']
});
let sfxTurn = new Howl({
  src: ['assets/sounds/PaperTurn.wav']
});
let sfxPopup1 = new Howl({
  src: ['assets/sounds/PopupAdvisor.wav']
});
let sfxPopup2 = new Howl({
  src: ['assets/sounds/PopupInfo.wav']
});
let sfxPopup3 = new Howl({
  src: ['assets/sounds/PopupConsole.wav']
});
let sfxTap1 = new Howl({
  src: ['assets/sounds/QualeLight.wav']
});
let sfxTap2 = new Howl({
  src: ['assets/sounds/QualeLight2.wav']
});
let sfxDrumRoll = new Howl({
  src: ['assets/sounds/military.wav']
});
let sfxHover = new Howl({
  src: ['assets/sounds/Grid.wav']
});
let sfxBell = new Howl({
  src: ['assets/sounds/Ring2.wav']
});
let sfxMine = new Howl({
  src: ['assets/sounds/Cool.wav']
});

let music1 = new Howl({
  src: ['assets/sounds/music1.wav'],
  volume: 0.5,
  onend: function() {
  music2.play();;
}
});
let music2 = new Howl({
  src: ['assets/sounds/music2.wav'],
  volume: 0.5,
  onend: function() {
  music1.play();
}
});
let sfxFarm = new Howl({
  src: ['assets/sounds/farm.wav']
});
let sfxHouse = new Howl({
  src: ['assets/sounds/house.wav']
});
let sfxHarbor = new Howl({
  src: ['assets/sounds/dock.wav']
});
let sfxFishery = new Howl({
  src: ['assets/sounds/fish_trap.wav']
});
let sfxLighthouse = new Howl({
  src: ['assets/sounds/ship_spawn.wav']
});
let sfxOilrig = new Howl({
  src: ['assets/sounds/barracks.wav']
});
let sfxCamp = new Howl({
  src: ['assets/sounds/archery_range.wav']
});
let sfxWorkshop = new Howl({
  src: ['assets/sounds/blacksmith.wav']
});
let sfxWell = new Howl({
  src: ['assets/sounds/research.wav']
});


//playMusic()
//
//This function basically loops the music for the game
function playMusic() {
  console.log("Started playing music")
  music1.play();

}
