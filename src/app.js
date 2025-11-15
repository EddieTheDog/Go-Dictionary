// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('Service Worker Registered'));
}

// Detect if app is standalone
function checkInstall() {
  let installMsg = document.getElementById('install-msg');
  if (window.matchMedia('(display-mode: standalone)').matches) {
    installMsg.textContent = '';
  } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    installMsg.textContent = 'Install Go Dictionary: Tap Share → Add to Home Screen';
  } else if (/Android/.test(navigator.userAgent)) {
    installMsg.textContent = 'Install Go Dictionary: Tap Menu → Add to Home Screen';
  }
}
checkInstall();

// Search button event
document.getElementById('searchBtn').addEventListener('click', async () => {
  const word = document.getElementById('searchWord').value.trim();
  if (!word) return;
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Searching...';
  try {
    const data = await getWord(word); // from dictionary.js
    displayWordResult(data, resultDiv); // from dictionary.js
  } catch (err) {
    resultDiv.innerHTML = 'Word not found.';
  }
});

// View playlists
document.getElementById('viewPlaylists').addEventListener('click', () => {
  window.location.href = 'playlist.html';
});
