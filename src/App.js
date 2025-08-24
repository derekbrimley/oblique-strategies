import React, { useState, useEffect } from 'react';
import './App.css';

const strategies = [
  'Take a Break',
  'What are you thinking about right now?'
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
  const [streamText, setStreamText] = useState('');
  const [showWordCloud, setShowWordCloud] = useState(false);
  const [wordFrequency, setWordFrequency] = useState({});

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

  const analyzeText = () => {
    if (!streamText.trim()) return;

    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 
      'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 
      'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'i', 'you', 'he', 
      'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 
      'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those', 'am', 'so', 'just', 
      'like', 'get', 'go', 'going', 'went', 'come', 'came', 'see', 'saw', 'know', 'think', 
      'want', 'need', 'say', 'said', 'make', 'made', 'take', 'took', 'feel', 'felt', 'look', 
      'looked', 'way', 'time', 'good', 'bad', 'big', 'small', 'long', 'short', 'new', 'old'
    ]);

    const words = streamText
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word));

    const frequency = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    const sortedWords = Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 50);

    const frequencyObj = Object.fromEntries(sortedWords);
    setWordFrequency(frequencyObj);
    setShowWordCloud(true);
  };

  const reset = () => {
    setShowStrategy(false);
    setCurrentStrategy('');
    setIsOnBreak(false);
    setTimeLeft(300);
    setBreakActivity('');
    setStreamText('');
    setShowWordCloud(false);
    setWordFrequency({});
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Oblique Strategies</h1>
        <p>Get unblocked with tools based on Brian Eno's Oblique Strategies</p>
        
        {!showStrategy && (
          <button className="strategy-button" onClick={getRandomStrategy}>
            Get a Strategy
          </button>
        )}
        
        {showStrategy && !isOnBreak && !showWordCloud && currentStrategy === 'Take a Break' && (
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
        
        {showStrategy && !showWordCloud && currentStrategy === 'What are you thinking about right now?' && (
          <div className="strategy-container">
            <h2 className="strategy-title">{currentStrategy}</h2>
            <p className="strategy-description">
              Write down whatever is going through your mind right now. Don't edit yourself - 
              just let your thoughts flow onto the page for a few minutes.
            </p>
            <textarea
              className="stream-textarea"
              value={streamText}
              onChange={(e) => setStreamText(e.target.value)}
              placeholder="Start writing whatever comes to mind... don't worry about grammar or structure, just let your thoughts flow..."
              rows={8}
            />
            <div className="button-group">
              <button 
                className="analyze-button" 
                onClick={analyzeText}
                disabled={!streamText.trim()}
              >
                Analyze My Thoughts
              </button>
              <button className="reset-button" onClick={reset}>
                Get Another Strategy
              </button>
            </div>
          </div>
        )}
        
        {showWordCloud && (
          <div className="word-cloud-container">
            <h2 className="word-cloud-title">Your Thought Patterns</h2>
            <p className="word-cloud-description">
              Here are the most frequent meaningful words from your stream of consciousness:
            </p>
            <div className="word-cloud">
              {Object.entries(wordFrequency).map(([word, count]) => (
                <span 
                  key={word} 
                  className="word-cloud-item"
                  style={{
                    fontSize: `${Math.max(0.8, Math.min(2.5, count * 0.3 + 0.8))}rem`,
                    opacity: Math.max(0.6, Math.min(1, count * 0.2 + 0.4))
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
            <div className="word-frequency-list">
              <h3>Word Frequencies:</h3>
              {Object.entries(wordFrequency).slice(0, 10).map(([word, count]) => (
                <div key={word} className="frequency-item">
                  <span className="word">{word}</span>
                  <span className="count">{count}</span>
                </div>
              ))}
            </div>
            <button className="reset-button" onClick={reset}>
              Try Another Strategy
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
