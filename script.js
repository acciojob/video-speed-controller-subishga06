const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const volumeControl = document.querySelector('input[name="volume"]');
const speedControl = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');


// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

// Sync play/pause button when using keyboard or clicking video
video.addEventListener('play', () => toggle.textContent = '❚ ❚');
video.addEventListener('pause', () => toggle.textContent = '►');

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);


// Volume
volumeControl.addEventListener('input', () => {
  video.volume = volumeControl.value;
});


// Playback Speed
speedControl.addEventListener('input', () => {
  video.playbackRate = speedControl.value;
});


// Skip buttons
skipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    video.currentTime += parseFloat(btn.dataset.skip);
  });
});


// Progress bar update
video.addEventListener('timeupdate', () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
});


// Scrub progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
