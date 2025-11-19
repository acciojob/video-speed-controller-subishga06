const video = document.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const volume = document.querySelector('.volume');
const playbackSpeed = document.querySelector('.playbackSpeed');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const skipButtons = document.querySelectorAll('[data-skip]');

// PLAY / PAUSE TOGGLE
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

// UPDATE PLAY BUTTON ICON
function updateButton() {
    const icon = video.paused ? '►' : '❚❚';
    toggle.textContent = icon;
}

// HANDLE VOLUME CHANGE
function handleVolume() {
    video.volume = this.value;
}

// HANDLE PLAYBACK SPEED
function handleSpeed() {
    video.playbackRate = this.value;
}

// SKIP FORWARD / BACKWARD
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// UPDATE PROGRESS BAR
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
}

// SCRUB WHEN CLICKING ON PROGRESS BAR
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// EVENT LISTENERS
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

volume.addEventListener('input', handleVolume);
playbackSpeed.addEventListener('input', handleSpeed);

skipButtons.forEach(button => button.addEventListener('click', skip));

progress.addEventListener('click', scrub);
