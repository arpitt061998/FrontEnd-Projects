const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
    },
]
var isPlaying = false;
//play
function playsong () {
    isPlaying = true;
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// pause
function pauseSong () {
    isPlaying = false;
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute('title', 'Play');
    music.pause();
}
// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playsong()));

//Update DOM 

function loadSong (song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

// On Load - select first song 
var songIndex = 0;

// next song 
function nextSong() {
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playsong();
}

// Prev song 
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playsong();
}

loadSong(songs[songIndex]);

// UpdateProgressBar
function updateProgressBar(e){
    if(isPlaying){
       const {duration , currentTime} = e.srcElement;  // OBJECT DESTRUCTING ====> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
       //Update ProgessBar Width
       const progressPercent = (currentTime/duration)*100;
       progress.style.width = `${progressPercent}%`;

       //Calculate display for duration
       const durationMinutes = Math.floor(duration/60);
       let durationSecond = Math.floor(duration%60);

       if(durationSecond < 10){
           durationSecond = `0${durationSecond}`;
       }
       // Delay switching duration Element to avoid Nan
       if(durationSecond){
        durationEl.textContent = `${durationMinutes}:${durationSecond}`;
       }
        //Calculate display for current
        const currentMinutes = Math.floor(currentTime/60);
        let currentSecond = Math.floor(currentTime%60);

        if(currentSecond < 10){
            currentSecond = `0${currentSecond}`;
        }
        // Delay switching duration Element to avoid Nan
        if(currentSecond){
            currentTimeEl.textContent = `${currentMinutes}:${currentSecond}`;
        }
    }
}

// Set Progress Bar

function setProgressBar (e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)* duration;
}

//Event Listeners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong);
music.addEventListener('timeupdate', updateProgressBar); // this function is fired when ever time changes
progressContainer.addEventListener('click',setProgressBar);
