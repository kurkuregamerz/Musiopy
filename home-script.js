let song_mp3 = document.getElementById("song_mp3");
let play_btn = document.getElementById("play");
let next_btn = document.getElementById("next");
let previous_btn = document.getElementById("previous");
let previouslyplayed = [];
play_btn.addEventListener("click", () => {
  if (song_mp3.paused) {
    song_mp3.play();

    play_btn.style.backgroundImage =
      "url('Buttons/pause-removebg-preview.png')";
  } else {
    song_mp3.pause();

    play_btn.style.backgroundImage = "url('Buttons/play-removebg-preview.png')";
  }
});

previous_btn.addEventListener("click", () => {
  let song = document.querySelector(
    `[data-music-id-no="${previouslyplayed[previouslyplayed.length - 2]}"]`,
  );
  Nowplaying_img.style.backgroundImage =
    `url("` + song.getAttribute("data-song-image-url") + `")`;
  song_mp3.setAttribute("src", song.getAttribute("data-song-audio-url"));
  song_mp3.play();
  Song_Name_now.innerText = song.getAttribute("data-song-name");
  Song_Artist_now.innerText = song.getAttribute("data-song-artist-name");
  play_btn.style.backgroundImage = "url('Buttons/pause-removebg-preview.png')";
  previouslyplayed.push(song.getAttribute("data-music-id-no"));
});
next_btn.addEventListener("click", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let next_song = document.querySelector(
    '[data-music-id-no="' + getRandomInt(1, number_of_Musics) + '"]',
  );

  Nowplaying_img.style.backgroundImage =
    `url("` + next_song.getAttribute("data-song-image-url") + `")`;
  song_mp3.setAttribute("src", next_song.getAttribute("data-song-audio-url"));
  song_mp3.play();
  Song_Name_now.innerText = next_song.getAttribute("data-song-name");
  Song_Artist_now.innerText = next_song.getAttribute("data-song-artist-name");
  play_btn.style.backgroundImage = "url('Buttons/pause-removebg-preview.png')";
});

document.getElementById("song_mp3").addEventListener("playing", () => {
  event.preventDefault();
});
song_mp3.addEventListener("pause", () => {
  play_btn.style.backgroundImage = "url('Buttons/play-removebg-preview.png')";
});
song_mp3.addEventListener("timeupdate", () => {
  let progress = (song_mp3.currentTime / song_mp3.duration) * 100;
  document.getElementById("progress").style.width = progress + "%";
});
document.getElementById("progressbar").addEventListener("click", (e) => {
  const width = document.getElementById("progressbar").clientWidth;
  const clickX = e.offsetX;
  const duration = song_mp3.duration;
  song_mp3.currentTime = (clickX / width) * duration;
});

let list_music_container = document.getElementById("list-music-container");

let music_number_array = [];

function push_song(e) {
  let song_list_card = document.createElement("div");
  let song_list_image = document.createElement("div");
  let song_list_name = document.createElement("div");
  let song_list_artist = document.createElement("div");
  let song_list_duration = document.createElement("div");

  let Nowplaying_img = document.getElementById("Nowplaying_img");
  let song_list_play = document.createElement("button");
  let Song_Name_now = document.getElementById("Song_Name_now");
  let Song_Artist_now = document.getElementById("Song_Artist_now");

  song_list_card.classList.add("song_list_card");
  song_list_image.classList.add("song_list_image");
  song_list_play.classList.add("song_list_play");

  song_list_name.classList.add("song_list_name");
  song_list_artist.classList.add("song_list_artist");
  song_list_duration.classList.add("song_list_duration");

  song_list_play.addEventListener("click", () => {
    Nowplaying_img.style.backgroundImage = `url("` + e.song_image_url + `")`;
    song_mp3.setAttribute("src", e.song_audio_url);
    song_mp3.play();
    Song_Name_now.innerText = e.song_name;
    Song_Artist_now.innerText = e.artist_name;
    play_btn.style.backgroundImage =
      "url('Buttons/pause-removebg-preview.png')";
    previouslyplayed.push(song_list_card.getAttribute("data-music-id-no"));
    console.log(previouslyplayed);
  });

  song_list_card.setAttribute(
    "data-song-name-upp",
    e.song_name.toUpperCase().replace(/\s+/g, ""),
  );
  song_list_card.setAttribute("id", e.song_name);
  song_list_card.setAttribute("data-song-name", e.song_name);
  song_list_card.setAttribute("data-song-audio-url", e.song_audio_url);
  song_list_card.setAttribute("data-song-image-url", e.song_image_url);
  song_list_card.setAttribute("data-song-artist-name", e.artist_name);
  song_list_card.setAttribute(
    "data-song-artist-upp",
    e.artist_name.toUpperCase().replace(/\s+/g, ""),
  );
  song_list_card.setAttribute(
    "data-music-id-no",
    music_number_array.length + 1,
   ); 
  music_number_array.push(music_number_array.length);


  song_list_name.innerText = e.song_name;
  song_list_artist.innerText = e.artist_name;
  // song_list_duration.innerText = getAudioDuration(song_list_card);

  song_list_image.style.backgroundImage = `url("` + e.song_image_url + `")`;

  document.getElementById("list-music-container").append(song_list_card);
  document.getElementById(e.song_name).append(song_list_play);
  document.getElementById(e.song_name).append(song_list_image);
  document.getElementById(e.song_name).append(song_list_name);
  document.getElementById(e.song_name).append(song_list_artist);
  document.getElementById(e.song_name).append(song_list_duration);
}

