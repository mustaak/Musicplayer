const plays = [
  {
    title: 'King',
    artist: 'AMRIT_MAAN',
    file:  '0.mp3',
    image: 'https://starsunfolded.com/wp-content/uploads/2017/01/Amrit-Maan.jpg'
  },
  {
    title: 'Apsraa',
    artist: 'Ali Abdur-Rahman al-Huthaify',
    file:   '1.mp3',
    image: 'https://maharashtratimes.com/thumb/92987320/jaani-92987320.jpg?imgsize=37096&width=1200&height=900&resizemode=75'
  },
  {
    title:  'Mix-song',
    artist: 'Abdullah Ali Jabir',
    file:   '2.mp3',
    image: 'https://static.toiimg.com/thumb/msid-95487792,width-1280,resizemode-4/95487792.jpg'
  }
];

const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const gif = document.getElementById('gif');
const songitem = document.getElementsByClassName("songitem");
const songinfo = document.getElementsByClassName("songinfo");
const songname = document.getElementById("spanname");
const min = document.getElementById("durationend");
const time = document.getElementById("duration");
const seek = document.getElementById("seek");
const dot = document.getElementById("dot");
// menu
const menuIcon = document.getElementById('menu');
const menu1Icon = document.getElementById('menu1');
const menuburger = document.getElementById('menuburger');
// volume
const up = document.getElementById('up');
const volum_bar = document.getElementById('volum_bar');
const volu = document.getElementById('volu');
const vol_progress = document.getElementById('vol_progress');
const vol_dot = document.getElementById('vol_dot');
const songList = document.querySelector('.song_list');

const audio = new Audio();
let currentAudioIndex = 0;
let isPlaying = false;
pauseButton.style.display = 'none'
function playAudio() {
  if (audio.currentTime > 0) {
      audio.play();
      images.classList.add("rotate");
    } else {
      const currentAudio = plays[currentAudioIndex];
      const AudioTitle = document.querySelector('.audio-info h2');
      const AudioArtist = document.querySelector('.audio-info h3');
      const progressBar = document.querySelector('.progress');
      const images = document.getElementById('images');
      audio.src = currentAudio.file;
      AudioTitle.textContent = currentAudio.title;
      AudioArtist.textContent = currentAudio.artist;
      images.src = currentAudio.image;

      progressBar.style.width = 0;
      images.classList.add("rotate")

      audio.play();
    }
    isPlaying = true;
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    gif.style.opacity = 1;
  }
function pauseAudio() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    gif.style.opacity = 0;
    images.classList.remove("rotate");
  }
}

function updateProgressBar() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  const progressBar = document.querySelector('.progress');
  const progressPercent = parseInt((currentTime / duration) * 100);
  seek.value = progressPercent;
  const seekbar = seek.value;
  progressBar.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`
  if (currentTime >= duration) {
    playAudio();
  } else if (currentTime >= duration) {
    pauseAudio();
  }
  const Min = Math.floor(duration/60);
  const sec = Math.floor(duration%60);
  if (duration) {
     time.innerHTML = `${Min}:${sec}`;
   }

  const Min1 = Math.floor(currentTime/60);
  const sec2 = Math.floor(currentTime%60);
  if (currentTime) {
    min.innerHTML = `${Min1}:${sec2}`;
  }
  

}

seek.addEventListener('change', () => {
  const seekValue = parseFloat(seek.value);
    audio.currentTime = seekValue*audio.duration/100;
});
Array.from(songitem).forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = plays[i].image;
    element.getElementsByClassName("songname")[0].innerHTML = plays[i].title;
  });

const makeall = ()=>{
  Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.classList.add("fa-play");
    element.classList.remove("fa-pause");
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    audio.pause();
  });
}
Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {
  element.addEventListener('click', (e) => {
    if (e.target.classList.contains("fa-play")) {
      makeall();
      currentAudioIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play");
      e.target.classList.add("fa-pause");
      audio.src = `${currentAudioIndex}.mp3`;
      songname.innerHTML = plays[currentAudioIndex].title;
      audio.currentTime = 0;
      playButton.style.display = 'none';
      pauseButton.style.display = 'inline-block';
      gif.style.opacity = 1;
      audio.play();
    } else {
      e.target.classList.remove("fa-pause");
      e.target.classList.add("fa-play");
      audio.pause();
    }
  });
});


function playNextAudio() {
  if (currentAudioIndex >= 2) {
     currentAudioIndex = 0;
  }else{
    currentAudioIndex++
  }
  audio.src = `${currentAudioIndex}.mp3`;
  songname.innerHTML = plays[currentAudioIndex].title;
  audio.currentTime = 0;
  playButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';

  gif.style.opacity = 1;
  playAudio();
}

function playPrevAudio() {
  if (currentAudioIndex <= 0) {
      currentAudioIndex = 0;
  }else{
    currentAudioIndex--
  }
  audio.src = `${currentAudioIndex}.mp3`;
  songname.innerHTML = plays[currentAudioIndex].title;
  audio.currentTime = 0;
  playButton.style.display = 'none';
  pauseButton.style.display = 'inline-block';
  gif.style.opacity = 1;
  playAudio();
}
menu1Icon.style.display = 'none';
songList.style.display = 'none';

menuIcon.addEventListener('click', function () {
    menuIcon.style.display = 'none';
    menu1Icon.style.display = 'inline-block';

    songList.style.display = 'block';
    songList.style.opacity = '0';
    setTimeout(function () {
        songList.style.opacity = '1';
    }, 10);
});

menu1Icon.addEventListener('click', function () {
    menu1Icon.style.display = 'none';
    menuIcon.style.display = 'inline-block';
    songList.style.opacity = '0';
    setTimeout(function () {
        songList.style.display = 'none';
    }, 300);
});

menuburger.addEventListener('click', function () {
  if (menuburger){
    songList.style.opacity = '1';
    setTimeout(function () {
        songList.style.display = 'block';
    }, 500);
  }else{
    setTimeout(function () {
        songList.style.display = 'none';
    }, 500);
  }
});

function updatevolume(element) {
  if (volu.value == 0) {
      up.classList.remove('fa-volume-up')
      up.classList.remove('fa-volume-down')
      up.classList.add('fa-volume-mute')
  }
  if (volu.value > 0) {
      up.classList.remove('fa-volume-up')
      up.classList.add('fa-volume-down')
      up.classList.remove('fa-volume-mute')
  }
  if (volu.value > 50) {
      up.classList.add('fa-volume-up')
      up.classList.remove('fa-volume-down')
      up.classList.remove('fa-volume-mute')
  }
   const val = volu.value;
   vol_progress.style.width = `${val}%`;
   vol_dot.style.left = `${val}%`;
   audio.volume = val / 100;

}

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
nextButton.addEventListener('click', playNextAudio);
prevButton.addEventListener('click', playPrevAudio);
audio.addEventListener('ended', playNextAudio);
audio.addEventListener('timeupdate', updateProgressBar);
volu.addEventListener('change', updatevolume);

