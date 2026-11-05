import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { TypingArea } from './components/TypingArea';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { HandGuide } from './components/HandGuide';
import { ResultsModal } from './components/ResultsModal';
import { tickTimer, fetchNewDrillRequest } from './redux/typingSlice';
import './App.css';

export const App = () => {
  const dispatch = useDispatch();
  const { drillText, currentIndex, status } = useSelector((state) => state.typing);
  const [lastPressedKey, setLastPressedKey] = useState(null);

  // Initialize practice drill on mount via Redux-Saga
  useEffect(() => {
    dispatch(fetchNewDrillRequest());
  }, [dispatch]);

  // 1-Second practice timer loop (active when session starts)
  useEffect(() => {
    let interval = null;
    if (status === 'running') {
      interval = setInterval(() => {
        dispatch(tickTimer());
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status, dispatch]);

  const targetKey = drillText[currentIndex] || '';

  const handleKeyPressFeedback = (key) => {
    setLastPressedKey(key);
    setTimeout(() => setLastPressedKey(null), 150);
  };

  return (
    <div className="app-container">
      <Header />
      <StatsBar />
      <TypingArea onKeyPressFeedback={handleKeyPressFeedback} />
      <HandGuide targetKey={targetKey} />
      <VirtualKeyboard targetKey={targetKey} lastPressedKey={lastPressedKey} />
      {status === 'completed' && <ResultsModal />}
    </div>
  );
};

export default App;