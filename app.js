const songData = [
  {
    author_name: "Cosmo Sheldrake",
    song_name: "Lost in the City Lights",
    song_image_url: "./images/cover-1.png",
    song_audio_url: "./sound/lost-in-city-lights-145038.mp3",
    is_current_selected_song: true,
  },
  {
    author_name: "Lesfm",
    song_name: "Forest Lullaby",
    song_image_url: "./images/cover-2.png",
    song_audio_url: "./sound/forest-lullaby-110624.mp3",
    is_current_selected_song: false,
  },
];
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".player-play-btn");
  const pauseIcon = playButton.querySelector(".player-icon-pause");
  const progressFilled = document.querySelector(".player-progress-filled");
  const playIcon = playButton.querySelector(".player-icon-play");
  const playerDuration = document.querySelector(".player-time-duration");
  const restSongState = (duration) => {
    // playButton.dataset.playing = "false";
    pauseIcon.classList.add("hidden");
    playIcon.classList.remove("hidden");
    progressFilled.style.flexBasis = "0%";
    // console.log(duration);
    playerDuration.textContent = new Date(duration * 1000)
      .toISOString()
      .substr(14, 5);
  };
  function changeAudioSource(src) {
    const audioElement = document.querySelector("audio");
    audioElement.src = src;
    audioElement.load();

    // Wait for the metadata to be loaded
    audioElement.addEventListener("loadedmetadata", () => {
      // console.log(`Duration: ${audioElement.duration} seconds`);
      restSongState(audioElement.duration);
    });
  }
  // set defualt value for current song is the frist one in the song data.
  let song_nameEL = document.getElementById("song_name");
  song_nameEL.textContent = songData[0].song_name;
  let song_authorEL = document.getElementById("song_author");
  song_authorEL.textContent = songData[0].author_name;
  let song_imgEL = document.getElementById("song_img");
  song_imgEL.setAttribute("src", songData[0].song_image_url);
  let song_audioEL = document.getElementById("song_audio");
  song_audioEL.setAttribute("src", songData[0].song_audio_url);
  // get the button for next, and previous
  let buttons_change_songEL = document.querySelectorAll(
    '[data-button="next-prev-button"]'
  );
  // add event lisner if click on prev or next to change the song
  buttons_change_songEL.forEach((button_change_songEL) => {
    button_change_songEL.addEventListener("click", function () {
      changeSonge(song_nameEL, song_authorEL, song_imgEL, song_audioEL);
    });
  });

  const changeSonge = (
    song_nameEL,
    song_authorEL,
    song_imgEL,
    song_audioEL
  ) => {
    for (const songD of songData) {
      if (!songD.is_current_selected_song) {
        song_nameEL.textContent = songD.song_name;
        song_authorEL.textContent = songD.author_name;
        song_imgEL.setAttribute("src", songD.song_image_url);
        // song_audioEL.setAttribute('src',songD.song_audio_url);
        songD.is_current_selected_song = true;
        changeAudioSource(songD.song_audio_url);
      } else {
        songD.is_current_selected_song = false;
      }
    }
  };
});
