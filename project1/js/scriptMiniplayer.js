
const bottomWindow = document.getElementById('bottom-window');

// Пример функции для показа окна
function showBottomWindow() {
    bottomWindow.style.display = 'block';
    bottomWindow.style.position = 'fixed';
}

// Пример функции для скрытия окна
function hideBottomWindow() {
    bottomWindow.style.display = 'none';
}
// document.getElementById('click').addEventListener('click', () => {
//     clickBtn();
// })
function clickBtn()
{
    if (bottomWindow.style.display == 'none')
    {
        showBottomWindow();
    }
    else 
    {
        hideBottomWindow();
    }
}
function loadMiniPlayer()
{
    let player = document.getElementById('player');

    let volume = document.getElementById('volumeBarMini');
    let trackProgressbar = document.getElementById('durationMiniValue');

    volume.value = player.volume * 100;
    player.addEventListener('loadedmetadata', () => {
        trackProgressbar.max = player.duration;
        document.getElementById('miniImg').src = currentTimePlaylist[currentlyPlaying()].img;
        document.getElementById('songNameMini').textContent = currentTimePlaylist[currentlyPlaying()].name;
        document.getElementById('artistNameMini').textContent = currentTimePlaylist[currentlyPlaying()].author;
        document.getElementById('durationOfTrackMini').innerHTML = `${Math.floor(player.duration/60)}:${Math.floor(player.duration%60)}`;
    });
    if (player.play())
    {
        setInterval(()=>{
            trackProgressbar.value = player.currentTime;
            let seconds = Math.floor(player.currentTime % 60);
            let formattedSeconds = seconds.toString().padStart(2, '0');
            document.getElementById('currentTimeMini').innerHTML = `${Math.floor(player.currentTime/60)}:${formattedSeconds}`;
            endOfTrack();
        }, 1000);
    }

    trackProgressbar.onchange = function () 
    {
        player.play();
        player.currentTime = trackProgressbar.value;
        document.getElementById('currentTimeMini').innerHTML = `${Math.floor(player.currentTime/60)}:${Math.floor(player.currentTime%60)}`;
        if (document.getElementById('pauseBtnMini').classList.contains('fa-play'))
        {
            document.getElementById('pauseBtnMini').classList.add('fa-pause');
            document.getElementById('pauseBtnMini').classList.remove('fa-play');
        }
    }
    volume.onchange = function ()
    {
        player.volume = volume.value/100;
        setCookie('volume', player.volume);
    }
}
function pauseMiniClick()
{
    pauseClick();
}