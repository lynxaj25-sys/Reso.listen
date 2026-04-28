// 🔁 RESPONSIVE DEVICE MODE
function setDeviceMode() {
  const isMobile = window.innerWidth <= 768;

  document.body.classList.remove("mobile", "desktop");
  document.body.classList.add(isMobile ? "mobile" : "desktop");
}
setDeviceMode();
window.addEventListener("resize", setDeviceMode);


// 🎵 DATA
const musicData = [
  { name: "One Dance", artist: "Drake", album: "Views", img: "images/vv.jpg", audio: "audio/One Dance.mpeg.wav" },
  { name: "Shut It Down", artist: "Drake, ft. The Dream", album: "Thank Me Later", img: "images/tml.jpg", audio: "audio/Shut it down.mp3" },

  { name: "TV Off", artist: "Kendrick Lamar", album: "GNX", img: "images/download.jpg", audio: "audio/TV Off.mpeg.wav" },
  { name: "Luther", artist: "Kendrick Lamar, ft. SZA", album: "GNX", img: "images/download.jpg", audio: "audio/Luther.mpeg.wav" },

  { name: "Starboy", artist: "The Weeknd, ft. Daft Punk", album: "Starboy", img: "images/sar.jpg", audio: "audio/Wekend.mp3" },
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

const container = document.getElementById("music-container"); // ⭐ OLD ROW
const recentContainer = document.getElementById("recent-container");
const trendingContainer = document.getElementById("trending-container");
const newContainer = document.getElementById("new-container");

const equalizer = document.querySelector(".equalizer");
const mini = document.getElementById("mini-player");


// 🎨 COLOR PICK
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


// 🎵 PLAY FUNCTION
function playSong(song) {
  player.classList.remove("hidden");
  setTimeout(() => player.classList.add("active"), 10);

  document.body.classList.add("player-open");

  document.getElementById("player-img").src = song.img;
  document.getElementById("player-title").innerText = song.name;
  document.getElementById("player-artist").innerText = song.artist;
  document.getElementById("player-album").innerText = song.album;

  audio.src = song.audio;
  audio.play();

  // MINI PLAYER
  document.getElementById("mini-img").src = song.img;
  document.getElementById("mini-title").innerText = song.name;
  document.getElementById("mini-artist").innerText = song.artist;
  mini.classList.remove("hidden");

  // COLOR SYNC
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = song.img;

  img.onload = () => {
    const color = getAverageColor(img);

    document.querySelectorAll(".equalizer span").forEach(bar => {
      bar.style.background = color;
    });
  };
}


// 🎴 CREATE CARD
function createCard(song) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="img-wrap">
      <img src="${song.img}">
      <div class="play-btn">▶</div>
    </div>
    <h3>${song.name}</h3>
    <p>${song.artist}</p>
  `;

  const playBtn = card.querySelector(".play-btn");

  function handlePlay(e) {
    e?.stopPropagation();
    playSong(song);
  }

  playBtn.onclick = handlePlay;

  card.onclick = () => {
    if (document.body.classList.contains("desktop")) {
      handlePlay();
    }
  };

  return card;
}


// 📦 RENDER SONGS

musicData.forEach((song, index) => {
  const card = createCard(song);

  // ⭐ OLD STYLE ROW (ALL SONGS)
  if (container) container.appendChild(card.cloneNode(true));

  // 🎧 SECTIONS
  if (index < 4) recentContainer.appendChild(card);
  else if (index < 8) trendingContainer.appendChild(card);
  else newContainer.appendChild(card);
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


// 🎶 MINI PLAYER
document.getElementById("mini-play").onclick = () => {
  if (audio.paused) audio.play();
  else audio.pause();
};


// 🎶 EQUALIZER
audio.addEventListener("play", () => {
  equalizer.style.opacity = "1";
});

audio.addEventListener("pause", () => {
  equalizer.style.opacity = "0.3";
});


// ⚡ LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.add("loaded");
  }, 2500);
});


// 🌌 PARTICLES
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({ length: 50 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    p.y -= 0.2;
    if (p.y < 0) p.y = canvas.height;
  });

  requestAnimationFrame(draw);
}

draw();
const intro = document.getElementById("logo-intro");

setTimeout(() => {
  intro.classList.add("hide");
}, 2200);
