const video = document.querySelector('.viewer');
const toggleBtn = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeControl = document.querySelector('.volume');
const playbackSpeedControl = document.querySelector('.playbackSpeed');
const skipButtons = document.querySelectorAll('[data-skip]');

// Play/Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
    toggleBtn.textContent = '❚ ❚';
  } else {
    video.pause();
    toggleBtn.textContent = '►';
  }
}

// Update progress bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

// Scrub progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Change volume
volumeControl.addEventListener('input', () => {
  video.volume = volumeControl.value;
});

// Change playback speed
playbackSpeedControl.addEventListener('input', () => {
  video.playbackRate = playbackSpeedControl.value;
});

// Skip buttons (rewind and forward)
skipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    video.currentTime += parseFloat(btn.dataset.skip);
  });
});

// Event listeners
toggleBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', updateProgress);

progress.addEventListener('click', scrub);

