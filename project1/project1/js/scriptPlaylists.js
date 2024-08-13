





// localStorage.clear();

let playlists = new Array;
for (let i = 0; i < localStorage.length; i++)
{
    let playlistId = 'playlist'+i;
    if (localStorage.getItem(playlistId));
    {
        playlists.push(localStorage.getItem(playlistId));
    }
}

function playWholePlaylist(playlistToPlay)
{
    createCurrentPlaylist(playlistToPlay);
}
function createPlaylist()
{
    clearAll('');
    if (!document.getElementById('createPlaylistDiv'))
    {
        createDiv('createPlaylistDiv', 'flex-center', 'playlistFolderCreatePlaylist');
    }
    if (!document.getElementById('playlistConfirmCreateButton'))
    {
        createButton('playlistConfirmCreateButton', 'navBtn3','Create this playlist', 'createPlaylistDiv');
        document.getElementById('playlistConfirmCreateButton').addEventListener('click', function () {
            confirmPlaylistCreation();
            observePlaylists();
        })
    }
    if (!document.getElementById('playlistName'))
    {
        createInput('playlistName', '', 'text', 'Enter playlist name', 'createPlaylistDiv');
    }
    if (!document.getElementById('playlistDenyCreateButton'))
    {
        createButton('playlistDenyCreateButton', 'navBtn3', 'x', 'createPlaylistDiv');
        document.getElementById('playlistDenyCreateButton').addEventListener('click', function () {
            clearPlaylistCreationBlank();
        })
    }
}  
function confirmPlaylistCreation()
{
    let playlistName = document.getElementById('playlistName');
    let playlistId = 'playlist'+Number(getNumberOfPlaylists()+1);
    let playlistData = {
        id: playlistId,
        name: playlistName.value,
        trackAmount: 0,
        listOfSoundtracks: '',
    }
    if (playlistName.value.trim() != '' && playlistName.value != null)
    {
        console.log(getNumberOfEmptyPlaylists());
        if (getNumberOfEmptyPlaylists() < 5)
        {
            playlists = playlistData;
            let playlistLoader = JSON.stringify(playlists);

            playlistId = 'playlist'+Number(getNumberOfPlaylists()+1);
            localStorage.setItem(playlistId, playlistLoader);
            console.log(getNumberOfEmptyPlaylists());

            alert('playlist created');
            clearPlaylistCreationBlank();
            console.log(localStorage);
        }
        else
        {
            alert('You can`t have more than 5 empty playlists. New playlist is not created');
            clearPlaylistCreationBlank();
        }
    }
    else
    {
        alert('New playlist is not created');
        clearPlaylistCreationBlank();
    }
}
function hidePlaylists()
{
    document.getElementById('showPlaylists').textContent = 'Show Playlists';
    if (document.getElementById('playlistFolderChild'))
    {
        document.getElementById('playlistFolderChild').remove();
    }
}
function clickShowPlaylists()
{
    clearSearchResults();
    clearSelector();
    clearPlaylistCreationBlank();
    if (document.getElementById('showPlaylists').textContent != 'Hide Playlists')
    {
        observePlaylists();
        document.getElementById('showPlaylists').textContent = 'Hide Playlists';
    }
    else
    {
        hidePlaylists();
        document.getElementById('showPlaylists').textContent = 'Show Playlists'
    }
}
function clickHidePlaylistContent(playlistId)
{
    if (document.getElementById('seePlaylistContent'+playlistId).textContent == 'open')
    {
        seePlaylistContent(playlistId);
        document.getElementById('seePlaylistContent'+playlistId).textContent = 'hide';
    }
    else
    {
        hidePlaylistContent(playlistId);
        document.getElementById('seePlaylistContent'+playlistId).textContent = 'open';
    }
}
function hidePlaylistContent(playlistId)
{
    if (localStorage.getItem(playlistId) != null)
    {
        observePlaylists();
        createDiv('trackDivFolder', 'playlistBubble', playlistId);
        if (document.getElementById('trackDivFolder'))
        {
            document.getElementById(playlistId).removeChild(document.getElementById('trackDivFolder'));
        }
    } 
}
function observePlaylists()
{
    let localStorageContent = [];
    for (let i = 0; i < localStorage.length; i++) 
    {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        localStorageContent.push(value);
    }
    if (!document.getElementById('playlistFolderChild'))
    {
        createDiv('playlistFolderChild', 'grid', 'playlistFolder');
    }
    console.log(localStorageContent);
    console.log(localStorage);
    localStorageContent.map((Element) => {
        if (Element.includes('playlist'))
        {
            let elementObj = JSON.parse(Element)
            let playlistId = elementObj.id;
            console.log(playlistId)
            let currentPlaylist = elementObj;
            let divId = playlistId;
            let listOfSoundtracks;
            if (currentPlaylist.listOfSoundtracks)
            {
                listOfSoundtracks = JSON.parse(currentPlaylist.listOfSoundtracks);
                console.log(listOfSoundtracks);
            }
            
            if (!document.getElementById(divId))
            {
                createDiv(divId, 'bubble', 'playlistFolderChild');
                document.getElementById(divId).innerText = `${currentPlaylist.name}: ${currentPlaylist.trackAmount} tracks`;
                if (!document.getElementById('playWholePlaylist'+divId))
                {
                    createButton('playWholePlaylist'+divId, 'flex-center', 'play', divId);
                    document.getElementById('playWholePlaylist'+divId).addEventListener('click', function () {
                        if (currentPlaylist.trackAmount > 0)
                        {
                            playWholePlaylist(listOfSoundtracks);
                        }
                        else
                        {
                            alert('0 tracks in this playlist. it can`t be played :(')
                        }
                    })
                }
                if (!document.getElementById('seePlaylistContent'+divId))
                {
                    createButton('seePlaylistContent'+divId, 'flex-center', 'open', divId);
                    document.getElementById('seePlaylistContent'+divId).addEventListener('click', function () {
                        clickHidePlaylistContent(playlistId);
                    })
                }
                if (!document.getElementById('deletePlaylist'+divId))
                {
                    createButton('deletePlaylist'+divId, 'flex-center', 'delete playlist', divId);
                    document.getElementById('deletePlaylist'+divId).addEventListener('click', function () {
                        hidePlaylists();
                        document.getElementById('showPlaylists').textContent = 'Show Playlists';
                        deletePlaylist(playlistId);
                        console.log(localStorage)
                    })
                }
                console.log(document.getElementById('playWholePlaylist'+divId))
                console.log(document.getElementById('seePlaylistContent'+divId))
            }
            else 
            {
                document.getElementById('playlistFolderChild').removeChild(document.getElementById(divId));
                createDiv(divId, 'bubble', 'playlistFolderChild');
                document.getElementById(divId).innerText = `${currentPlaylist.name}: ${currentPlaylist.trackAmount} tracks`;
                if (!document.getElementById('playWholePlaylist'+divId))
                {
                    createButton('playWholePlaylist'+divId, 'flex-center', 'play', divId);
                    document.getElementById('playWholePlaylist'+divId).addEventListener('click', function () {
                        if (currentPlaylist.trackAmount > 0)
                        {
                            playWholePlaylist(listOfSoundtracks);
                        }
                        else
                        {
                            alert('0 tracks in this playlist. it can`t be played :(')
                        }
                    })
                }
                if (!document.getElementById('seePlaylistContent'+divId))
                {
                    createButton('seePlaylistContent'+divId, 'flex-center', 'open', divId);
                    document.getElementById('seePlaylistContent'+divId).addEventListener('click', function () {
                        clickHidePlaylistContent(playlistId);
                    })
                }
                if (!document.getElementById('deletePlaylist'+divId))
                {
                    createButton('deletePlaylist'+divId, 'flex-center', 'delete playlist', divId);
                    document.getElementById('deletePlaylist'+divId).addEventListener('click', function () {
                        hidePlaylists();
                        document.getElementById('showPlaylists').textContent = 'Show Playlists';
                        deletePlaylist(playlistId);
                        console.log(localStorage)
                    })
                }
            }
        }
    })
}
function seePlaylistContent(playlistId)
{
    if (localStorage.getItem(playlistId) != null)
    {
        let currentPlaylist = JSON.parse(localStorage.getItem(playlistId));
        if (currentPlaylist.listOfSoundtracks)
        {
            let listOfSoundtracks = JSON.parse(currentPlaylist.listOfSoundtracks);
            console.log(listOfSoundtracks);
            observePlaylists();
            if (listOfSoundtracks.length != 0)
            {
                createDiv('trackDivFolder', 'playlistBubble', playlistId);
            }
            for (let i = 0; i < listOfSoundtracks.length; i++)
            {
                let divId = 'trackDiv'+Number(i+1);
                console.log(divId);
                if (!document.getElementById(divId))
                {
                    createDiv(divId, 'playlistBubble', 'trackDivFolder');

                    createDiv('1'+divId, 'flex-center', divId);
                    let img = document.createElement('img');
                    img.src = listOfSoundtracks[i].img;
                    document.getElementById('1'+divId).appendChild(img);
                    createDiv('2'+divId, 'grid', divId);
                    createSpan('span'+divId, 'flex-center', listOfSoundtracks[i].name, '2'+divId);
                    createSpan('span'+divId, 'flex-center', listOfSoundtracks[i].author, '2'+divId);
                    
                    if (!document.getElementById('deleteSong'+divId))
                    {
                        createButton('deleteSong'+divId, 'flex-center', 'delete', divId);
                        document.getElementById('deleteSong'+divId).addEventListener('click', function () {
                            deleteSongFromPlaylist(playlistId, divId);
                        })
                    }
                    if (!document.getElementById('addToQueNext'+divId))
                    {
                        createButton('addToQueNext'+divId, 'flex-center', 'add to que', divId);
                        document.getElementById('addToQueNext'+divId).addEventListener('click', function () {
                            addToQueNext(listOfSoundtracks[i]);
                        })
                    }
                }
            }
        } 
    }
}
function getNumberOfPlaylists()
{
    let amount = 0;
    for (let i = 0; i < localStorage.length; i++)
    {
        let playlistId = 'playlist'+Number(i+1);
        if (localStorage.getItem(playlistId) != null)
        {
            amount++;
            console.log(amount);
        }
    }
    return amount;
}
function getNumberOfEmptyPlaylists()
{
    let emptyAmount = 0;
    for (let i = 0; i < localStorage.length; i++)
    {
        let playlistId = 'playlist'+Number(i+1);
        let dataFromLS = localStorage.getItem(playlistId)
        if (dataFromLS != null)
        {
            if (JSON.parse(dataFromLS).trackAmount == 0)
            {
                emptyAmount++;
            }
        }
    }
    return emptyAmount;
}
function clearPlaylistCreationBlank()
{
    if (document.getElementById('createPlaylistDiv'))
    {
        document.getElementById('playlistFolderCreatePlaylist').removeChild(document.getElementById('createPlaylistDiv'));
    }
}
function addTrackToPlaylist(track, playlistId)
{
    console.log(playlistId);
    console.log(playlists);

    let currentPlaylist = JSON.parse(localStorage.getItem(playlistId));
    console.log(currentPlaylist)
    let listOfSoundtracks = new Array;
    if (currentPlaylist.trackAmount != 0)
    {
        listOfSoundtracks = JSON.parse(currentPlaylist.listOfSoundtracks);
    }
    let soundtrack;
    if (track == '')
    {
        soundtrack = {
            name: 'Through the Fire and Flames',
            author: 'Dragonforce',
            src: '../tracks/Dragonforce - Through the Fire and Flames(Lyrics).mp3',
            img: '../tracks/Dragonforce - Through the Fire and Flames.jpg',
            id: 0,
        };
    }
    else 
    {
        soundtrack = {
            name: track.name,
            author: track.author,
            src: track.src,
            img: track.img,
            id: 0,
        }
        console.log(soundtrack);
    }
    listOfSoundtracks.push(soundtrack);

    currentPlaylist.listOfSoundtracks = JSON.stringify(listOfSoundtracks);
    currentPlaylist.trackAmount++;

    let uploadData = JSON.stringify(currentPlaylist);

    localStorage.setItem(playlistId, uploadData);
}
function choosePlaylistToAddTrackTo(soundtrack, parentId)
{
    clearSelector();
    clearPlaylistCreationBlank();
    hidePlaylists();
    let id
    if (parentId == '' || parentId == null)
    {
        id = 'selectDiv';
    }
    else
    {
        id = parentId;
    }
    if (!document.getElementById('confirmSelect1'))
    {
        console.log(parentId)
        createButton('confirmSelect1', 'navBtn3', 'confirm', id);
        document.getElementById('confirmSelect1').addEventListener('click', () => {
            console.log(getChosenPlaylistId(id))
            addTrackToPlaylist(soundtrack, getChosenPlaylistId(id));
            clearSelector(id);
        })
    }
    if (!document.getElementById('select1'))
    {
        let select = document.createElement('select')
        select.id = 'select1';
        select.className = 'flex-center';
        select.placeholder = 'choose playlist';
        document.getElementById(id).appendChild(select);
    }
    if (!document.getElementById('declineSelect1'))
    {
        createButton('declineSelect1', 'navBtn3', 'x', id);
        document.getElementById('declineSelect1').addEventListener('click', () => {
            clearSelector(id);
        })
    }
    for (let i = 0; i < localStorage.length; i++)
    {
        let playlistId = 'playlist'+Number(i+1);
        if (localStorage.getItem(playlistId) != null)
        {
            let currentPlaylist = JSON.parse(localStorage.getItem(playlistId));
            option = document.createElement('option')
            option.id = 'option'+i;
            option.className = 'options';
            option.value = playlistId;
            console.log(option.value)
            option.textContent = currentPlaylist.name;
            document.getElementById('select1').appendChild(option);
        }   
    }
}
function getChosenPlaylistId()
{
    let select = document.getElementById('select1');
    return select.options[select.selectedIndex].value;
}
function clearSelector()
{
    if (document.getElementById('select1'))
    {
        document.getElementById('select1').remove();
    }
    if (document.getElementById('confirmSelect1'))
    {
        document.getElementById('confirmSelect1').remove();
    }
    if (document.getElementById('declineSelect1'))
    {
        document.getElementById('declineSelect1').remove();
    }
}
function playlistIsEmpty (playlistId)
{
    let dataFromLS = localStorage.getItem(playlistId)
    if (JSON.parse(dataFromLS).trackAmount == 0)
    {
        return true;
    }
    else 
    {
        return false;
    }
}
function deleteSongFromPlaylist(playlistId, trackNumber)
{
    if (localStorage.getItem(playlistId) != null)
    {
        let currentPlaylist = JSON.parse(localStorage.getItem(playlistId));
        if (currentPlaylist.listOfSoundtracks)
        {
            let listOfSoundtracks = JSON.parse(currentPlaylist.listOfSoundtracks);
            for (let i = 0; i < listOfSoundtracks.length; i++)
            {
                let divId = 'trackDiv'+Number(i+1);
                if (divId == trackNumber)
                {
                    if (document.getElementById(divId))
                    {
                        console.log(listOfSoundtracks);
                        listOfSoundtracks.splice(i, 1);
                        console.log(listOfSoundtracks);

                        currentPlaylist.listOfSoundtracks = JSON.stringify(listOfSoundtracks);
                        currentPlaylist.trackAmount--;

                        let uploadData = JSON.stringify(currentPlaylist);
                        localStorage.setItem(playlistId, uploadData);

                        document.getElementById('trackDivFolder').removeChild(document.getElementById(divId));
                        if (currentPlaylist.trackAmount == 0)
                        {
                            document.getElementById(playlistId).removeChild(document.getElementById('trackDivFolder'));
                        }
                    }                   
                }
            }
            observePlaylists();
            seePlaylistContent(playlistId);   
        } 
    } 
}
function deletePlaylist(playlistId)
{
    localStorage.removeItem(playlistId);
    hidePlaylists();
}