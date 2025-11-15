// Playlist helper functions
function getPlaylists() {
  const data = localStorage.getItem('goDictPlaylists');
  return data ? JSON.parse(data) : {};
}

function savePlaylists(playlists) {
  localStorage.setItem('goDictPlaylists', JSON.stringify(playlists));
}

function addWordToPlaylist(playlistName, word) {
  const playlists = getPlaylists();
  if (!playlists[playlistName]) playlists[playlistName] = [];
  if (!playlists[playlistName].includes(word)) playlists[playlistName].push(word);
  savePlaylists(playlists);
  alert(`Added "${word}" to playlist "${playlistName}"`);
}

// Playlist page rendering
function renderPlaylists() {
  const container = document.getElementById('playlistsContainer');
  container.innerHTML = '';
  const playlists = getPlaylists();
  for (const name in playlists) {
    const div = document.createElement('div');
    div.className = 'playlist';
    div.innerHTML = `<h3>${name}</h3><p>${playlists[name].join(', ')}</p>`;
    container.appendChild(div);
  }
}

if (document.getElementById('createPlaylist')) {
  document.getElementById('createPlaylist').addEventListener('click', () => {
    const name = document.getElementById('newPlaylistName').value.trim();
    if (!name) return alert('Enter playlist name');
    const playlists = getPlaylists();
    if (playlists[name]) return alert('Playlist already exists');
    playlists[name] = [];
    savePlaylists(playlists);
    document.getElementById('newPlaylistName').value = '';
    renderPlaylists();
  });
}

if (document.getElementById('playlistsContainer')) renderPlaylists();
