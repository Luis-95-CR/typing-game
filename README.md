# Typing Game 

An interactive typing game built with JavaScript and TailwindCSS. Users type random words, track accuracy, and receive real-time feedback for correct and incorrect keystrokes.

---

## Table of Contents

* [Features](#features)
* [How It Works](#how-it-works)
* [Technologies](#technologies)

---

## Features

* Displays a target sentence to type.
* Tracks **total characters**, **correct**, **incorrect**, and **accuracy**.
* Plays different sounds for correct (`soft.wav`) and incorrect (`hard.wav`) keystrokes.
* Highlights the **current character** being typed.
* Supports **restart** without refreshing the page.
* Visual feedback with **color coding** for correct (green), incorrect (red), and untyped (gray) letters.

---

## Key elements explained

* `#total` – Total number of characters in the current sentence.
* `#correct` – Correctly typed characters.
* `#incorrect` – Mistyped characters.
* `#correctness` – Accuracy percentage.
* `#restart` – Button to reset the game.
* `#target-text` – Displays the sentence to type, with individual spans for each letter.
* `#input-controller` – Hidden input field for capturing keystrokes.

---

## How It Works

1. The game generates a **random sentence** of words.
2. Each character is wrapped in a `<span>` to allow color changes:

   * **Gray**: pristine/untyped
   * **Green**: correct
   * **Red**: incorrect
   * **Yellow/black**: current character to type
3. User types into the hidden input (`#input-controller`).
4. On each keystroke:

   * Updates the character styling.
   * Plays the appropriate sound.
   * Updates the counters (`total`, `correct`, `incorrect`, `accuracy`).
5. Pressing backspace correctly adjusts the index and counters.
6. Clicking the restart button resets the game with a new sentence.

---

## Technologies

* HTML5, CSS3
* JavaScript ES6
* Lucide icons (via CDN)
* Audio feedback for correct and incorrect keystrokes
