// SELECTORS
const video = document.querySelector('.player_video');
const toggle = document.querySelector('.toggle');
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackSpeed"]');
const skipButtons = document.querySelectorAll('.skip');


// PLAY / PAUSE FUNCTION
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
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percent}%`;
}

video.addEventListener('timeupdate', updateProgress);


// SEEK BY CLICKING PROGRESS BAR
progress.addEventListener('click', (e) => {
  const clickRatio = e.offsetX / progress.offsetWidth;
  video.currentTime = clickRatio * video.duration;
});


// VOLUME CONTROL (0–1)
volumeSlider.addEventListener('input', (e) => {
  video.volume = Number(e.target.value);
});


// PLAYBACK SPEED CONTROL (0.5–2)
speedSlider.addEventListener('input', (e) => {
  video.playbackRate = Number(e.target.value);
});


// REWIND & FORWARD WITH SAFE LIMITS
skipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const skipValue = Number(btn.dataset.skip);
    let newTime = video.currentTime + skipValue;

    if (newTime < 0) newTime = 0;
    if (newTime > video.duration) newTime = video.duration;

    video.currentTime = newTime;
  });
});
