const audioPlayer = document.getElementById('audioPlayer');
        const playPauseButton = document.getElementById('playPauseButton');
        const nextButton = document.getElementById('nextButton');
        const previousButton = document.getElementById('previousButton');
        const volumeSlider = document.getElementById('volumeSlider');
        const currentSongDisplay = document.getElementById('currentSong');
        const togglePlaylistButton = document.getElementById('togglePlaylistButton');
        const playlist = document.getElementById('playlist');
        const songList = document.getElementById('songList');

        const songs = [
            'sound/Ako Naman Muna - Angela Ken (Lyric Video Visualizer).mp3',
            'sound/Calein - Umaasa (Official Lyric Video).mp3',
            'sound/Cup of Joe - Patutunguhan (Lyrics).mp3',
            'sound/Cup of Joe, Janine Teñoso  - Tingin (Official Lyric Video).mp3',
            'sound/Eliza Maturan - Museo (Lyrics).mp3',
            'sound/Estranghero.mp3',
            'sound/Higa.mp3',
            'sound/Hulaan by Janine (Lyrics).mp3',
            'sound/I Belong to the Zoo - Balang Araw (Official Lyric Video).mp3',
            'sound/Janice - Dilaw (Lyrics).mp3',
            'sound/Magnus Haven - Imahe (Official Music Video).mp3',
            'sound/Maki - Bakit_ (Official Lyric Video).mp3',
            'sound/Maki - Dilaw (Lyrics).mp3',
            'sound/Misteryoso - Cup of Joe (Official Lyric Video).mp3',
            'sound/Munimuni - Bawat Piyesa (Official Lyric Video).mp3',
            'sound/Nag-iisang Muli - Cup of Joe [Official Lyric Video].mp3',
            'sound/NOBITA - IKAW LANG  Official Lyric Video.mp3',
            'sound/OO - Up Dharma Down (Official Lyric Video).mp3',
            'sound/Over October - Ikot (Official Lyric Video).mp3',
            'sound/Sam Smith - Im Not The Only One (Official Music Video).mp3',
            'sound/Sam Smith - Lay Me Down (Official Music Video).mp3',
            'sound/Sam Smith - Stay With Me (Lyrics).mp3',
            'sound/Sam Smith - Too Good At Goodbyes.mp3',
            'sound/Sugarfree - Burnout - (Official Lyric Video).mp3',
            'sound/Tadhana - Up Dharma Down [Lyrics] [1080p].mp3',
            'sound/TONEEJAY - Aurora (Official Music Video).mp3',
            'sound/Unti unti - Up Dharma Down (Lyrics).mp3'
        ];

        const songTitles = [
            'Ako Naman Muna - Angela Ken (Lyric Video Visualizer)',
            'Calein - Umaasa (Official Lyric Video)',
            'Cup of Joe - Patutunguhan (Lyrics)',
            'Cup of Joe, Janine Teñoso - Tingin (Official Lyric Video)',
            'Eliza Maturan - Museo (Lyrics)',
            'Estranghero',
            'Higa',
            'Hulaan by Janine (Lyrics)',
            'I Belong to the Zoo - Balang Araw (Official Lyric Video)',
            'Janice - Dilaw (Lyrics)',
            'Magnus Haven - Imahe (Official Music Video)',
            'Maki - Bakit (Official Lyric Video)',
            'Maki - Dilaw (Lyrics)',
            'Misteryoso - Cup of Joe (Official Lyric Video)',
            'Munimuni - Bawat Piyesa (Official Lyric Video)',
            'Nag-iisang Muli - Cup of Joe (Official Lyric Video)',
            'NOBITA - IKAW LANG (Official Lyric Video)',
            'OO - Up Dharma Down (Official Lyric Video)',
            'Over October - Ikot (Official Lyric Video)',
            'Sam Smith - I’m Not The Only One (Official Music Video)',
            'Sam Smith - Lay Me Down (Official Music Video)',
            'Sam Smith - Stay With Me (Lyrics)',
            'Sam Smith - Too Good At Goodbyes',
            'Sugafree - Burnout (Official Lyric Video)',
            'Tadhana - Up Dharma Down [Lyrics] (1080p)',
            'TONEEJAY - Aurora (Official Music Video)',
            'Unti unti - Up Dharma Down (Lyrics)'
        ];

        let currentSongIndex = localStorage.getItem('currentSongIndex') ? parseInt(localStorage.getItem('currentSongIndex')) : 0;
        let currentTime = localStorage.getItem('currentTime') ? parseFloat(localStorage.getItem('currentTime')) : 0;

        audioPlayer.src = songs[currentSongIndex];
        audioPlayer.currentTime = currentTime;
        currentSongDisplay.textContent = `Now Playing: ${songTitles[currentSongIndex]}`;

        playPauseButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseButton.textContent = "Pause";
            } else {
                audioPlayer.pause();
                playPauseButton.textContent = "Play";
            }
        });

        volumeSlider.addEventListener('input', () => audioPlayer.volume = volumeSlider.value);

        audioPlayer.addEventListener('ended', () => {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            audioPlayer.src = songs[currentSongIndex];
            audioPlayer.currentTime = 0;
            currentSongDisplay.textContent = `Now Playing: ${songTitles[currentSongIndex]}`;
            audioPlayer.play();
            playPauseButton.textContent = "Pause";
            saveState();
        });

        audioPlayer.addEventListener('timeupdate', saveState);

        togglePlaylistButton.addEventListener('click', () => {
            if (playlist.style.display === 'none') {
                playlist.style.display = 'block';
                togglePlaylistButton.textContent = 'Hide Playlist';
            } else {
                playlist.style.display = 'none';
                togglePlaylistButton.textContent = 'Show Playlist';
            }
        });

        songTitles.forEach((title, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = title;
            listItem.addEventListener('click', () => {
                currentSongIndex = index;
                audioPlayer.src = songs[currentSongIndex];
                audioPlayer.currentTime = 0;
                currentSongDisplay.textContent = `Now Playing: ${songTitles[currentSongIndex]}`;
                audioPlayer.play();
                playPauseButton.textContent = "Pause";
                saveState();
                highlightCurrentSong();
            });
            songList.appendChild(listItem);
        });

        function saveState() {
            localStorage.setItem('currentSongIndex', currentSongIndex);
            localStorage.setItem('currentTime', audioPlayer.currentTime);
        }
        volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
    document.getElementById('volumeDisplay').textContent = `Volume: ${Math.round(volumeSlider.value * 100)}%`;
});
audioPlayer.addEventListener('timeupdate', () => {
    const progressBar = document.getElementById('progressBar');
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

function highlightCurrentSong() {
    // Remove highlight from all songs
    const allSongs = document.querySelectorAll('#songList li');
    allSongs.forEach(song => song.classList.remove('active-song'));

    // Highlight the current song
    allSongs[currentSongIndex].classList.add('active-song');
}

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audioPlayer.src = songs[currentSongIndex];
    currentSongDisplay.textContent = `Now Playing: ${songTitles[currentSongIndex]}`;
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
    highlightCurrentSong(); // Highlight the new song
});

previousButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audioPlayer.src = songs[currentSongIndex];
    currentSongDisplay.textContent = `Now Playing: ${songTitles[currentSongIndex]}`;
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
    highlightCurrentSong(); // Highlight the previous song
});

// Highlight the song on page load
highlightCurrentSong();