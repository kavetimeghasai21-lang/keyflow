import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Award, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { resetPractice, fetchNewDrillRequest } from '../redux/typingSlice';

export const ResultsModal = () => {
  const dispatch = useDispatch();
  const { totalKeysPressed, correctKeysPressed, incorrectKeysPressed, durationSeconds } = useSelector(
    (state) => state.typing
  );

  useEffect(() => {
    // Launch celebratory confetti when 5-min session completes
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  const accuracy = totalKeysPressed > 0
    ? ((correctKeysPressed / totalKeysPressed) * 100).toFixed(1)
    : '0';

  const wpm = Math.round((correctKeysPressed / 5) / (durationSeconds / 60));

  const handlePlayAgain = () => {
    dispatch(resetPractice());
    dispatch(fetchNewDrillRequest());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '16px', borderRadius: '50%', color: '#818cf8' }}>
          <Award size={48} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>5-Minute Session Complete!</h2>
          <p style={{ color: '#94a3b8', marginTop: '6px' }}>
            Great effort building home row touch typing muscle memory.
          </p>
        </div>

        <div className="results-grid">
          <div className="result-metric">
            <div className="label">Total Keys Pressed</div>
            <div className="value" style={{ color: '#38bdf8' }}>{totalKeysPressed}</div>
          </div>

          <div className="result-metric">
            <div className="label">Accuracy</div>
            <div className="value" style={{ color: '#34d399' }}>{accuracy}%</div>
          </div>

          <div className="result-metric">
            <div className="label">Words Per Minute</div>
            <div className="value" style={{ color: '#fbbf24' }}>{wpm} WPM</div>
          </div>

          <div className="result-metric">
            <div className="label">Mistakes</div>
            <div className="value" style={{ color: '#f87171' }}>{incorrectKeysPressed}</div>
          </div>
        </div>

        <button className="btn-primary" onClick={handlePlayAgain}>
          <RotateCcw size={18} /> Practice Again (5 Mins)
        </button>
      </div>
    </div>
  );
};