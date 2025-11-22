// SELECT ELEMENTS
const video = document.querySelector('.player_video');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('.skip');


// PLAY / PAUSE TOGGLE
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);


// UPDATE PROGRESS BAR
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);


// VOLUME CONTROL
volumeSlider.addEventListener('input', (e) => {
  video.volume = e.target.value;
});

// SPEED CONTROL
speedSlider.addEventListener('input', (e) => {
  video.playbackRate = e.target.value;
});


// SKIP BUTTONS (REWIND & FORWARD)
skipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    video.currentTime += Number(btn.dataset.skip);
  });
});


// CLICK PROGRESS BAR TO SEEK
progress.addEventListener('click', (e) => {
  const position = e.offsetX / progress.offsetWidth;
  video.currentTime = position * video.duration;
});
