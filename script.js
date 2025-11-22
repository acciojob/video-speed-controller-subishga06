// 1. Get Elements
const player = document.querySelector('.player__video');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

// 2. Build Functions

/**
 * Toggles the play/pause state of the video.
 * Updates the button text (► or ❚ ❚).
 */
function togglePlay() {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

/**
 * Updates the text content of the play/pause button.
 */
function updateButton() {
  const icon = player.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

/**
 * Handles volume and playbackSpeed changes from the range sliders.
 * @param {Event} e - The change event from the slider.
 */
function handleRangeUpdate() {
  // 'this' refers to the input element that triggered the event
  player[this.name] = this.value;
}

/**
 * Skips the video forward or backward based on the data-skip attribute.
 */
function skip() {
  // Parse the data-skip attribute value (which is a string) to a number
  const skipTime = parseFloat(this.dataset.skip);
  player.currentTime += skipTime;
}

/**
 * Updates the progress bar width based on the video's current time.
 */
function handleProgress() {
  const percent = (player.currentTime / player.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/**
 * Seeks the video to a new position when the progress bar is clicked/dragged.
 * @param {Event} e - The mouse event.
 */
function scrub(e) {
  // Calculate the time based on the click position relative to the progress bar width
  const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

// 3. Hook up the Event Listeners

// Play/Pause on video click or button click
player.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

// Update button icon when play/pause state changes
player.addEventListener('play', updateButton);
player.addEventListener('pause', updateButton);

// Update progress bar as video plays
player.addEventListener('timeupdate', handleProgress);

// Handle skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Handle volume and speed sliders
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); // Optional: Live update on drag

// Progress bar seeking (scrubbing)
let mousedown = false; // Flag to track dragging
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// Initialization: Set the initial button state
updateButton();