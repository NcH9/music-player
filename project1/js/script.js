



let currentTimePlaylist = new Array;
let dragonforce = 
{
    name: 'Through the Fire and Flames',
    author: 'Dragonforce',
    src: '../tracks/Dragonforce - Through the Fire and Flames(Lyrics).mp3',
    img: '../tracks/Dragonforce - Through the Fire and Flames.jpg',
    id: 0,
}
// getDuration(dragonforce.src)
//     .then(duration => {
//         dragonforce.duration = duration;
//     });
currentTimePlaylist.push(dragonforce);
console.log(currentTimePlaylist);
let isPaused = false;

function setPlayer()
{
    let player = document.getElementById('player');
    if (!document.getElementById('linkToTrack'))
    {
        let source = document.createElement('source');
        source.id = 'linkToTrack';
        source.type = 'audio/mpeg';
        player.appendChild(source);
    }
    document.getElementById('linkToTrack').src = currentTimePlaylist[0].src;
    document.getElementById('linkToTrack').trackId = currentTimePlaylist[0].id;

    currentTimePlaylist[0].src = document.getElementById('linkToTrack').src;
    player.load();
    player.addEventListener('canplay', () => {
        if (document.getElementById('pauseBtn').classList.contains('fa-play'))
        {
            document.getElementById('pauseBtn').classList.add('fa-pause');
            document.getElementById('pauseBtn').classList.remove('fa-play');
        }
        player.play();
        document.getElementById('audioProgress').max = player.duration;
        document.getElementById('imgInPlayer').src = currentTimePlaylist[currentlyPlaying()].img;
        document.getElementById('songName').textContent = currentTimePlaylist[currentlyPlaying()].name;
        document.getElementById('artistName').textContent = currentTimePlaylist[currentlyPlaying()].author;
    }, { once: true });    
}
function pauseClick()
{
    if (document.getElementById('pauseBtn').classList.contains('fa-play'))
    {
        document.getElementById('player').play();
        isPaused = false;
        if (document.getElementById('pauseBtn').classList.contains('fa-play'))
        {
            document.getElementById('pauseBtn').classList.add('fa-pause');
            document.getElementById('pauseBtn').classList.remove('fa-play');
        }
    }
    else
    {
        document.getElementById('player').pause();
        isPaused = true;
        if (document.getElementById('pauseBtn').classList.contains('fa-pause'))
        {
            document.getElementById('pauseBtn').classList.remove('fa-pause');
            document.getElementById('pauseBtn').classList.add('fa-play');
        }
    }
    if (document.getElementById('pauseBtnMini').classList.contains('fa-play'))
    {
        document.getElementById('pauseBtnMini').classList.add('fa-pause');
        document.getElementById('pauseBtnMini').classList.remove('fa-play');
    }
    else
    {
        document.getElementById('pauseBtnMini').classList.remove('fa-pause');
        document.getElementById('pauseBtnMini').classList.add('fa-play');
    }
}
function prevClick()
{
    if (document.getElementById('player').currentTime <= 5)
    {
        goPreviousTrack();
    }
    else 
    {
        document.getElementById('player').currentTime = 0;
    }
}
function nextClick()
{
    document.getElementById('player').currentTime = document.getElementById('player').duration;
    endOfTrack();
}
function openPopup()
{
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    //document.getElementById("openPlayer").style.display = "block";
    hideBottomWindow();
    loadPlayer();
}
function closePopup()
{
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    showBottomWindow();
}
function loadPlayer()
{

    if (!document.getElementById('linkToTrack'))
    {
        setPlayer();       
    }
    
    showCurrentTimePlaylist();
    let audioProgress = document.getElementById('audioProgress');
    let volume = document.getElementById('volumeBar');
    let player = document.getElementById('player');

    if (getCookie('volume'))
    {
        player.volume = getCookie('volume');
    }
    else
    {
        player.volume = 0;
    }
    volume.value = player.volume * 100;

    player.addEventListener('loadedmetadata', () => {
        audioProgress.max = player.duration;
        document.getElementById('imgInPlayer').src = currentTimePlaylist[currentlyPlaying()].img;
        document.getElementById('songName').textContent = currentTimePlaylist[currentlyPlaying()].name;
        document.getElementById('artistName').textContent = currentTimePlaylist[currentlyPlaying()].author;
        document.getElementById('timeOverall').innerHTML = `${Math.floor(player.duration/60)}:${Math.floor(player.duration%60)}`;
    });

    if (player.play())
    {
        setInterval(()=>{
            audioProgress.value = player.currentTime;
            let seconds = Math.floor(player.currentTime % 60);
            let formattedSeconds = seconds.toString().padStart(2, '0');
            document.getElementById('timeElapsed').innerHTML = `${Math.floor(player.currentTime/60)}:${formattedSeconds}`;
            endOfTrack();
        }, 1000);
    }

    audioProgress.onchange = function () 
    {
        player.play();
        player.currentTime = audioProgress.value;
        document.getElementById('timeElapsed').innerHTML = `${Math.floor(player.currentTime/60)}:${Math.floor(player.currentTime%60)}`;
        if (document.getElementById('pauseBtn').classList.contains('fa-play'))
        {
            document.getElementById('pauseBtn').classList.add('fa-pause');
            document.getElementById('pauseBtn').classList.remove('fa-play');
        }
    }
    volume.onchange = function ()
    {
        player.volume = volume.value/100;
        setCookie('volume', player.volume);
    }

    if (isPaused == false)
    {
        if (document.getElementById('pauseBtn').classList.contains('fa-play'))
        {
            document.getElementById('pauseBtn').classList.add('fa-pause');
            document.getElementById('pauseBtn').classList.remove('fa-play');
        }
        player.play()
    }
    else
    {
        player.pause();
    }
    loadMiniPlayer();
}
function showCurrentTimePlaylist()
{
    if (document.getElementById('bubbleCurrentPlaylist'))
    {
        document.getElementById('playerItself').removeChild(document.getElementById('bubbleCurrentPlaylist'));
    }
    if (!document.getElementById('bubbleCurrentPlaylist'))
    {
        createDiv('bubbleCurrentPlaylist','playlistBubble','playerItself');
        createDiv('currentTimePlaylist', 'grid', 'bubbleCurrentPlaylist');
    }
    for (let i = 0; i < currentTimePlaylist.length; i++)
    {
        let divId = 'currentDiv'+i;
        let div1Id = 'currentDiv1'+i;
        let div2Id = 'currentDiv2'+i;
        let gridDiv = 'gridDiv'+i;
        let div3Id = 'currentDiv3'+i;
        let playButtonId = 'playButtonInCurrentPlaylist'+i;
        let deleteButtonId = 'deleteButtonInCurrentPlaylist'+i;

        if (!document.getElementById(divId))
        {
            createDiv(divId, 'gridForCurrentPlaylist', 'currentTimePlaylist');
            if (currentlyPlaying() == i)
            {
                createDiv(div1Id, 'songBubbleCurrent', divId);
            }
            else
            {
                createDiv(div1Id, 'songBubble', divId);
            }
            createDiv(div2Id, 'flex-center', div1Id);
            createDiv(gridDiv, 'grid', div2Id);

            createSpan('songName'+i, 'flex-center', currentTimePlaylist[i].name, gridDiv);
            document.getElementById('songName'+i).style.width = '250px';
            document.getElementById('songName'+i).style.fontWeight = '400';

            createSpan('authorName'+i, 'flex-center', currentTimePlaylist[i].author, gridDiv);
            document.getElementById('authorName'+i).style.width = '250px';
            document.getElementById('authorName'+i).style.fontWeight = '700';

            createDiv(div3Id, 'flex-between', div1Id);
            createButton(playButtonId, 'playerBtn', 'play', div3Id);
            document.getElementById(playButtonId).addEventListener('click', () => {
                playInCurrentPlaylistClick(i);
            })
            createButton(deleteButtonId, 'playerBtn', 'delete', div3Id);
            document.getElementById(deleteButtonId).addEventListener('click', () => {
                deleteFromCurrentPlaylistClick(i);
            })
        }
    }
}
function clearCurrentTimePlaylist()
{
    if (document.getElementById('bubbleCurrentPlaylist'))
    {
        document.getElementById('playerItself').removeChild(document.getElementById('bubbleCurrentPlaylist'));
        for (let i = 0; i < currentTimePlaylist.length; i++)
        {
            let divId = 'currentDiv'+i;
            if (document.getElementById(divId))
            {
                document.getElementById('currentTimePlaylist').removeChild(document.getElementById(divId))
            }
        }
    }
}
function playInCurrentPlaylistClick(trackNumber)
{
    if (currentlyPlaying() != trackNumber)
    {
        document.getElementById('linkToTrack').src = currentTimePlaylist[trackNumber].src;
        currentTimePlaylist[trackNumber].src = document.getElementById('linkToTrack').src;
        document.getElementById('linkToTrack').trackId = currentTimePlaylist[trackNumber].id;

        document.getElementById('player').load();
        player.addEventListener('canplay', () => {
            if (document.getElementById('pauseBtn').classList.contains('fa-play'))
            {
                document.getElementById('pauseBtn').classList.add('fa-pause');
                document.getElementById('pauseBtn').classList.remove('fa-play');
            }
            player.play();
            clearCurrentTimePlaylist();
            showCurrentTimePlaylist();
        }, { once: true });
        document.getElementById('audioProgress').max = player.duration;
        console.log(trackNumber)   
    }
}
function deleteFromCurrentPlaylistClick(trackNumber)
{
    let player = document.getElementById('player');
    if (currentTimePlaylist.length > 1)
    {
        if (Number(trackNumber+1) == currentTimePlaylist.length)
        {
            if (Number(currentlyPlaying()+1) < currentTimePlaylist.length)
            {
                currentTimePlaylist.splice(trackNumber, 1);
                clearCurrentTimePlaylist();
                showCurrentTimePlaylist();
            }
            else
            {
                currentTimePlaylist.splice(trackNumber, 1);
                document.getElementById('linkToTrack').src = currentTimePlaylist[trackNumber-1].src;
                currentTimePlaylist[trackNumber-1].src = document.getElementById('linkToTrack').src;
                document.getElementById('linkToTrack').trackId = currentTimePlaylist[trackNumber-1].id;
                player.load();
                player.addEventListener('canplay', () => {
                    if (document.getElementById('pauseBtn').classList.contains('fa-play'))
                    {
                        document.getElementById('pauseBtn').classList.add('fa-pause');
                        document.getElementById('pauseBtn').classList.remove('fa-play');
                    }
                    player.play();
                    
                }, { once: true });
                document.getElementById('audioProgress').max = player.duration;
                clearCurrentTimePlaylist();
                showCurrentTimePlaylist();
            }
        }
        else
        {
            if (currentlyPlaying() != trackNumber)
            {
                currentTimePlaylist.splice(trackNumber, 1);
                clearCurrentTimePlaylist();
                showCurrentTimePlaylist();
            }
            else
            {
                currentTimePlaylist.splice(trackNumber, 1);
                document.getElementById('linkToTrack').src = currentTimePlaylist[trackNumber-1].src;
                currentTimePlaylist[trackNumber-1].src = document.getElementById('linkToTrack').src;
                document.getElementById('linkToTrack').trackId = currentTimePlaylist[trackNumber-1].id;
                player.load();
                player.addEventListener('canplay', () => {
                    if (document.getElementById('pauseBtn').classList.contains('fa-play'))
                    {
                        document.getElementById('pauseBtn').classList.add('fa-pause');
                        document.getElementById('pauseBtn').classList.remove('fa-play');
                    }
                    player.play();
                    
                }, { once: true });
                document.getElementById('audioProgress').max = player.duration;
                clearCurrentTimePlaylist();
                showCurrentTimePlaylist();
            }
        } 
    }
}
function createCurrentPlaylist(stuffToPlay)
{
    currentTimePlaylist = [];
    if (stuffToPlay.length == undefined)
    {
        currentTimePlaylist.push(stuffToPlay);
        currentTimePlaylist[currentTimePlaylist.length-1].id = currentTimePlaylist.length-1;
    }
    else
    {    
        currentTimePlaylist = stuffToPlay;
        for (let i = 0; i < currentTimePlaylist.length; i++)
        {
            currentTimePlaylist[i].id = i;
        }
        console.log(currentTimePlaylist);
    }
    if (document.getElementById('linkToTrack'))
    {
        document.getElementById('player').removeChild(document.getElementById('linkToTrack'));
    }
    console.log(currentTimePlaylist);
    setPlayer();
    openPopup();
}
function currentlyPlaying()
{
    let i = 0;
    while (document.getElementById('linkToTrack').trackId != currentTimePlaylist[i].id)
    {
        i++;
    }
    return i;
}
function goNextTrack()
{
    if (Number(currentlyPlaying()+1) < currentTimePlaylist.length)
    {
        let player = document.getElementById('player');
        document.getElementById('linkToTrack').src = currentTimePlaylist[currentlyPlaying()+1].src;
        document.getElementById('linkToTrack').trackId = currentTimePlaylist[currentlyPlaying()+1].id;
        
        player.load();
        player.addEventListener('canplay', () => {
            if (document.getElementById('pauseBtn').classList.contains('fa-play'))
            {
                document.getElementById('pauseBtn').classList.add('fa-pause');
                document.getElementById('pauseBtn').classList.remove('fa-play');
            }
            document.getElementById('imgInPlayer').src = currentTimePlaylist[currentlyPlaying()].img;
            document.getElementById('songName').textContent = currentTimePlaylist[currentlyPlaying()].name;
            document.getElementById('artistName').textContent = currentTimePlaylist[currentlyPlaying()].author;
            document.getElementById('timeOverall').innerHTML = `${Math.floor(player.duration/60)}:${Math.floor(player.duration%60)}`;
            document.getElementById('timeElapsed').innerHTML = '0';
            player.play();
        }, { once: true });
    }
    else
    {
        document.getElementById('player').currentTime = document.getElementById('player').duration;
        if (document.getElementById('pauseBtn').classList.contains('fa-pause'))
        {
            document.getElementById('pauseBtn').classList.remove('fa-pause');
            document.getElementById('pauseBtn').classList.add('fa-play');
        }
    }
}
function goPreviousTrack()
{
    if (Number(currentlyPlaying()) > 0)
    {
        let player = document.getElementById('player');
        document.getElementById('linkToTrack').src = currentTimePlaylist[currentlyPlaying()-1].src;
        document.getElementById('linkToTrack').trackId = currentTimePlaylist[currentlyPlaying()-1].id;
        player.load();
        player.addEventListener('canplay', () => {
            if (document.getElementById('pauseBtn').classList.contains('fa-play'))
            {
                document.getElementById('pauseBtn').classList.add('fa-pause');
                document.getElementById('pauseBtn').classList.remove('fa-play');
            }
            document.getElementById('imgInPlayer').src = currentTimePlaylist[currentlyPlaying()].img;
            document.getElementById('songName').textContent = currentTimePlaylist[currentlyPlaying()].name;
            document.getElementById('artistName').textContent = currentTimePlaylist[currentlyPlaying()].author;
            document.getElementById('timeOverall').innerHTML = `${Math.floor(player.duration/60)}:${Math.floor(player.duration%60)}`;
            document.getElementById('timeElapsed').innerHTML = '0:00';
            player.play();
        }, { once: true });
    }
    else
    {
        document.getElementById('player').currentTime = 0;
        if (document.getElementById('pauseBtn').classList.contains('fa-play'))
        {
            document.getElementById('pauseBtn').classList.add('fa-pause');
            document.getElementById('pauseBtn').classList.remove('fa-play');
        }
    }
}
function changeRepeatMode()
{
    let repeatButton = document.getElementById('repeatButton');
    if (getRepeatMode() == 1)
    {
        repeatButton.innerText = 'repeat one';
    }
    else if (getRepeatMode() == 2)
    {
        repeatButton.innerText = 'repeat playlist';
    }
    else
    {
        repeatButton.innerText = 'no repeat';
    }
}
function getRepeatMode()
{
    let repeatMode;
    if (document.getElementById('repeatButton').innerText == 'no repeat')
    {
        repeatMode = 1;
    }
    else if (document.getElementById('repeatButton').innerText == 'repeat one')
    {
        repeatMode = 2;
    }
    else
    {
        repeatMode = 3;
    }
    return repeatMode;
}
function endOfTrack()
{
    let player = document.getElementById('player')
    if (player.currentTime == player.duration)
    {
        if (getRepeatMode() == 2)
        {
            player.currentTime = 0;
            if (document.getElementById('pauseBtn').classList.contains('fa-play'))
            {
                document.getElementById('pauseBtn').classList.add('fa-pause');
                document.getElementById('pauseBtn').classList.remove('fa-play');
            }
            player.play();
        }
        else if (getRepeatMode() == 3)
        {
            if (Number(currentlyPlaying()+1) == currentTimePlaylist.length)
            {
                document.getElementById('linkToTrack').src = currentTimePlaylist[0].src;
                document.getElementById('linkToTrack').trackId = currentTimePlaylist[0].id;
                player.load();
                player.addEventListener('canplay', () => {
                    if (document.getElementById('pauseBtn').classList.contains('fa-play'))
                    {
                        document.getElementById('pauseBtn').classList.add('fa-pause');
                        document.getElementById('pauseBtn').classList.remove('fa-play');
                    }
                    document.getElementById('imgInPlayer').src = currentTimePlaylist[currentlyPlaying()].img;
                    document.getElementById('songName').textContent = currentTimePlaylist[currentlyPlaying()].name;
                    document.getElementById('artistName').textContent = currentTimePlaylist[currentlyPlaying()].author;
                    document.getElementById('timeOverall').innerHTML = `${Math.floor(player.duration/60)}:${Math.floor(player.duration%60)}`;
                    document.getElementById('timeElapsed').innerHTML = '0';
                    player.play();
                }, { once: true });
                player.currentTime = 0;
            }
            else 
            {
                goNextTrack();
            }
        }
        else
        {
            if (Number(currentlyPlaying()+1) < currentTimePlaylist.length)
            {
                goNextTrack();
                player.currentTime = 0;
            }
            else
            {
                player.pause();
            }
        }
    }
}
function addToQueNext(track)
{
    if(!document.getElementById('linkToTrack'))
    {
        createCurrentPlaylist(track);
    }
    else
    {
        currentTimePlaylist.splice(currentlyPlaying()+1, 0, track);
        for (let i = 0; i < currentTimePlaylist.length; i++)
        {
            currentTimePlaylist[i].id = i;
            console.log(currentTimePlaylist[i].id)
        }
    }
}
// function getDuration(trackSrc) {
//     return new Promise((resolve) => {
//         let player = document.createElement('audio');
//         let linkToTrack = document.createElement('source');
        
//         linkToTrack.src = trackSrc;
//         player.appendChild(linkToTrack);
//         document.body.appendChild(player);

//         player.addEventListener('loadedmetadata', () => {
//             let songDuration = player.duration;
//             player.remove();
//             resolve(songDuration);
//         }, { once: true });

//         player.load();
//     });
// }
