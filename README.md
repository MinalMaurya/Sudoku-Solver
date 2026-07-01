# 🧩 Sudoku Solver

An advanced **Sudoku Game & Solver** built using **HTML, CSS, and JavaScript**. The project combines an interactive Sudoku game with a backtracking-based solver, offering puzzle generation, multiple difficulty levels, hints, themes, keyboard support, and a responsive user interface.

> **Algorithm Used:** Backtracking

---

# ✨ Features

## 🎮 Game Mode
- Auto-generated Sudoku puzzles
- Three difficulty levels:
  - Easy
  - Medium
  - Hard
- Daily Challenge
- Timer
- Mistake Counter (3 Lives)
- Notes Mode
- Hint System
- Keyboard Support
- Responsive Design
- Win Animation (Confetti)
- Best Time Tracking using LocalStorage

---

## 🤖 Solver Mode

- Enter your own Sudoku puzzle
- Solve using the Backtracking algorithm
- Clear board functionality
- Perfect for solving newspaper or custom Sudoku puzzles

---

## 🎨 Themes

Choose between multiple themes:

- Classic
- Dark
- Ocean
- Forest

---

## ⌨️ Keyboard Support

Players can:

- Press **1–9** to enter numbers
- Use **Backspace/Delete** to clear a cell
- *(Optional)* Navigate using arrow keys

---

## 📱 Responsive Design

Optimized for:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📱 Tablet

---

# 🧠 Algorithm

This project uses the **Backtracking Algorithm** for:

- Sudoku puzzle generation
- Sudoku solving
- Validation
- Hint generation

### How Backtracking Works

1. Find an empty cell.
2. Try numbers **1–9**.
3. Check if the number is valid.
4. If valid, move to the next empty cell.
5. If no number fits, backtrack.
6. Continue until the puzzle is solved.

---

# 📂 Project Structure

```text
Sudoku-Solver/
│
├── css/
│   └── style.css
│
├── js/
│   ├── game.js
│   ├── sudokuGenerator.js
│   ├── solver.js
│   └── confetti.js
│
├── index.html
├── solver.html
├── README.md
└── screenshots/
```

---

# 🚀 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LocalStorage API

---

# 🎯 Project Highlights

- Interactive Sudoku gameplay
- Backtracking-based puzzle generation
- Sudoku Solver Mode
- Multiple difficulty levels
- Daily Challenge
- Responsive UI
- Theme Switcher
- Notes Mode
- Hint System
- Keyboard Support
- Best Time Tracking
- Confetti Win Animation

---

# 📖 Future Improvements

- 🎥 Backtracking Visualization
- 🏆 Achievement System
- 📊 Statistics Dashboard
- 🔥 Daily Streaks
- 🎵 Sound Effects
- 📷 Image-to-Sudoku (OCR)
- ☁️ Cloud Save
- 🌍 Online Leaderboard
- 🤝 Multiplayer Sudoku Challenge

---

# ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/Sudoku-Solver.git
```

Open the project folder:

```bash
cd Sudoku-Solver
```

Open **index.html** in your browser.

Or use **Live Server** in VS Code for the best experience.

---

# 💡 Usage

### Game Mode

1. Select a difficulty level.
2. Start a new game.
3. Fill the Sudoku grid.
4. Use hints if needed.
5. Complete the puzzle before reaching 3 mistakes.

### Solver Mode

1. Open **Solver Mode**.
2. Enter the Sudoku puzzle.
3. Click **Solve**.
4. View the solved puzzle generated using Backtracking.

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Open a Pull Request.

---

# 📜 License

This project is licensed under the MIT License.

---

## ⭐ If you found this project useful, consider giving it a star!
