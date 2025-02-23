class TypingGame {
  constructor() {
    this.targetText = document.querySelector(".target-text");
    this.correctnessText = document.getElementById("correctness");
    this.totalText = document.getElementById("total");
    this.correctText = document.getElementById("correct");
    this.incorrectText = document.getElementById("incorrect");
    this.restartBtn = document.getElementById("restart");

    this.softSound = new Audio("./sounds/soft.wav");
    this.hardSound = new Audio("./sounds/hard.wav");

    this.spans = [];
    this.sentence = "";
    this.index = 0;
    this.correct = 0;
    this.incorrect = 0;

    this.restartBtn.addEventListener("click", () => this.restartGame());
    document.getElementById("input-controller").addEventListener("keydown", (e) => this.inputHandler(e));
  }

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

  inputHandler(e) {
    
    e.target.value = ""
    
    if (e.key === "Shift") return;
    e.key === "Backspace" ? this.handleBackspace() : this.handleLetter(e.key);
    this.setGuiTexts();
  }

  setGuiTexts() {
    let correctPercentage = (this.correct / this.sentence.length) * 100;
    this.correctnessText.textContent = `${Math.round(correctPercentage)}%`;
    this.correctText.textContent = `${this.correct}`;
    this.incorrectText.textContent = `${this.incorrect}`;
  }

  getSpan(index){
    return this.spans[index]
  }

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

  getRandomQuote() {
    const words = [
      'sun', 'tree', 'laughter', 'mystery', 'sky', 'run', 'water', 'night', 'fire', 'wind',
      'mountain', 'moon', 'desire', 'red', 'sail', 'stone', 'star', 'accelerate', 'magic', 
      'echo', 'challenge', 'earth', 'noise', 'coffee', 'escape', 'breakfast', 'passion', 'flower', 'trail',
      'cloud', 'journey', 'rain', 'dream', 'time', 'shadow', 'light', 'hope', 'love', 'peace',
      'strength', 'grace', 'river', 'horizon', 'adventure', 'explore', 'freedom', 'whisper', 'seeker', 'life',
      'velocity', 'storm', 'destruction', 'change', 'wonder', 'embrace', 'windmill', 'sunshine', 'reflections', 'joy',
      'compass', 'puzzle', 'balance', 'infinity', 'paradise', 'ocean', 'waves', 'hike', 'serenity', 'mountaintop',
      'anchor', 'flame', 'dragon', 'mystical', 'believe', 'vibe', 'legacy', 'vision', 'empathy', 'rumble',
      'treasure', 'focus', 'wild', 'fate', 'rumor', 'soul', 'strengthen', 'whirlwind', 'journey', 'discover',
      'recharge', 'grit', 'inspire', 'unite', 'root', 'courage', 'firefly', 'endurance', 'escape', 'brave',
      'friend', 'relax', 'twilight', 'wonderful', 'solitude', 'chase', 'arcane', 'resolve', 'tide', 'memories',
      'instinct', 'gaze', 'legend', 'thunder', 'momentum', 'rebirth', 'refresh', 'mystical', 'glow', 'pulse',
      'velocity', 'echo', 'rise', 'new', 'awaken', 'future', 'descent', 'thrive', 'whisper', 'shifting',
      'search', 'enigma', 'inspire', 'reveal', 'adrenaline', 'reckless', 'stormy', 'flame', 'whispering', 'echoes',
      'ascent', 'vortex', 'clarity', 'evolution', 'windy', 'gravity', 'sparkle', 'echo', 'unwind', 'expand',
      'gravity', 'ambition', 'grateful', 'explore', 'uphill', 'radiance', 'discover', 'captivate', 'echo',
      'canyon', 'adrenaline', 'firestorm', 'intensity', 'realm', 'growth', 'wildness', 'extreme', 'bliss', 'solace',
      'thunderstorm', 'adventure', 'open', 'shift', 'pulse', 'spark', 'whisper', 'harmony', 'sparkle', 'horizon',
      'vivid', 'darkness', 'reflect', 'splash', 'roar', 'climb', 'shift', 'expand', 'triumph', 'focus', 'mystery',
      'galaxy', 'awakening', 'vibrance', 'creativity', 'unfold', 'fly', 'breakthrough', 'upstream', 'untamed', 'bold',
      'sailor', 'mountainous', 'wave', 'epic', 'rush', 'hustle', 'rainstorm', 'dreamer', 'cloudy', 'inspire', 'whirl',
      'thunderclap', 'ice', 'rush', 'compassion', 'visionary', 'adventurer', 'ripple', 'unstoppable', 'glimpse', 'lightning',
      'mountainous', 'ascend', 'blaze', 'journey', 'transform', 'passionate', 'unexpected', 'wildfire', 'gathering', 'dawn'
    ]; 

    const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

    let quote = "";
    for (let i = 0; i < 10; i++) {
      quote += `${getRandomWord()} `;
    }

    return quote.trim();
  }
}

const game = new TypingGame();
game.restartGame();
lucide.createIcons();