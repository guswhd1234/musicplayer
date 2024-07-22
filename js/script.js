const musicList = [
    {name:"Alone", artist:"Color Out", audio:"Alone", img:"album1", total:"04:05" },
    {name:"Mahidevran", artist:"Mahidevran rock band", audio:"Mahidevran-Maze_of_sorrow", img:"album2", total:"06:28" },
    {name:"No Rest Or Endless Rest", artist:"Lisofv", audio:"No_Rest_Or_Endless_Rest", img:"album3", total:"04:33" },
    {name:"Old Money", artist:"TAB", audio:"Old_Money", img:"album4", total:"04:01" },
    {name:"Tantalizing Youth", artist:"Social_Square", audio:"Tantalizing_Youth", img:"album5", total:"04:12" },
    {name:"The Deep", artist:"Anitek", audio:"The_Deep", img:"album6", total:"02:24" },
];


const musicApp = document.querySelector('.player_body');
const musicAudio = musicApp.querySelector('#mainAudio');    
const playBtn = musicApp.querySelector('#playBtn');
let list_index = 0;
//----------------------------
const albumImg = musicApp.querySelector('.album>img');
const musicName = musicApp.querySelector('.name');
const artistName = musicApp.querySelector('.artist');
const totalTime = musicApp.querySelector('.duration');
const playTime = musicApp.querySelector('.current');
const progressive = musicApp.querySelector('.progress');
const progressBar = musicApp.querySelector('.bar');
const prevBtn = musicApp.querySelector('#prevBtn');
const nextBtn = musicApp.querySelector('#nextBtn');
const volumeBtn=musicApp.querySelector('.volumeBtn');
const volumeRange=musicApp.querySelector('#rangebar');
//----------------------------
const loadMusic = (num) =>{
musicAudio.src = `songs/${musicList[num].audio}.mp3`;
albumImg.src = `images/${musicList[num].img}.jpg`;
musicName.innerText = musicList[num].name;
artistName.innerHTML = musicList[num].artist;
totalTime.innerHTML = musicList[num].total;
}
loadMusic(list_index);
const musicPlay = () =>{
playBtn.innerHTML="pause";
musicAudio.play();
}
const musicPause = () =>{
playBtn.innerHTML="play_arrow";
musicAudio.pause();
}
const prevMusic = () =>{
list_index--;
if( list_index < 0 ){        
    list_index = musicList.length-1;      
}
loadMusic(list_index);
musicPlay();
}
const nextMusic = () =>{
list_index++;
if( list_index >= musicList.length ){        
    list_index = 0;      
}
loadMusic(list_index);
musicPlay();
}
playBtn.addEventListener('click', ()=>{
if(playBtn.innerText=='play_arrow'){
    musicPlay();
}else{
    musicPause();
}
});
nextBtn.addEventListener('click', ()=>{
nextMusic();
});
prevBtn.addEventListener('click', ()=>{
prevMusic();
});
musicAudio.addEventListener('timeupdate', (e)=>{
    let current = e.target.currentTime;
    let duration = e.target.duration;
    let progressRatio = ( current/duration )*100;
    progressBar.style.width = `${progressRatio}%`;
    let currentMin = Math.floor( current/60 );
    let currentSec = Math.floor( current%60 );
if( currentMin<10 ){
    currentMin = `0${currentMin}`;
}
if( currentSec<10 ){
    currentSec = `0${currentSec}`;
}
playTime.innerHTML = `${currentMin} : ${currentSec}`;
})

progressive.addEventListener('click', (e)=>{
  let clickPosition = e.offsetX;  //console.log( e.pageX, e.offsetX );
  let maxWidth = progressive.clientWidth;  // console.log( maxWidth );
musicAudio.currentTime = ( clickPosition / maxWidth )*musicAudio.duration;
if( playBtn.innerHTML == 'play_arrow'){
    musicPlay();
}
});

/*------------------------------------------------------ */
const repeatBtn = musicApp.querySelector('#repeatBtn');
repeatBtn.addEventListener('click', ()=>{
let getTextRepeat = repeatBtn.innerText;
if (getTextRepeat === "repeat") {
repeatBtn.innerText = "repeat_one";
repeatBtn.setAttribute("title", "한곡 반복");
}else if (getTextRepeat === "repeat_one") {
repeatBtn.innerText = "repeat";
repeatBtn.setAttribute("title", "전체 반복");
}
});
musicAudio.addEventListener('ended', ()=>{
let getTextRepeat = repeatBtn.innerText;
if( getTextRepeat=='repeat'){
    nextMusic();
}else{
    loadMusic(list_index);
    musicPlay();
}
});

const listBox = musicApp.querySelector('.play_list');
const fragment = document.createDocumentFragment();
for(let i=0; i<musicList.length; i++){
let li = document.createElement('li');
li.innerHTML=`<strong>${musicList[i].name}</strong> <em>${musicList[i].artist}</em>`;
fragment.appendChild(li);
}
listBox.querySelector('ul').appendChild(fragment);
const listBtn = musicApp.querySelector('#listBtn');
listBtn.addEventListener('click',()=>{
listBox.classList.toggle('active');
});

volumeBtn.addEventListener('click',(e)=>{
e.target.classList.toggle('open');
volumeCtrl.classList.toggle('hidden');
});

volumeRange.addEventListener('change',()=>{
let oriVol=musicAudio.volume;
musicAudio.volume=volumeRange.value/100;
let currVol=musicAudio.volume;
if(currVol==0){
    volumeBtn.innerHTML='volume_off';
} else if(oriVol<=currVol){
    volumeBtn.innerHTML='volume_up';
} else{
    volumeBtn.innerHTML='volume_down';
}
});