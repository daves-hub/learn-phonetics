(() => {
  // ─── Tab navigation ──────────────────────────────────────────
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('aria-controls');

      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // ─── Speech synthesis ─────────────────────────────────────────
  const buttons = document.querySelectorAll('button[data-speak]');
  if (!buttons.length) return;

  const canSpeak = typeof window.speechSynthesis !== 'undefined';

  if (!canSpeak) {
    buttons.forEach((btn) => {
      btn.disabled = true;
      btn.title = 'Speech playback is not supported in this browser.';
    });
    return;
  }

  /** Speak a word using the Web Speech API */
  const speak = (text, btn) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.85;
    utterance.pitch = 1;

    btn.classList.add('playing');
    btn.disabled = true;

    utterance.onend = () => {
      btn.classList.remove('playing');
      btn.disabled = false;
    };
    utterance.onerror = () => {
      btn.classList.remove('playing');
      btn.disabled = false;
    };

    window.speechSynthesis.speak(utterance);
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      speak(btn.dataset.speak || '', btn);
    });
  });
})();
