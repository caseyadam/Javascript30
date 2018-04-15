/* Get Our Elements */
//gets the player
const player = document.querySelector('.player');
//gets the video
const video = player.querySelector('.viewer');
//gets where the progress bar is at
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
//hold the data-skip attribute
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
//when called, calls .play or .pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  //because the method name is in a string you can just call it video then access the method name
  video[method]();
}
// Alternative version
// if(video.paused) {
//   video.play();
//   } else {
//   video.pause();
//   }
// }

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

//triggered by event listener
function skip() {
  //wrap the string in a 'parseFloat' and it will convert it to a true number
 video.currentTime += parseFloat(this.dataset.skip);
}

//responds to speed sliders
function handleRangeUpdate() {
  video[this.name] = this.value;
}

//progress bar updates in real time
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  //progressBar is defined above
  progressBar.style.flexBasis = `${percent}%`;
}

//listens for click on video bar
//defined by total pixel width of progress bar. When users clicks at halfway point and lets say the video pixel width is 600px, the progress bar would update to 50%.
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
//the events are in green and are native to javascript
video.addEventListener('click', togglePlay);
//when video is played, updateButton function runs
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
//triggered when video is updating its time code
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
//listens for click, then runs skip function
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
//first checks if mousedown is true and moves on to scrub. if not it moves on and skips scrub
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
