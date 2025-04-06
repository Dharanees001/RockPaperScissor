import React, { useState } from 'react';
import '../styles/Game.css';
import winSound from '../sounds/win.wav';
import loseSound from '../sounds/lose.wav';
import drawSound from '../sounds/draw.mp3';

const choices = [
  { name: 'rock', emoji: '🪨' },
  { name: 'paper', emoji: '📄' },
  { name: 'scissors', emoji: '✂️' }
];

const Game = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });
  const [isMuted, setIsMuted] = useState(false); // NEW

  const playSound = (type) => {
    if (isMuted) return; // Skip playing sound if muted

    let sound;
    if (type === 'win') sound = new Audio(winSound);
    else if (type === 'lose') sound = new Audio(loseSound);
    else sound = new Audio(drawSound);
    sound.play();
  };

  const getResult = (user, computer) => {
    if (user === computer) return 'draw';
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) return 'win';
    return 'lose';
  };

  const handleClick = (choice) => {
    const compChoice = choices[Math.floor(Math.random() * 3)];
    const result = getResult(choice.name, compChoice.name);

    setUserChoice(choice);
    setComputerChoice(compChoice);
    setResult(result);

    setScore((prev) => ({
      ...prev,
      [result]: prev[result] + 1
    }));

    playSound(result);
  };

  const handleReset = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ win: 0, lose: 0, draw: 0 });
  };

  return (
    <div className="game-container">
      <h1>Rock Paper Scissors 🎮</h1>

      <button className="mute-btn" onClick={() => setIsMuted(!isMuted)}>
        {isMuted ? '🔇 Mute' : '🔊 Unmute'}
      </button>

      <div className="buttons">
        {choices.map((choice) => (
          <button key={choice.name} onClick={() => handleClick(choice)}>
            {choice.emoji} {choice.name.toUpperCase()}
          </button>
        ))}
      </div>

      {userChoice && computerChoice && (
  <div className={`result ${result === 'win' ? 'win' : result === 'lose' ? 'lose' : 'draw'}`}>
    <p>You chose: {userChoice.emoji} {userChoice.name}</p>
    <p>Computer chose: {computerChoice.emoji} {computerChoice.name}</p>
    <h2>
      {result === 'win' ? 'You WIN!' : result === 'lose' ? 'You LOSE!' : 'It\'s a DRAW!'}
    </h2>
  </div>
)}


      <div className="score">
        <p>Wins: {score.win}</p>
        <p>Losses: {score.lose}</p>
        <p>Draws: {score.draw}</p>
      </div>

      <button className="reset-btn" onClick={handleReset}>🔄 Reset Game</button>
    </div>
  );
};

export default Game;
