const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.playback-speed');

// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}

// On Video End, show play icon

video.addEventListener('ended', showPlayIcon);
// Progress Bar ---------------------------------- //

// Calculate time display format

function displayTime(time) {
// time is the parameter above
const minutes = Math.floor(time / 60);
let seconds = Math.floor(time % 60);
seconds = seconds > 9 ? seconds : `0${seconds}`;
return `${minutes}:${seconds}`;
}
// Update progress bar as video plays

// 

function updateProgress() {
    progressBar.style.width = `${(video.currentTime /video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click progress bar to jump to different point in video, or "seek"

function setProgress(e) {
    // offsetX is a pixel width based value
    // offsetWidth is the total width. offsetX is your position inside offsetWidth.
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar

function changeVolume(e) {
    // e above is the event.
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume
    if (volume > 0.9) {
        volume = 1;
    }
    // Change Icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
        // one = to set the value, three === to check it.
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    // Tracks whatever volume changes and saves it 
    lastVolume = volume;
}

// Mute/Unmute function

function toggleMute() {
     volumeIcon.className = '';
    if (video.volume) {
        // Saves the last volume
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        // retrieves saved last volume on line 103
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        if (lastVolume > 0.5) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        } else if (lastVolume > 0) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        } else if (lastVolume == 0) {
            volumeIcon.classList.add('fas', 'fa-volume-off');
        }
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

let fullscreen = false;
// Event Listeners

// Toggle Fullscreen

function toggleFullScreen() {
   if(!fullscreen) {
    openFullscreen(player);
   } else {
    closeFullscreen();
   }
   fullscreen = !fullscreen;
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click',setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullScreen);