import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  speed?: number;
  delay?: number;
  autoStart?: boolean;
  wordByWord?: boolean;
}

export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 50, delay = 0, autoStart = true, wordByWord = false } = options;
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!autoStart) return;

    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      setIsTyping(true);
      setIsComplete(false);
      setDisplayText('');
      currentIndex = 0;

      if (wordByWord) {
        // Escribir palabra por palabra
        const words = text.split(' ');
        let wordIndex = 0;

        const typeNextWord = () => {
          if (wordIndex < words.length) {
            const currentWords = words.slice(0, wordIndex + 1);
            setDisplayText(currentWords.join(' '));
            wordIndex++;
            timeoutId = setTimeout(typeNextWord, speed);
          } else {
            setIsTyping(false);
            setIsComplete(true);
          }
        };

        timeoutId = setTimeout(typeNextWord, delay);
      } else {
        // Escribir carácter por carácter (comportamiento original)
        const typeNextChar = () => {
          if (currentIndex < text.length) {
            setDisplayText(text.slice(0, currentIndex + 1));
            currentIndex++;
            timeoutId = setTimeout(typeNextChar, speed);
          } else {
            setIsTyping(false);
            setIsComplete(true);
          }
        };

        timeoutId = setTimeout(typeNextChar, delay);
      }
    };

    startTyping();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed, delay, autoStart, wordByWord]);

  return { displayText, isTyping, isComplete };
}
