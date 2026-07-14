(function () {
  'use strict';

  /* =========================================================
     🌙  DARK MODE TOGGLE  (with localStorage persistence)
     ========================================================= */
  const body = document.body;
  const toggleBtn = document.getElementById('darkToggle');

  if (toggleBtn) {
    const STORAGE_KEY = 'darkMode';

    // Apply saved preference on load
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') body.classList.add('dark');

    function updateLabel() {
      const isDark = body.classList.contains('dark');
      toggleBtn.textContent = isDark
        ? '☀️  Switch to Light Mode'
        : '🌙  Switch to Dark Mode';
    }
    updateLabel();

    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem(STORAGE_KEY, body.classList.contains('dark'));
      updateLabel();
    });
  }

  /* =========================================================
     ⏱  COUNTDOWN TIMER
     ========================================================= */
  let countdownInterval = null;

  const countdownInput = document.getElementById('countdownInput');
  const countdownStart = document.getElementById('countdownStartBtn');
  const countdownReset = document.getElementById('countdownResetBtn');
  const countdownDisp  = document.getElementById('countdownDisplay');

  function stopCountdown() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  if (countdownStart && countdownInput && countdownDisp) {
    countdownStart.addEventListener('click', () => {
      stopCountdown();

      let remaining = parseInt(countdownInput.value, 10);
      if (isNaN(remaining) || remaining < 1) remaining = 1;

      countdownDisp.textContent = remaining;

      countdownInterval = setInterval(() => {
        remaining -= 1;
        countdownDisp.textContent = remaining;

        if (remaining <= 0) {
          stopCountdown();
        }
      }, 1000);
    });
  }

  if (countdownReset && countdownInput && countdownDisp) {
    countdownReset.addEventListener('click', () => {
      stopCountdown();
      countdownDisp.textContent = countdownInput.value || '0';
    });
  }

  /* =========================================================
     🔊  SPEECH SYNTHESIS (Text‑to‑Speech)
     ========================================================= */
  const ttsTextarea = document.getElementById('ttsText');
  const ttsPlayBtn  = document.getElementById('ttsPlayBtn');
  const ttsStopBtn  = document.getElementById('ttsStopBtn');

  if (ttsPlayBtn && ttsTextarea) {
    ttsPlayBtn.addEventListener('click', () => {
      window.speechSynthesis.cancel();

      const text = ttsTextarea.value.trim();
      if (!text) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const preferred = voices.find(
          v => v.lang.startsWith('en') && v.name.includes('Female')
        );
        utterance.voice = preferred || voices[0];
      }

      window.speechSynthesis.speak(utterance);
    });
  }

  if (ttsStopBtn) {
    ttsStopBtn.addEventListener('click', () => {
      window.speechSynthesis.cancel();
    });
  }

})();