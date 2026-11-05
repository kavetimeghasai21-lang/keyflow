import { useDispatch, useSelector } from 'react-redux';
import { Keyboard, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { toggleSound, resetPractice, fetchNewDrillRequest, setLessonLevel } from '../redux/typingSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const { soundEnabled, lessonLevel } = useSelector((state) => state.typing);

  const handleLevelChange = (level) => {
    dispatch(setLessonLevel(level));
    dispatch(fetchNewDrillRequest());
  };

  return (
    <header className="header glass-panel">
      <div className="logo-group">
        <div className="logo-icon">
          <Keyboard size={28} />
        </div>
        <div className="title-area">
          <h1>TypeFlow</h1>
          <p>Touch Typing Practice • 8 Home Row Keys (a s d f j k l ;)</p>
        </div>
      </div>

      <div className="controls-group">
        <button
          className={`control-btn ${lessonLevel === 'basic' ? 'active' : ''}`}
          onClick={() => handleLevelChange('basic')}
          title="Raw key combinations"
        >
          Basic Drill
        </button>
        <button
          className={`control-btn ${lessonLevel === 'words' ? 'active' : ''}`}
          onClick={() => handleLevelChange('words')}
          title="Words & N-Grams"
        >
          <Sparkles size={16} /> Words
        </button>

        <button
          className="control-btn"
          onClick={() => dispatch(toggleSound())}
          title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button
          className="control-btn"
          onClick={() => dispatch(resetPractice())}
          title="Reset 5-Minute Practice"
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </header>
  );
};