let number_of_Musics = Musics_list.length;

for (i = 0; i < Musics_list.length; i++) {
  push_song(Musics_list[i]);
}

let search_result_container = document.createElement("div");
search_result_container.classList.add("search_result_container");
search_result_container.setAttribute("id", "search_result_container ");

document.getElementById("header-search").addEventListener("keydown", () => {
  document.getElementById("header-search-form").append(search_result_container);
  document.querySelector(".search_result_container").replaceChildren();
  let search_value = Array.from(
    document
      .getElementById("header-search")
      .value.toUpperCase()
      .replace(/\s+/g, ""),
  );

  for (let index = 1; index < music_number_array.length + 1; index++) {
    let rank = [];
    let checking_element = document.querySelector(
      '[data-music-id-no="' + index + '"]',
    );
    let data_songname_array = Array.from(
      checking_element.getAttribute("data-song-name-upp"),
    );

    for (i = 0; i < search_value.length; i++) {
      if (search_value[i] == data_songname_array[i]) {
        rank.push(1);
      } else if (search_value[i] == data_songname_array[i + 1]) {
        rank.push(1);
        i + 1;
      } else {
        rank.push(0);
      }
    }

    checking_element.setAttribute(
      "data-rank-search",
      rank.reduce((a, b) => a + b),
    );
  }

  for (let i = search_value.length; i > 1; i--) {
    const clonelement = document.querySelector(`[data-rank-search="${i}"]`);

    if (clonelement) {
      let cloned = search_result_container.appendChild(
        clonelement.cloneNode(true),
      );

      cloned.addEventListener("click", () => {
        Nowplaying_img.style.backgroundImage =
          `url("` + cloned.getAttribute("data-song-image-url") + `")`;
        song_mp3.setAttribute(
          "src",
          cloned.getAttribute("data-song-audio-url"),
        );
        song_mp3.play();
        Song_Name_now.innerText = cloned.getAttribute("data-song-name");
        Song_Artist_now.innerText = cloned.getAttribute(
          "data-song-artist-name",
        );
        play_btn.style.backgroundImage =
          "url('Buttons/pause-removebg-preview.png')";
        previouslyplayed.push(cloned.getAttribute("data-music-id-no"));
        console.log(previouslyplayed);
      });
    }
  }
});



document.getElementById("header-search").addEventListener("click", () => {
  if (document.querySelector("#search_result_container") == null) {
    document.body.addEventListener("click", () => {
      if (EventSource == document.getElementById("header-search")) {
        return null;
      } else if (
        EventSource == document.getElementById("search-result-container")
      ) {
        return null;
      } else {
        // document.querySelector(".search_result_container").replaceChildren();
        // document.querySelector(".search_result_container").remove();
      }
    });
  } else {
    document.body.removeEventListener("click");
    document.querySelector(".search_result_container").replaceChildren();
    document.querySelector(".search_result_container").remove();
  }
});
