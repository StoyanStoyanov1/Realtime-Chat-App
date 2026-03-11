const keyStrokeSounds = [
    new Audio('/sounds/keystroke.mp3'),
    new Audio('/sounds/keystroke2.mp3'),
    new Audio('/sounds/keystroke3.mp3'),
    new Audio('/sounds/keystroke4.mp3'),
    new Audio('/sounds/keystroke5.mp3'),
];

function useKeyboardSound() {
    const playRandomKeyStrokeStrokeSound = () => {
      const randomSound = keyStrokeSounds[Math.floor(Math.random()) * keyStrokeSounds.length];

      randomSound.currentTime = 0;
      randomSound.play().catch(error => console.error("Error playing sound:", error));
    }

    return {playRandomKeyStrokeStrokeSound}
}

export default useKeyboardSound;