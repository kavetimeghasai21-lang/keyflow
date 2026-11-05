import { useSelector } from 'react-redux';
import { Timer, Hash, Percent, Zap } from 'lucide-react';

export const StatsBar = () => {
  const { timeRemaining, totalKeysPressed, correctKeysPressed, durationSeconds } = useSelector(
    (state) => state.typing
  );

  // Format 5 minutes countdown MM:SS
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Real-time Accuracy %
  const accuracy = totalKeysPressed > 0
    ? ((correctKeysPressed / totalKeysPressed) * 100).toFixed(1)
    : '100.0';

  // Live Keys Per Minute (KPM)
  const timeElapsed = durationSeconds - timeRemaining;
  const kpm = timeElapsed > 0 ? Math.round((totalKeysPressed / timeElapsed) * 60) : 0;

  return (
    <div className="stats-bar">
      <div className="stat-card glass-panel">
        <div className="stat-icon timer">
          <Timer size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-label">5-Min Practice</div>
          <div className="stat-value">{formattedTime}</div>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon keys">
          <Hash size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-label">Keys Pressed</div>
          <div className="stat-value">{totalKeysPressed}</div>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon accuracy">
          <Percent size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-label">Accuracy</div>
          <div className="stat-value">{accuracy}%</div>
        </div>
      </div>

      <div className="stat-card glass-panel">
        <div className="stat-icon speed">
          <Zap size={24} />
        </div>
        <div className="stat-info">
          <div className="stat-label">Speed (KPM)</div>
          <div className="stat-value">{kpm}</div>
        </div>
      </div>
    </div>
  );
};