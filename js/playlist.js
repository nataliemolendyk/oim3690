const songs = [
  { title: "A Few of Your Own", artist: "Noah Kahan" },
  { title: "Willing and Able", artist: "Noah Kahan" },
  { title: "Downfall", artist: "Noah Kahan" },
  { title: "Haircut", artist: "Noah Kahan" },
  { title: "Staying Still", artist: "Noah Kahan" },
  { title: "Stick Season (Remix)", artist: "Noah Kahan" },
  { title: "Dial Drunk (Remix)", artist: "Noah Kahan" }
];

const playlistEl = document.getElementById("playlist");
const songInput = document.getElementById("songInput");
const addBtn = document.getElementById("addBtn");

function renderPlaylist() {
  playlistEl.innerHTML = "";

  for (let i = 0; i < songs.length; i++) {
    const li = document.createElement("li");
    li.textContent = `${songs[i].title} — ${songs[i].artist}`;

    if (songs[i].title.includes("Remix")) {
      li.classList.add("remix");
    }

    playlistEl.appendChild(li);
  }
}

addBtn.addEventListener("click", function () {
  const title = songInput.value.trim();
  if (title === "") return;

  songs.push({ title: title, artist: "Unknown Artist" });
  songInput.value = "";
  renderPlaylist();
});

renderPlaylist();
