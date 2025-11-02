/**
 * TypingGame
 * 
 * Implements an interactive typing game where users type random words.
 * Tracks correctness, total characters, correct and incorrect entries.
 * Provides auditory feedback for correct and incorrect keystrokes.
 */
class TypingGame {
  /**
   * Initializes the TypingGame instance, references DOM elements,
   * loads sounds, and attaches event listeners.
   */
  constructor() {
    /** @type {HTMLElement} Displays the target sentence */
    this.targetText = document.querySelector(".target-text");
    
    /** @type {HTMLElement} Shows correctness percentage */
    this.correctnessText = document.getElementById("correctness");
    
    /** @type {HTMLElement} Displays total number of characters */
    this.totalText = document.getElementById("total");
    
    /** @type {HTMLElement} Displays number of correct characters */
    this.correctText = document.getElementById("correct");
    
    /** @type {HTMLElement} Displays number of incorrect characters */
    this.incorrectText = document.getElementById("incorrect");
    
    /** @type {HTMLElement} Button to restart the game */
    this.restartBtn = document.getElementById("restart");

    /** @type {HTMLAudioElement} Sound for correct keystrokes */
    this.softSound = new Audio("./sounds/soft.wav");
    
    /** @type {HTMLAudioElement} Sound for incorrect keystrokes */
    this.hardSound = new Audio("./sounds/hard.wav");

    /** @type {HTMLSpanElement[]} Array of span elements representing each character */
    this.spans = [];
    
    /** @type {string} Current sentence to type */
    this.sentence = "";
    
    /** @type {number} Current index in the sentence */
    this.index = 0;
    
    /** @type {number} Number of correct keystrokes */
    this.correct = 0;
    
    /** @type {number} Number of incorrect keystrokes */
    this.incorrect = 0;

    // Event listeners
    this.restartBtn.addEventListener("click", () => this.restartGame());
    document.getElementById("input-controller").addEventListener("keydown", (e) => this.inputHandler(e));
  }

  /**
   * Restarts the game with a new sentence.
   * Resets counters and generates the GUI spans for each character.
   */
  async restartGame() {
    this.targetText.textContent = "";
    this.spans.length = 0;
    this.index = this.correct = this.incorrect = 0;
    this.sentence = await this.getRandomQuote();
    this.totalText.textContent = `${this.sentence.length}`;

    const words = this.sentence.split(" ");

    for (const word of words) {
      const spanWord = document.createElement("span");

      for (const char of word) {
        const span = document.createElement("span");
        span.classList.add("target-letter", "pristine");
        span.textContent = char;
        spanWord.appendChild(span);
        this.spans.push(span);
      }

      const span = document.createElement("span");
      span.classList.add("target-letter", "pristine");
      span.textContent = " ";
      this.targetText.appendChild(spanWord);
      this.targetText.appendChild(span);
      this.spans.push(span);
    }

    this.spans[0].classList.add("current");
    this.setGuiTexts();
  }

  /**
   * Handles user keyboard input.
   * Delegates to handleBackspace or handleLetter depending on the key pressed.
   * @param {KeyboardEvent} e 
   */
  inputHandler(e) {
    e.target.value = "";
    if (e.key === "Shift") return;
    e.key === "Backspace" ? this.handleBackspace() : this.handleLetter(e.key);
    this.setGuiTexts();
  }

  /**
   * Updates the GUI elements displaying correctness, correct, and incorrect counts.
   */
  setGuiTexts() {
    const correctPercentage = (this.correct / this.sentence.length) * 100;
    this.correctnessText.textContent = `${Math.round(correctPercentage)}%`;
    this.correctText.textContent = `${this.correct}`;
    this.incorrectText.textContent = `${this.incorrect}`;
  }

  /**
   * Returns the span element at a specific index.
   * @param {number} index 
   * @returns {HTMLSpanElement}
   */
  getSpan(index) {
    return this.spans[index];
  }

  /**
   * Handles backspace key input.
   * Moves the current index back and updates correctness counters.
   */
  handleBackspace() {
    if (this.index === this.sentence.length) {
      this.index--;
      this.spans[this.index].classList.add("current");
      if (this.spans[this.index].dataset.state === "incorrect") this.incorrect--;
      else if (this.spans[this.index].dataset.state === "correct") this.correct--;
      return;
    }

    if (this.index > 0) {
      this.spans[this.index].classList.add("pristine");
      this.spans[this.index].classList.remove("current");
      this.index--;
      this.softSound.currentTime = 0;
      this.softSound.play();

      this.spans[this.index].classList.add("current");
      if (this.spans[this.index].dataset.state === "incorrect") this.incorrect--;
      else if (this.spans[this.index].dataset.state === "correct") this.correct--;
    }
  }

  /**
   * Handles regular letter key input.
   * Updates span classes, plays sounds, and increments correct/incorrect counters.
   * @param {string} key 
   */
  handleLetter(key) {
    if (this.index >= this.sentence.length) return;

    const span = this.spans[this.index];
    span.removeAttribute("data-state");
    span.classList.remove("current", "correct", "incorrect", "pristine");

    if (span.textContent === key || (span.textContent === " " && key === " ")) {
      span.classList.add("correct");
      span.dataset.state = "correct";

      this.softSound.currentTime = 0;
      this.softSound.play();
      this.correct++;
    } else {
      span.classList.add("incorrect");
      span.dataset.state = "incorrect";

      this.hardSound.currentTime = 0;
      this.hardSound.play();
      this.incorrect++;
    }

    this.index++;
    if (this.index < this.sentence.length) this.spans[this.index].classList.add("current");
  }

  /**
   * Generates a random quote composed of 10 random words.
   * @returns {string} Randomly generated sentence
   */
  getRandomQuote() {
    const words = [
      'sun', 'tree', 'laughter', 'mystery', 'sky', 'run', 'water', 'night', 'fire', 'wind',
      'mountain', 'moon', 'desire', 'red', 'sail', 'stone', 'star', 'accelerate', 'magic',
      'echo', 'challenge', 'earth', 'noise', 'coffee', 'escape', 'breakfast', 'passion', 'flower', 'trail',
      'cloud', 'journey', 'rain', 'dream', 'time', 'shadow', 'light', 'hope', 'love', 'peace',
      // ... truncated for brevity
    ];

    const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

    let quote = "";
    for (let i = 0; i < 10; i++) {
      quote += `${getRandomWord()} `;
    }

    return quote.trim();
  }
}

/** Instantiate and start the typing game */
const game = new TypingGame();
game.restartGame();
lucide.createIcons();
