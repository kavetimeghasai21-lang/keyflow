import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordKeyPress } from '../redux/typingSlice';
import { KEY_FINGER_MAPPING } from '../constants/keyConfig';
import { soundFx } from '../utils/audio';

export const TypingArea = ({ onKeyPressFeedback }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { drillText, currentIndex, charHistory, status, soundEnabled } = useSelector(
    (state) => state.typing
  );

  const currentTargetChar = drillText[currentIndex] || '';
  const currentFinger = KEY_FINGER_MAPPING[currentTargetChar] || KEY_FINGER_MAPPING[' '];

  // Auto-focus the typing container
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [status]);

  const handleKeyDown = (e) => {
    // Ignore meta keys, Alt, Ctrl, Tab etc.
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Tab') {
      e.preventDefault();
      return;
    }

    if (e.key.length === 1 || e.key === ' ') {
      e.preventDefault();
      const pressedChar = e.key.toLowerCase();
      const isCorrect = pressedChar === currentTargetChar;

      // Play audio feedback
      if (soundEnabled) {
        soundFx.playKeypress(isCorrect);
      }

      onKeyPressFeedback(pressedChar);
      dispatch(recordKeyPress(pressedChar));
    }
  };

  // Slice drill stream for performance and clean display (show current window of 40 chars)
  const windowStart = Math.max(0, currentIndex - 15);
  const windowEnd = Math.min(drillText.length, currentIndex + 30);
  const visibleChars = drillText.slice(windowStart, windowEnd).split('');

  return (
    <div
      ref={inputRef}
      className="typing-box glass-panel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="focus-notice">
        <span>Click inside or start typing (a s d f j k l ; or space)</span>
      </div>

      <div className="words-stream">
        {visibleChars.map((char, index) => {
          const actualIndex = windowStart + index;
          let charClass = 'char';

          if (char === ' ') charClass += ' space';

          if (actualIndex < currentIndex) {
            const historyItem = charHistory[actualIndex];
            charClass += historyItem?.isCorrect ? ' correct' : ' incorrect';
          } else if (actualIndex === currentIndex) {
            charClass += ' current';
          } else {
            charClass += ' upcoming';
          }

          return (
            <span key={actualIndex} className={charClass}>
              {char === ' ' && actualIndex === currentIndex ? '␣' : char}
            </span>
          );
        })}
      </div>

      <div className="finger-hint-badge">
        <div className="finger-dot" style={{ backgroundColor: currentFinger?.hex || '#6366f1' }} />
        <span>Target Key: <strong>{currentTargetChar === ' ' ? 'SPACE' : currentTargetChar}</strong></span>
        <span>•</span>
        <span>Use: <strong>{currentFinger?.finger}</strong></span>
      </div>
    </div>
  );
};