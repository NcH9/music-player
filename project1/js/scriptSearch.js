
let term = '';
const updateTerm = () => {
    term = document.getElementById('searchTerm').value;
    // check term exist
    if (!term || term === '') 
    {
        alert('Please enter a search term');
    } 
    else 
    {
        let iterator = 0;
        const url = `https://itunes.apple.com/search?term=${term}`;
        clearAll('');
        fetch(url)
            .then((Response) => Response.json())
            .then((data) => {
                console.log(data.results);
                const artists = data.results;
                return artists.map(result => {
                    // Now create Html Element 
                    createDiv('searchRes1'+iterator, 'bubble', 'songs');
                    createDiv('searchRes2'+iterator, 'flex-center', 'searchRes1'+iterator);
                    

                    const
                        artists = document.createElement('p'),
                        song = document.createElement('h4'),
                        img = document.createElement('img'),
                        audio = document.createElement('audio'),
                        audioSource = document.createElement('source')

                    // Now put content 

                    artists.innerHTML = result.artistName;
                    song.innerHTML = result.trackName+' (preview)';
                    img.src = result.artworkUrl100;
                    audioSource.src = result.previewUrl;
                    // audio.controls = true;
                    let currentTrack = 
                    {
                        name: result.trackName+' (preview)',
                        author: result.artistName,
                        src: result.previewUrl,
                        img: result.artworkUrl100,
                        id: 0,
                    }
                    document.getElementById('searchRes2'+iterator).appendChild(img);
                    createDiv('searchRes3'+iterator, 'grid', 'searchRes2'+iterator);
                    document.getElementById('searchRes3'+iterator).appendChild(artists);
                    document.getElementById('searchRes3'+iterator).appendChild(song);
                    document.getElementById('searchRes1'+iterator).appendChild(audio);
                    audio.appendChild(audioSource);
                    createDiv('searchRes4'+iterator, 'flex-center', 'searchRes1'+iterator);

                    let selectIdOnSearchTracks = 'selectIdOnSearchTracks'+iterator
                    createDiv(selectIdOnSearchTracks, 'flex-center', 'searchRes1'+iterator);
                    createButton('playTrack'+iterator, 'navBtn2', 'play', 'searchRes4'+iterator);
                    document.getElementById('playTrack'+iterator).addEventListener('click', () => {
                        createCurrentPlaylist(currentTrack);
                    })
                    createButton('addToQueThisTrack'+iterator, 'navBtn2', 'add to que', 'searchRes4'+iterator);
                    document.getElementById('addToQueThisTrack'+iterator).addEventListener('click', () => {
                        addToQueNext(currentTrack);
                    })
                    createButton('addToPlaylistThisTrack'+iterator, 'navBtn2', 'add to playlist', 'searchRes4'+iterator);
                    document.getElementById('addToPlaylistThisTrack'+iterator).addEventListener('click', () => {
                        console.log(selectIdOnSearchTracks)
                        choosePlaylistToAddTrackTo(currentTrack, selectIdOnSearchTracks);
                    })

                    iterator++;
                    console.log(iterator)
                })
            })
            .catch(error => console.log('Request failed:', error))
    }
}

const searchBtn = document.getElementById('searchTermBtn');
searchBtn.addEventListener('click', updateTerm);

function clearSearchResults()
{
    const songContainer = document.getElementById('songs');
    while (songContainer.firstChild) 
    {
        songContainer.removeChild(songContainer.firstChild);
    }
}