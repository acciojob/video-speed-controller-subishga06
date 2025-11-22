// Select elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('.skip');

// Play / Pause function
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚❚'; // Pause icon
  } else {
    video.pause();
    toggle.textContent = '►'; // Play icon
  }
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// Update progress bar as video plays
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

// Volume control
volumeSlider.addEventListener('input', (e) => {
  video.volume = e.target.value;
});

// Playback speed control
speedSlider.addEventListener('input', (e) => {
  video.playbackRate = e.target.value;
});

// Skip buttons
skipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    video.currentTime += Number(btn.dataset.skip);
  });
});

// Clicking progress bar to seek
progress.addEventListener('click', (e) => {
  const clickPos = e.offsetX / progress.offsetWidth;
  video.currentTime = clickPos * video.duration;
});
