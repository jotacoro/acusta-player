//Set up audio elements
var soundOriginal = document.createElement("audio");
//Set audio A src here
soundOriginal.src = "./assets/a_original.mp3";
soundOriginal.preload = "auto";
soundOriginal.setAttribute("hidden", "true");
soundOriginal.setAttribute("onplaying", "stepA()");
document.body.append(soundOriginal);

var soundAcusta = document.createElement("audio");
//Set audio B src here
soundAcusta.src = "./assets/a_acusta.mp3";
soundAcusta.preload = "auto";
soundAcusta.setAttribute("hidden", "true");
soundAcusta.setAttribute("onplaying", "stepB()");
document.body.append(soundAcusta);

//Get button elements
var coll = document.getElementsByClassName("collapsible");
var i;
let playSongButtons = document.getElementsByClassName('playSong__button');


const player = document.getElementById("player__wrapper");
const aButton = document.getElementById("a__button");
const bButton = document.getElementById("b__button");
const playButton = document.getElementById("play__button");
const stopButton = document.getElementById("stop__button");
const progressBar = document.getElementById("progress__bar");
const progressFill = document.getElementById("progress__fill");

const playIcon = '<i class="fa-solid fa-play"></i>';
const pauseIcon = '<i class="fa-solid fa-pause"></i>';
const stopIcon = '<i class="fa-solid fa-stop"></i>';

//Check for mobile to enable audio playback without waiting for download status.
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  playButton.disabled = false;
}

//Default loading state for each sound
var soundAReady = false;
var soundBReady = false;

//When audio can play through (loaded), run the function to enable buttons
//The canplaythrough event will fire every time the audio switches, so the !soundOriginal/BReady
//prevents additional checks
soundOriginal.oncanplaythrough = function () {
  if (!soundAReady) {
    soundAReady = true;
    audioIsReady();
  }
};
soundAcusta.oncanplaythrough = function () {
  if (!soundBReady) {
    soundBReady = true;
    audioIsReady();
  }
};

// Check if both A & B are ready and enable the correct buttons
function audioIsReady() {
  if (soundAReady && soundBReady) {
    console.log("...audio loaded!");
    aButton.disabled = false;
    playButton.disabled = false;
  } else {
    console.log("Audio loading...");
  }
}

const progress = document.getElementById("progress");
// Listen for click on entire progress bar div (to allow skipping ahead)
progress.addEventListener("click", function (event) {
  // Get X coordinate of click in div
  var rect = this.getBoundingClientRect();
  // Convert click position to percentage value
  var percentage = (event.clientX - rect.left) / this.offsetWidth;
  // Seek to the percentage converted to seconds
  soundOriginal.currentTime = percentage * soundOriginal.duration;
  soundAcusta.currentTime = percentage * soundAcusta.duration;
});

//Frame animations for progress bar fill - converts to CSS percentage
function stepA() {
  progressFill.style.width =
    ((soundOriginal.currentTime / soundOriginal.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepA);
}
function stepB() {
  progressFill.style.width =
    ((soundAcusta.currentTime / soundAcusta.duration) * 100 || 0) + "%";
  requestAnimationFrame(stepB);
}

//Play/Stop correct audio and toggle A/B, Play/Pause, and Stop buttons
const playPause = () => {
  if (soundOriginal.paused & soundAcusta.paused) {
    let soundATime = soundOriginal.currentTime;
    let soundBTime = soundAcusta.currentTime;
    if (soundATime >= soundBTime) {
      player.classList.add('normal__version__style');
      soundOriginal.play();
      bButton.disabled = false;
      aButton.disabled = true;
      playButton.innerHTML = pauseIcon;
    } else {
      soundAcusta.play();
      bButton.disabled = true;
      aButton.disabled = false;
      playButton.innerHTML = pauseIcon;
    }
    stopButton.disabled = false;
  } else {
    playButton.innerHTML = playIcon;
    soundOriginal.pause();
    soundAcusta.pause();
  }
};

const playSoundA = () => {
  playButton.innerHTML = pauseIcon;
  aButton.disabled = true;
  bButton.disabled = false;
  stopButton.disabled = false;
  if (soundAcusta.currentTime > 0) {
    soundOriginal.currentTime = soundAcusta.currentTime;
    player.classList.add('normal__version__style');
    soundOriginal.play();
    soundAcusta.pause();
  } else {
    player.classList.add('normal__version__style');
    soundOriginal.play();
    soundAcusta.pause();
  }
};

const playSoundB = () => {
  playButton.innerHTML = pauseIcon;
  bButton.disabled = true;
  aButton.disabled = false;

  stopButton.disabled = false;
  if (soundOriginal.currentTime > 0) {
    soundAcusta.currentTime = soundOriginal.currentTime;
    player.classList.remove('normal__version__style');
    soundAcusta.play();
    soundOriginal.pause();
  } else {
    player.classList.remove('normal__version__style');
    soundAcusta.play();
  }
};

const stopSounds = () => {
  player.classList.remove('normal__version__style');
  playButton.innerHTML = playIcon;
  aButton.disabled = false;
  bButton.disabled = true;
  playButton.disabled = false;
  stopButton.disabled = true;
  soundOriginal.pause();
  soundOriginal.currentTime = 0;
  soundAcusta.pause();
  soundAcusta.currentTime = 0;
};

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}

for (i of playSongButtons) {
  i.addEventListener('click', function() {
    stopSounds();
    playSoundA();
  });
}