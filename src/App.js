import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Anthropic from '@anthropic-ai/sdk';

const OBLIQUE_STRATEGIES = [
  'Abandon normal instruments',
  'Accept advice',
  'Accretion',
  'A line has two sides',
  'Allow an easement (an easement is the abandonment of a stricture)',
  'Are there sections? Consider transitions',
  'Ask people to work against their better judgment',
  'Ask your body',
  'Assemble some of the instruments in a group and treat the group',
  'Balance the consistency principle with the inconsistency principle',
  'Be dirty',
  'Breathe more deeply',
  'Bridges -build -burn',
  'Cascades',
  'Change instrument roles',
  'Change nothing and continue with immaculate consistency',
  'Children\'s voices -speaking -singing',
  'Cluster analysis',
  'Consider different fading systems',
  'Consult other sources -promising -unpromising',
  'Convert a melodic element into a rhythmic element',
  'Courage!',
  'Cut a vital connection',
  'Decorate, decorate',
  'Define an area as "safe" and use it as an anchor',
  'Destroy -nothing -the most important thing',
  'Discard an axiom',
  'Disconnect from desire',
  'Discover the recipes you are using and abandon them',
  'Distorting time',
  'Do nothing for as long as possible',
  'Don\'t be afraid of things because they\'re easy to do',
  'Don\'t be frightened of cliches',
  'Don\'t be frightened to display your talents',
  'Don\'t break the silence',
  'Don\'t stress one thing more than another',
  'Do something boring',
  'Do the washing up',
  'Do the words need changing?',
  'Do we need holes?',
  'Emphasize differences',
  'Emphasize repetitions',
  'Emphasize the flaws',
  'Faced with a choice, do both (given by Dieter Roth)',
  'Feedback recordings into an acoustic situation',
  'Fill every beat with something',
  'Get your neck massaged',
  'Ghost echoes',
  'Give the game away',
  'Give way to your worst impulse',
  'Go slowly all the way round the outside',
  'Honor thy error as a hidden intention',
  'How would you have done it?',
  'Humanize something free of error',
  'Imagine the music as a moving chain or caterpillar',
  'Imagine the music as a set of disconnected events',
  'Infinitesimal gradations',
  'Intentions -credibility of -nobility of -humility of',
  'Into the impossible',
  'Is it finished?',
  'Is there something missing?',
  'Is the tuning appropriate?',
  'Just carry on',
  'Left channel, right channel, center channel',
  'Listen in total darkness, or in a very large room, very quietly',
  'Listen to the quiet voice',
  'Look at a very small object; look at its center',
  'Look at the order in which you do things',
  'Look closely at the most embarrassing details and amplify them',
  'Lowest common denominator check -single beat -single note -single riff',
  'Make a blank valuable by putting it in an exquisite frame',
  'Make an exhaustive list of everything you might do and do the last thing on the list',
  'Make a sudden, destructive, unpredictable action; incorporate',
  'Mechanicalize something idiosyncratic',
  'Mute and continue',
  'Only one element of each kind',
  '(Organic) machinery',
  'Overtly resist change',
  'Put in earplugs',
  'Remember those quiet evenings',
  'Remove ambiguities and convert to specifics',
  'Remove specifics and convert to ambiguities',
  'Repetition is a form of change',
  'Reverse',
  'Short circuit (example: a man eating peas with the idea that they will improve his virility shovels them straight into his lap)',
  'Shut the door and listen from outside',
  'Simple subtraction',
  'Spectrum analysis',
  'Take a break',
  'Take away the elements in order of apparent non-importance',
  'Tape your mouth (given by Ritva Saarikko)',
  'The inconsistency principle',
  'The tape is now the music',
  'Think of the radio',
  'Tidy up',
  'Trust in the you of now',
  'Turn it upside down',
  'Twist the spine',
  'Use an old idea',
  'Use an unacceptable color',
  'Use fewer notes',
  'Use filters',
  'Use "unqualified" people',
  'Water',
  'What are you really thinking about just now? Incorporate',
  'What is the reality of the situation?',
  'What mistakes did you make last time?',
  'What would your closest friend do?',
  'What wouldn\'t you do?',
  'Work at a different speed',
  'You are an engineer',
  'You can only make one dot at a time',
  'You don\'t have to be ashamed of using your own ideas',
  'Take a Break',
  'What are you thinking about right now?'
];

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "I'm here to help you break through creative barriers in your music. Whether you're stuck on a melody, frustrated with a mix, or just feeling creatively blocked, let's explore some fresh perspectives together. What are you working on right now?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getClaudeResponse = async (userMessage) => {
    const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
    if (!apiKey) {
      return "I need an Anthropic API key to help you. Please add REACT_APP_ANTHROPIC_API_KEY to your environment variables.";
    }

    try {
      const anthropic = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });

      const conversationHistory = messages.map(msg => {
        return `${msg.sender}: ${msg.text}`;
      }).join('\n');

      const systemPrompt = `You are a creative music assistant specializing in helping musicians overcome creative blocks using Brian Eno's Oblique Strategies. You have access to these specific strategies:

${OBLIQUE_STRATEGIES.join(', ')}

Your personality:
- Encouraging but not overly cheerful
- Thoughtful and curious about the user's creative process
- Practical yet poetic in your suggestions
- Focused on breakthrough moments and fresh perspectives

Your approach:
1. Listen carefully to the musician's specific challenge or context
2. Naturally weave relevant oblique strategies into practical musical advice
3. Ask probing questions that lead to new creative directions
4. Suggest concrete musical experiments and techniques
5. Help reframe problems as creative opportunities
6. Focus on composition, production, arrangement, performance, and creative process

Integration examples:
- Instead of saying "Try 'Reverse'" → "What if you flipped the song around - started with the chorus, or played the melody backwards?"
- Instead of saying "Use fewer notes" → "Sometimes less is more - what happens if you strip this down to just the essential notes?"
- Instead of saying "Change instrument roles" → "What if the bass played the melody and the guitar held down the rhythm?"
- Instead of saying "Honor thy error as a hidden intention" → "That mistake you made earlier - what if it wasn't a mistake but pointing toward something interesting?"

Musical focus areas:
- Composition: melody, harmony, rhythm, structure
- Production: sound design, mixing, effects, arrangement
- Performance: expression, dynamics, timing, interpretation
- Creative process: workflow, inspiration, overcoming blocks

Keep responses concise (2-4 sentences typically), practical, and always include a specific suggestion or question that moves the musician forward. Don't quote strategies directly - integrate them naturally into musical guidance.`;

      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 300,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `Previous conversation:\n${conversationHistory}\n\nUser's new message: ${userMessage}`
          }
        ]
      });

      return response.content[0].text;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      return "I'm having trouble connecting right now. Make sure your API key is set correctly and try again.";
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await getClaudeResponse(inputText.trim());
      
      const assistantMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="App">
      <div className="chat-container">
        <header className="chat-header">
          <h1>Oblique Music Assistant</h1>
          <p>Your AI companion for creative music breakthroughs</p>
        </header>
        
        <div className="messages-container">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-content">
                {message.text}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message assistant">
              <div className="message-content loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me about your musical challenge or what you're working on..."
            className="message-input"
            rows={1}
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading}
            className="send-button"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
