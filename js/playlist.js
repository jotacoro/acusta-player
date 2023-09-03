const songFileNames = ["Artist - Song Name A_acusta.mp3", "Artist - Song Name A_original.mp3", "Artist - Song Name B_original.mp3", "Artist - Song Name B_acusta.mp3", "Artist - Song Name C_acusta.mp3", "Artist - Song Name C_original.mp3"]; //this is the data we will work with after getting the filenames from a folder

function getSongNames() {
    const songNames = [];
    
    for (const fileName of songFileNames) {
        const parts = fileName.split('_'); // Split the file name by underscores
        const songTitle = parts[0]; // The song title is the first part before the underscore
        
        if (!songNames.includes(songTitle)) {
            songNames.push(songTitle); // Add the song title to the array if it's not already there
        }
    }
    
    return songNames;
}

function setSongListAttributes(element, attributes) {
    for(var key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function generateSongButtons() {
    const songNames = getSongNames();
    songNames.forEach((songName) => {
        const listItem = document.createElement("li");

        const playSongButton = document.createElement("button");
        playSongButton.innerHTML = songName;
        
        setSongListAttributes(listItem, {"id": `${songName}__listItem`, "class": 'playlist__item'})
        setSongListAttributes(playSongButton, {"id": `${songName}__playButton`, "class": 'playSong__button'})

        listItem.appendChild(playSongButton);
        playlist.appendChild(listItem);
    })
}

function generatePlaylistElements() {
    const playlist = document.getElementById("playlist");
    // Clear the existing playlist
    playlist.innerHTML = '';

    generateSongButtons();
  }
  
  generatePlaylistElements();
