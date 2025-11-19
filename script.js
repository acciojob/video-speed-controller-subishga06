const video = document.querySelector('.player_video');
const toggle = document.querySelector('.toggle');
const rewindBtn = document.querySelector('.rewind');
const forwardBtn = document.querySelector('.forward');
const volume = document.querySelector('.volume');
const speed = document.querySelector('.playbackSpeed');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Play / Pause Toggle
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    toggle.textContent = video.paused ? '►' : '❚❚';
}

// Volume Control
function handleVolume() {
    video.volume = this.value;
}

// Speed Control
function handleSpeed() {
    video.playbackRate = this.value;
}

// Rewind / Forward
function skip(e) {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Progress Bar Update
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressFilled.style.width = `${percent}%`;
}

// Scrub through progress bar
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

rewindBtn.addEventListener('click', skip);
forwardBtn.addEventListener('click', skip);

volume.addEventListener('input', handleVolume);
speed.addEventListener('input', handleSpeed);

progress.addEventListener('click', scrub);
