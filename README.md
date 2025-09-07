# Oblique Music Assistant

An AI-powered creative music assistant that uses Brian Eno's Oblique Strategies to help musicians overcome creative blocks and discover new musical directions through conversation.

## What is this?

This app transforms the classic Oblique Strategies cards into an intelligent conversational assistant specifically designed for musicians. Instead of random strategy cards, you get contextual advice from Claude AI that naturally weaves in relevant oblique strategies based on your specific musical challenges.

## Features

- 🎵 **Music-focused AI assistant** - Specialized in helping with composition, production, and creative blocks
- 💬 **Conversational interface** - Chat naturally about your musical projects and challenges  
- 🎯 **Contextual oblique strategies** - All 100+ original strategies integrated contextually into advice
- 🎨 **Creative breakthrough tools** - Get unstuck with intelligent suggestions and thought-provoking questions
- 📱 **Modern chat UI** - Beautiful, responsive interface that works on all devices

## Setup

1. **Clone and install dependencies**
   ```bash
   git clone [repository-url]
   cd oblique-strategies
   npm install
   ```

2. **Set up your Claude API key**
   ```bash
   cp .env.example .env
   # Edit .env and add your Anthropic API key
   ```
   
   Get your API key from [Anthropic Console](https://console.anthropic.com/)

3. **Start the development server**
   ```bash
   npm start
   ```
   
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How to Use

1. **Start a conversation** - Tell the assistant about your current musical project or challenge
2. **Get contextual advice** - Receive personalized suggestions that incorporate relevant oblique strategies
3. **Explore ideas** - Ask follow-up questions and dive deeper into creative approaches
4. **Break through blocks** - Use the AI's suggestions to approach your music from new angles

### Example Conversations

- "I'm stuck on this bridge section in my song"
- "My drums sound boring - how can I make them more interesting?"
- "I keep writing the same progressions over and over"
- "How do I make my track sound more unique?"

The assistant will respond with practical musical advice that naturally incorporates strategies like "Reverse", "Change instrument roles", "Use fewer notes", "Emphasize the flaws", and many others.

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

## About Oblique Strategies

Created by Brian Eno and Peter Schmidt, Oblique Strategies are a deck of cards meant to help artists overcome creative blocks. Each card contains a phrase or cryptic remark that can be used to break deadlocks or dilemmas in a creative situation.

This app contains all the original strategies and integrates them intelligently into conversational AI assistance specifically focused on music creation.
