import React, { useState, useEffect } from 'react';
import './App.css';

const strategies = [
  'Take a Break'
];

const breakActivities = [
  'Take a walk around the block',
  'Do 10 jumping jacks',
  'Listen to your favorite song',
  'Draw doodles on a piece of paper',
  'Look out the window and observe something new',
  'Do some deep breathing exercises',
  'Stretch your arms and shoulders',
  'Make yourself a cup of tea or coffee',
  'Call a friend and have a quick chat',
  'Write down three things you\'re grateful for',
  'Do a quick meditation',
  'Organize your desk or workspace',
  'Read a page from a book',
  'Take some photos of interesting things around you',
  'Practice a few dance moves'
];

function App() {
  const [currentStrategy, setCurrentStrategy] = useState('');
  const [showStrategy, setShowStrategy] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [breakActivity, setBreakActivity] = useState('');

  useEffect(() => {
    let interval = null;
    if (isOnBreak && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsOnBreak(false);
      setTimeLeft(300);
    }
    return () => clearInterval(interval);
  }, [isOnBreak, timeLeft]);

  const getRandomStrategy = () => {
    const randomIndex = Math.floor(Math.random() * strategies.length);
    const strategy = strategies[randomIndex];
    setCurrentStrategy(strategy);
    setShowStrategy(true);
  };

  const startBreak = () => {
    const randomActivity = breakActivities[Math.floor(Math.random() * breakActivities.length)];
    setBreakActivity(randomActivity);
    setIsOnBreak(true);
    setTimeLeft(300);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setShowStrategy(false);
    setCurrentStrategy('');
    setIsOnBreak(false);
    setTimeLeft(300);
    setBreakActivity('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Oblique Strategies</h1>
        <p>Get unblocked creatively with Brian Eno's strategies</p>
        
        {!showStrategy && (
          <button className="strategy-button" onClick={getRandomStrategy}>
            Get a Strategy
          </button>
        )}
        
        {showStrategy && !isOnBreak && (
          <div className="strategy-container">
            <h2 className="strategy-title">{currentStrategy}</h2>
            <p className="strategy-description">
              Sometimes the best way forward is to step away. Take a 5-minute break 
              and do something to refresh your mind.
            </p>
            <button className="break-button" onClick={startBreak}>
              Start 5-Minute Break
            </button>
            <button className="reset-button" onClick={reset}>
              Get Another Strategy
            </button>
          </div>
        )}
        
        {isOnBreak && (
          <div className="break-container">
            <h2 className="break-title">Break Time!</h2>
            <div className="timer">{formatTime(timeLeft)}</div>
            <p className="break-activity">{breakActivity}</p>
            <button className="stop-break-button" onClick={() => setIsOnBreak(false)}>
              End Break Early
            </button>
          </div>
        )}
        
        {timeLeft === 0 && !isOnBreak && showStrategy && (
          <div className="break-complete">
            <h2>Break Complete!</h2>
            <p>Ready to get back to your creative work?</p>
            <button className="reset-button" onClick={reset}>
              Get Another Strategy
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
