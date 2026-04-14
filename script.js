(() => {
  const buttons = document.querySelectorAll("button[data-speak]");
  if (!buttons.length) {
    return;
  }

  const canSpeak = typeof window.speechSynthesis !== "undefined";

  if (!canSpeak) {
    buttons.forEach((button) => {
      button.disabled = true;
      button.title = "Speech playback is not supported in this browser";
    });
    return;
  }

  const speak = (text) => {
    if (!text) {
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      speak(button.dataset.speak || "");
    });
  });
})();
