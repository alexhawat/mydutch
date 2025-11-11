// Audio utilities for text-to-speech
let speechSynthesis = null;
let dutchVoice = null;

export const initAudio = () => {
  if (typeof window !== 'undefined') {
    speechSynthesis = window.speechSynthesis;

    // Load voices
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      // Try to find a Dutch voice
      dutchVoice = voices.find(voice => voice.lang.startsWith('nl'))
        || voices.find(voice => voice.lang.includes('NL'))
        || voices[0]; // Fallback to default voice
    };

    loadVoices();

    // Chrome loads voices asynchronously
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }
};

export const speak = (text, lang = 'nl-NL', rate = 0.9) => {
  if (!speechSynthesis) {
    console.warn('Speech synthesis not available');
    return;
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;

  if (dutchVoice) {
    utterance.voice = dutchVoice;
  }

  speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if (speechSynthesis) {
    speechSynthesis.cancel();
  }
};

export const getAvailableVoices = () => {
  if (!speechSynthesis) return [];
  return speechSynthesis.getVoices();
};

export const getDutchVoices = () => {
  if (!speechSynthesis) return [];
  return speechSynthesis.getVoices().filter(voice =>
    voice.lang.startsWith('nl') || voice.lang.includes('NL')
  );
};

// Initialize audio when module loads
if (typeof window !== 'undefined') {
  initAudio();
}
