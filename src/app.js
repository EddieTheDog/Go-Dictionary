// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => console.log('Service Worker registered'));
  });
}

// Detect if app is running as standalone (home screen)
function checkInstall() {
  const installMsg = document.getElementById('install-msg');

  // Standalone detection for iOS and Android
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  if (!isStandalone) {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      installMsg.textContent = 'Install Go Dictionary: Tap Share → Add to Home Screen';
    } else if (/Android/.test(navigator.userAgent)) {
      installMsg.textContent = 'Install Go Dictionary: Tap Menu → Add to Home Screen';
    } else {
      installMsg.textContent = 'Open this site on your phone to install as an app.';
    }
  } else {
    installMsg.textContent = ''; // hide instructions if running standalone
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
