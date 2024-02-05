console.log("Welcome to Musicfy")


//Init variables
let songIndex=1;
let audioElement=new Audio('Songs/track1.mp3')
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('playgif');
let masterSong=document.getElementById('masterSong');
let songItems=Array.from(document.getElementsByClassName('songItem'));
//const sparkle=document.querySelector("sparkle-button");


let songs=[
    {songName:"Meet the Frownies",filepath:"Songs/track1.mp3",coverPath:"cover1.jpg"},
    {songName:"Cheri Cheri Lady",filepath:"Songs/track2.mp3",coverPath:"cover2.jpg"},
    {songName:"Look On Down From The Bridge",filepath:"Songs/track3.mp3",coverPath:"cover3.jpg"},
    {songName:"Agora Hills",filepath:"Songs/track4.mp3",coverPath:"cover4.jpg"},
    {songName:"My Eyes",filepath:"Songs/track5.mp3",coverPath:"cover5.jpg"},
    {songName:"Kid Goku",filepath:"Songs/track6.mp3",coverPath:"cover6.jpg"},
    {songName:"La La La",filepath:"Songs/track7.mp3",coverPath:"cover7.jpg"},    
    {songName:"Nightcall",filepath:"Songs/track8.mp3",coverPath:"cover8.jpg"},
    {songName:"Starboy",filepath:"Songs/track9.mp3",coverPath:"cover9.jpg"},
    {songName:"Tourner dans le vide",filepath:"Songs/track10.mp3",coverPath:"cover10.jpg"}
]
songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath ;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName ;    
});

// Event Listeners
// Master play/pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }    
})
//Progress bar
audioElement.addEventListener('timeupdate',()=>{
    //update the seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');
    })
}


const playPauseSong = (playSongIndex) => {
    let currentPlayButton = document.getElementById(playSongIndex - 1);

    if (playSongIndex === songIndex && !audioElement.paused) {
        // Pause the currently playing song
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        currentPlayButton.classList.remove('fa-pause-circle');
        currentPlayButton.classList.add('fa-play-circle');
    } else {
        // Play the selected song
        makeAllPlays();
        songIndex = playSongIndex;
        audioElement.src = `Songs/track${songIndex}.mp3`;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        currentPlayButton.classList.remove('fa-play-circle');
        currentPlayButton.classList.add('fa-pause-circle');
    }

    masterSong.innerText = songs[songIndex - 1].songName;
}

/*
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `Songs/track${songIndex}.mp3`;
        masterSong.innerText=songs[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})
*/
/*
WORKS
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const selectedSongIndex = parseInt(e.target.id);

        if (selectedSongIndex === songIndex && !audioElement.paused) {
            // Pause if the same song is currently playing
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            // Play the new song or if the audio was paused
            makeAllPlays();
            songIndex = selectedSongIndex+1;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `Songs/track${songIndex}.mp3`;
            masterSong.innerText = songs[songIndex - 1].songName; // Adjusted index for array
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
    })
})
*/
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const selectedSongIndex = parseInt(e.target.id) + 1;
        playPauseSong(selectedSongIndex);
    })
})

document.getElementById('next').addEventListener('click', () => {
    let nextSongIndex = songIndex >= songs.length ? 1 : songIndex + 1;
    playPauseSong(nextSongIndex);
})

document.getElementById('previous').addEventListener('click', () => {
    let prevSongIndex = songIndex <= 1 ? songs.length : songIndex - 1;
    playPauseSong(prevSongIndex);
})

document.addEventListener('DOMContentLoaded', function() {
    const sparkle = document.querySelector('.sparkle-button');
    if (sparkle) {
        sparkle.addEventListener('click', () => {
            window.open('https://fancy-blancmange-e66bb9.netlify.app','_blank');
        });
    }
});

