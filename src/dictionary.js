// Fetch word from DictionaryAPI.dev
async function getWord(word) {
  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await res.json();
  if (!data || data.title === 'No Definitions Found') throw new Error('Word not found');
  return data[0];
}

// Display word result
function displayWordResult(data, container) {
  container.innerHTML = '';
  const word = data.word;
  const meanings = data.meanings || [];
  
  const wordTitle = document.createElement('h2');
  wordTitle.textContent = word;
  container.appendChild(wordTitle);

  meanings.forEach(meaning => {
    const part = document.createElement('h4');
    part.textContent = meaning.partOfSpeech;
    container.appendChild(part);
    meaning.definitions.forEach(def => {
      const defEl = document.createElement('p');
      defEl.textContent = def.definition;
      container.appendChild(defEl);

      if (def.example) {
        const exEl = document.createElement('em');
        exEl.textContent = `"${def.example}"`;
        container.appendChild(exEl);
      }
    });
  });

  // Add to playlist button
  const addBtn = document.createElement('button');
  addBtn.textContent = 'Add to Playlist';
  addBtn.addEventListener('click', () => {
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) addWordToPlaylist(playlistName, word); // from playlist.js
  });
  container.appendChild(addBtn);
}
