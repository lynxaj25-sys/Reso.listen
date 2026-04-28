// 🎵 DATA
const musicData = [
  { name: "One Dance", artist: "Drake", album: "Views", img: "images/vv.jpg", audio: "audio/One Dance.mpeg.wav" },
  { name: "Shut It Down", artist: "Drake, ft. The Dream", album: "Thank Me Later", img: "images/tml.jpg", audio: "audio/Shut it down.mp3" },

  { name: "TV Off", artist: "Kendrick Lamar", album: "GNX", img: "images/download.jpg", audio: "audio/TV Off.mpeg.wav" },
  { name: "Luther", artist: "Kendrick Lamar, ft. SZA", album: "GNX", img: "images/download.jpg", audio: "audio/Luther.mpeg.wav" },

  { name: "Starboy", artist: "The Weeknd, ft. Daft Punk", album: "Starboy",img: "images/sar.jpg", audio: "audio/Wekend.mp3" },
  { name: "Given Up On Me", artist: "The Weeknd", album: "Hurry Up Tomorrow", img: "images/hut.jpg", audio: "audio/Giv.mp3" },

  { name: "Too Little Too Late", artist: "Laufey", album: "Bewitched", img: "images/be.jpg", audio: "audio/Too Little Too Late.mpeg.wav" },
  { name: "From The Start", artist: "Laufey", album: "Bewitched", img: "images/be.jpg", audio: "audio/From The Start.mpeg.wav" },

  { name: "Rendezvous", artist: "Don Toliver, ft Yeat", album: "Octane", img: "images/oc.jpg", audio: "audio/Rendezvous.mpeg.wav" },
  { name: "Tore Up", artist: "Don Toliver", album: "Hardstone Psycho", img: "images/tu.jpg", audio: "audio/Tore up.mpeg.wav" },

  { name: "Phantom", artist: "esdeekid, ft. Rico Ace", album: "Rebel", img: "images/cm.png", audio: "audio/Phantom.wav" },
  { name: "Cali Man", artist: "esdeekid, ft. Rico Ace", album: "Rebel", img: "images/cm.png", audio: "audio/Cali Man.mpeg.wav" }
  ];

// 🎯 ELEMENTS
const player = document.getElementById("player");
const audio = document.getElementById("audio");

const recentContainer = document.getElementById("recent-container");
const trendingContainer = document.getElementById("trending-container");
const newContainer = document.getElementById("new-container");

const equalizer = document.querySelector(".equalizer");

// 🎨 GET AVERAGE COLOR FROM IMAGE
function getAverageColor(img) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0);

  const data = ctx.getImageData(0, 0, img.width, img.height).data;

  let r = 0, g = 0, b = 0, count = 0;

  for (let i = 0; i < data.length; i += 20) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  return `rgb(${Math.floor(r/count)}, ${Math.floor(g/count)}, ${Math.floor(b/count)})`;
}

// 🎴 CREATE CARD
function createCard(song) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${song.img}">
    <div class="info">
      <h3>${song.name}</h3>
      <p>${song.artist}</p>
      <span>${song.album}</span>
    </div>
  `;

  card.addEventListener("click", () => {
    // OPEN PLAYER
    player.classList.remove("hidden");

    setTimeout(() => {
      player.classList.add("active");
    }, 10);

    document.body.classList.add("player-open");

    // UPDATE CONTENT
    document.getElementById("player-img").src = song.img;
    document.getElementById("player-title").innerText = song.name;
    document.getElementById("player-artist").innerText = song.artist;
    document.getElementById("player-album").innerText = song.album;

    audio.src = song.audio;
    audio.play();

    // 🎨 COLOR SYNC
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = song.img;

    img.onload = () => {
      const color = getAverageColor(img);

      document.querySelectorAll(".equalizer span").forEach(bar => {
        bar.style.background = color;
      });
    };
  });

  return card;
}

// 📦 DISTRIBUTE SONGS INTO SECTIONS
musicData.forEach((song, index) => {
  const card = createCard(song);

  if (index < 4) {
    recentContainer.appendChild(card);
  } else if (index < 8) {
    trendingContainer.appendChild(card);
  } else {
    newContainer.appendChild(card);
  }
});

// ❌ CLOSE PLAYER
document.getElementById("close").addEventListener("click", () => {
  player.classList.remove("active");

  setTimeout(() => {
    player.classList.add("hidden");
  }, 400);

  document.body.classList.remove("player-open");

  audio.pause();
});

// 🎶 EQUALIZER VISIBILITY
audio.addEventListener("play", () => {
  equalizer.style.opacity = "1";
});

audio.addEventListener("pause", () => {
  equalizer.style.opacity = "0.3";
});
// ⚡ LOADING + BOOT SEQUENCE
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");

    document.body.classList.add("loaded");
  }, 2500); // matches loading bar
});