// Get elements
const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('input[name="volume"]');
const speed = document.querySelector('input[name="playbackRate"]');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');

// Play/Pause toggle
function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

// Volume & Speed
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volume.addEventListener('input', handleRangeUpdate);
speed.addEventListener('input', handleRangeUpdate);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
