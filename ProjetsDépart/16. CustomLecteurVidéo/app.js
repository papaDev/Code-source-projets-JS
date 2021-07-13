const video = document.querySelector('.video');
const btnPausePlay = document.getElementById('play-pause');
const img = document.querySelector('#play-pause img');
const barreOrange = document.querySelector('.barre-orange');
const juice = document.querySelector('.juice');
const muteBtn = document.getElementById('mute');
const fullScreen = document.getElementById('fullscreen');
const volumeSlider = document.getElementById('volume-slider');

btnPausePlay.addEventListener('click', tooglePlayPause);
video.addEventListener('click', tooglePlayPause);

function tooglePlayPause() {

    console.log("========== Function tooglePlayPause ===========");

    if(video.paused) {
        img.src = "ressources/pause.svg";
        video.play();
    }
    else {
        img.src = "ressources/play.svg";
        video.pause();
    }
}

// la barrre orange

video.addEventListener('timeupdate', () => {

    console.log("========== La barre orange  ===========");

    let juicePos = video.currentTime / video.duration;

    juice.style.width = juicePos * 100 + "%";

    if(video.ended) {
        img.src = "ressources/play.svg";
  
    }
})

// Volume

volumeSlider.addEventListener('change', () => {

    console.log("========== Volume ===========");

    video.volume = volumeSlider.value / 100;
    console.log(video.volume);

})

// Mute

muteBtn.addEventListener('click', () => {

    console.log("========== Mute ===========");

    if(video.muted) {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    else {
        video.muted = true;
        muteBtn.innerText = "Unmute";
    }

})

// clic sur la barre

let rect = barreOrange.getBoundingClientRect();
let largeur = rect.width;

barreOrange.addEventListener('click', (e) => {

    console.log("========== clic sur la barre ===========");

    let x = e.clientX - rect.left;

    let widthPercent = ((x*100/largeur));
    console.log(widthPercent);

    let durationVideo = video.duration;

    // position en seconde par rapport au pourcentage
    video.currentTime = durationVideo * (widthPercent / 100);

})

window.addEventListener('resize', () => {
    console.log("========== window resize ===========");
    let rect = barreOrange.getBoundingClientRect();
    let largeur = rect.width;
})

video.addEventListener('dblclick', () => {
    console.log("========== video doubleClick ===========");
    video.requestFullscreen();
})

fullScreen.addEventListener('click', () => {
    console.log("========== fullScreen click ===========");
    video.requestFullscreen();
})