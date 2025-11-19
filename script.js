const video = document.querySelector('.player_video');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('.volume');
const speed = document.querySelector('.playbackSpeed');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const rewindBtn = document.querySelector('.rewind');
const forwardBtn = document.querySelector('.forward');

// Play / Pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
    toggle.textContent = '❚ ❚';
  } else {
    video.pause();
    toggle.textContent = '►';
  }
}

toggle.addEventListener('click', togglePlay);

// Update progress bar
video.addEventListener('timeupdate', () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
});

// Seek when clicking progress bar
progress.addEventListener('click', e => {
  const newTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = newTime;
});

// Volume control
volume.addEventListener('input', () => {
  video.volume = volume.value;
});

// Playback speed control
speed.addEventListener('input', () => {
  video.playbackRate = speed.value;
});

// Rewind 10 seconds
rewindBtn.addEventListener('click', () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

// Forward 25 seconds
forwardBtn.addEventListener('click', () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 25);
});
