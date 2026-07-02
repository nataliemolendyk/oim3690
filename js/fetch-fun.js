const output = document.getElementById('output');
const surpriseBtn = document.getElementById('surpriseBtn');
const pageTitle = document.getElementById('pageTitle');

function getRandomMode() {
  return Math.random() < 0.5 ? 'dog' : 'joke';
}

function updatePageText(mode) {
  pageTitle.textContent = mode === 'dog'
    ? 'Random Dog Image'
    : 'Random Programming Joke';
}

async function fetchCurrentItem(mode) {
  output.innerHTML = 'Loading...';

  try {
    const apiUrl = mode === 'dog'
      ? 'https://dog.ceo/api/breeds/image/random'
      : 'https://v2.jokeapi.dev/joke/Programming?type=single';

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (mode === 'dog') {
      const imageUrl = data.message;
      output.innerHTML = `<img src="${imageUrl}" alt="Random Dog" class="dog-image">`;
    } else {
      const joke = data.joke || 'No joke found.';
      output.innerHTML = `<p>${joke}</p>`;
    }

    updatePageText(mode);
  } catch (error) {
    output.innerHTML = `<p class="error">Unable to load content. ${error.message}</p>`;
    console.error('Fetch error:', error);
  }
}

function fetchSurpriseItem() {
  const mode = getRandomMode();
  fetchCurrentItem(mode);
}

surpriseBtn.addEventListener('click', fetchSurpriseItem);
