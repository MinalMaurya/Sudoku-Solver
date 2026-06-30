// ====================================
// SUDOKU MASTER - GAME.JS PART A
// ====================================

let puzzleBoard = [];
let solutionBoard = [];
let currentBoard = [];

let selectedCell = null;

let mistakes = 0;
let maxMistakes = 3;

let timerInterval;
let seconds = 0;

let notesMode = false;

// ====================================
// DOM
// ====================================

const boardElement =
document.getElementById(
    "sudoku-board"
);

const timerElement =
document.getElementById(
    "timer"
);

const mistakesElement =
document.getElementById(
    "mistakes"
);

const difficultySelect =
document.getElementById(
    "difficulty"
);

const themeSelector =
document.getElementById(
    "themeSelector"
);

const messageElement =
document.getElementById(
    "message"
);

const selectedInfo =
document.getElementById(
    "selectedCellInfo"
);

const challengeDate =
document.getElementById(
    "challengeDate"
);

// ====================================
// START GAME
// ====================================

window.addEventListener(
    "DOMContentLoaded",
    () => {

        startNewGame();

        setupNumberButtons();

        setupThemeSelector();

        setupControlButtons();

    }
);

// ====================================
// TIMER
// ====================================

function startTimer(){

    clearInterval(timerInterval);

    seconds = 0;

    timerInterval = setInterval(
        () => {

            seconds++;

            let mins =
            Math.floor(
                seconds / 60
            );

            let secs =
            seconds % 60;

            timerElement.textContent =
            `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

        },
        1000
    );

}

function stopTimer(){

    clearInterval(timerInterval);

}

// ====================================
// NEW GAME
// ====================================

function startNewGame(){

    mistakes = 0;

    mistakesElement.textContent =
    mistakes;

    const difficulty =
    difficultySelect.value;

    const generated =
    sudokuGenerator
    .generatePuzzle(
        difficulty
    );

    puzzleBoard =
    generated.puzzle;

    solutionBoard =
    generated.solution;

    currentBoard =
    puzzleBoard.map(
        row => [...row]
    );

    renderBoard();

    startTimer();

    messageElement.textContent =
    "";

}

// ====================================
// DAILY CHALLENGE
// ====================================

function loadDailyChallenge(){

    mistakes = 0;

    mistakesElement.textContent =
    "0";

    const challenge =
    sudokuGenerator
    .generateDailyChallenge();

    challengeDate.textContent =
    challenge.challengeDate;

    puzzleBoard =
    challenge.puzzle;

    solutionBoard =
    challenge.solution;

    currentBoard =
    puzzleBoard.map(
        row => [...row]
    );

    renderBoard();

    startTimer();

    messageElement.textContent =
    "Daily Challenge Loaded";

}

// ====================================
// RENDER BOARD
// ====================================

function renderBoard(){

    boardElement.innerHTML = "";

    for(
        let row = 0;
        row < 9;
        row++
    ){

        for(
            let col = 0;
            col < 9;
            col++
        ){

            const cell =
            document.createElement(
                "div"
            );

            cell.classList.add(
                "cell"
            );

            const value =
            currentBoard[row][col];

            if(value !== 0){

                cell.textContent =
                value;

            }

            if(
                puzzleBoard[row][col]
                !== 0
            ){

                cell.classList.add(
                    "fixed"
                );

            }

            if(
                col === 2 ||
                col === 5
            ){

                cell.classList.add(
                    "border-right"
                );

            }

            if(
                row === 2 ||
                row === 5
            ){

                cell.classList.add(
                    "border-bottom"
                );

            }

            cell.dataset.row =
            row;

            cell.dataset.col =
            col;

            cell.addEventListener(
                "click",
                () => {

                    selectCell(
                        row,
                        col
                    );

                }
            );

            boardElement
            .appendChild(
                cell
            );

        }

    }

}

// ====================================
// SELECT CELL
// ====================================

function selectCell(
    row,
    col
){

    if(
        puzzleBoard[row][col]
        !== 0
    ){
        return;
    }

    selectedCell = {
        row,
        col
    };

    document
    .querySelectorAll(
        ".cell"
    )
    .forEach(cell => {

        cell.classList.remove(
            "selected"
        );

        cell.classList.remove(
            "highlight"
        );

    });

    const cells =
    document.querySelectorAll(
        ".cell"
    );

    cells[
        row * 9 + col
    ]
    .classList.add(
        "selected"
    );

    highlightRowColumn(
        row,
        col
    );

    selectedInfo.textContent =
    `Row ${row+1}, Column ${col+1}`;

}

// ====================================
// HIGHLIGHT ROW/COLUMN
// ====================================

function highlightRowColumn(
    row,
    col
){

    const cells =
    document.querySelectorAll(
        ".cell"
    );

    cells.forEach(cell => {

        const r =
        Number(
            cell.dataset.row
        );

        const c =
        Number(
            cell.dataset.col
        );

        if(
            r === row ||
            c === col
        ){

            cell.classList.add(
                "highlight"
            );

        }

    });

}

// ====================================
// NUMBER BUTTONS
// ====================================

function setupNumberButtons(){

    const buttons =
    document.querySelectorAll(
        ".number-btn"
    );

    buttons.forEach(btn => {

        btn.addEventListener(
            "click",
            () => {

                enterNumber(
                    Number(
                        btn.textContent
                    )
                );

            }
        );

    });

}

// ====================================
// ENTER NUMBER
// ====================================

function enterNumber(num){

    if(
        !selectedCell
    ){
        return;
    }

    const row =
    selectedCell.row;

    const col =
    selectedCell.col;

    currentBoard[row][col] =
    num;

    renderBoard();

    selectCell(
        row,
        col
    );

}
// ====================================
// GAME.JS PART B
// ====================================

// ====================================
// CONTROL BUTTONS
// ====================================

function setupControlButtons(){

    document
    .getElementById("newGameBtn")
    .addEventListener(
        "click",
        startNewGame
    );

    document
    .getElementById("dailyBtn")
    .addEventListener(
        "click",
        loadDailyChallenge
    );

    document
    .getElementById("hintBtn")
    .addEventListener(
        "click",
        useHint
    );

    document
    .getElementById("checkBtn")
    .addEventListener(
        "click",
        checkBoard
    );

    document
    .getElementById("solveBtn")
    .addEventListener(
        "click",
        solveBoard
    );

    document
    .getElementById("notesBtn")
    .addEventListener(
        "click",
        toggleNotesMode
    );

    document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        () => {

            document
            .getElementById("winModal")
            .style.display = "none";

            startNewGame();

        }
    );

}

// ====================================
// THEME SWITCHER
// ====================================

function setupThemeSelector(){

    themeSelector.addEventListener(
        "change",
        () => {

            document.body.classList.remove(
                "dark",
                "ocean",
                "forest"
            );

            const selected =
            themeSelector.value;

            if(
                selected !== "classic"
            ){
                document.body.classList.add(
                    selected
                );
            }

        }
    );

}

// ====================================
// NOTES MODE
// ====================================

function toggleNotesMode(){

    notesMode = !notesMode;

    const btn =
    document.getElementById(
        "notesBtn"
    );

    if(notesMode){

        btn.textContent =
        "✏ Notes On";

        document
        .getElementById(
            "modeDisplay"
        )
        .textContent =
        "Notes Mode";

    }
    else{

        btn.textContent =
        "✏ Notes Off";

        document
        .getElementById(
            "modeDisplay"
        )
        .textContent =
        "Normal Play";

    }

}

// ====================================
// UPDATE CELL
// ====================================

function enterNumber(num){

    if(
        !selectedCell
    ){
        return;
    }

    const row =
    selectedCell.row;

    const col =
    selectedCell.col;

    if(notesMode){

        showNotes(
            row,
            col
        );

        return;
    }

    currentBoard[row][col] =
    num;

    if(
        num !==
        solutionBoard[row][col]
    ){

        mistakes++;

        mistakesElement.textContent =
        mistakes;

        messageElement.textContent =
        "Wrong Number!";

        if(
            mistakes >= maxMistakes
        ){

            gameOver();

            return;
        }

    }
    else{

        messageElement.textContent =
        "Correct";

    }

    renderBoard();

    selectCell(
        row,
        col
    );

    checkWin();

}

// ====================================
// NOTES SYSTEM
// ====================================

function showNotes(
    row,
    col
){

    const candidates =
    sudokuGenerator
    .getCandidates(
        currentBoard,
        row,
        col
    );

    document
    .getElementById(
        "hintMessage"
    )
    .textContent =
    "Candidates: " +
    candidates.join(", ");

}

// ====================================
// HINT SYSTEM
// ====================================

function useHint(){

    const hint =
    sudokuGenerator
    .getHint(
        currentBoard,
        solutionBoard
    );

    if(!hint){

        return;
    }

    document
    .getElementById(
        "hintMessage"
    )
    .textContent =
    hint.message;

    currentBoard[
        hint.row
    ][
        hint.col
    ] =
    hint.value;

    renderBoard();

}

// ====================================
// CHECK BOARD
// ====================================

function checkBoard(){

    const correct =
    sudokuGenerator
    .checkSolution(
        currentBoard,
        solutionBoard
    );

    if(correct){

        messageElement.textContent =
        "Puzzle Solved";

        winGame();

    }
    else{

        messageElement.textContent =
        "Not Correct Yet";

    }

}

// ====================================
// SOLVE BOARD
// ====================================

function solveBoard(){

    currentBoard =
    solutionBoard.map(
        row => [...row]
    );

    renderBoard();

    messageElement.textContent =
    "Solved Automatically";

}

// ====================================
// WIN CHECK
// ====================================

function checkWin(){

    const solved =
    sudokuGenerator
    .checkSolution(
        currentBoard,
        solutionBoard
    );

    if(solved){

        winGame();

    }

}

// ====================================
// WIN GAME
// ====================================

function winGame(){

    stopTimer();

    saveBestTime();

    document
    .getElementById(
        "winModal"
    )
    .style.display =
    "flex";

    if(
        typeof startConfetti
        === "function"
    ){
        startConfetti();
    }

}

// ====================================
// GAME OVER
// ====================================

function gameOver(){

    stopTimer();

    alert(
        "Game Over! 3 mistakes reached."
    );

    startNewGame();

}

// ====================================
// BEST TIME
// ====================================

function saveBestTime(){

    const difficulty =
    difficultySelect.value;

    const key =
    "best_" +
    difficulty;

    const current =
    seconds;

    const old =
    localStorage.getItem(
        key
    );

    if(
        !old ||
        current < Number(old)
    ){

        localStorage.setItem(
            key,
            current
        );

    }

    loadBestTime();

}

function loadBestTime(){

    const difficulty =
    difficultySelect.value;

    const key =
    "best_" +
    difficulty;

    const best =
    localStorage.getItem(
        key
    );

    if(!best){

        document
        .getElementById(
            "bestTime"
        )
        .textContent =
        "--";

        return;
    }

    const mins =
    Math.floor(
        best / 60
    );

    const secs =
    best % 60;

    document
    .getElementById(
        "bestTime"
    )
    .textContent =
    `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

}

// ====================================
// DIFFICULTY CHANGE
// ====================================

difficultySelect
.addEventListener(
    "change",
    () => {

        loadBestTime();

        startNewGame();

    }
);
function setupThemeSelector(){

    themeSelector.addEventListener(
        "change",
        () => {

            document.body.classList.remove(
                "dark",
                "ocean",
                "forest"
            );

            const selected =
            themeSelector.value;

            if(selected !== "classic"){
                document.body.classList.add(selected);
            }

        }
    );
}
// ====================================
// KEYBOARD SUPPORT
// ====================================

document.addEventListener("keydown", (event) => {

    if (!selectedCell) return;

    const row = selectedCell.row;
    const col = selectedCell.col;

    // Numbers 1-9
    if (/^[1-9]$/.test(event.key)) {
        enterNumber(Number(event.key));
    }

    // Delete / Backspace
    if (
        event.key === "Backspace" ||
        event.key === "Delete"
    ) {

        if (puzzleBoard[row][col] === 0) {

            currentBoard[row][col] = 0;

            renderBoard();

            selectCell(row, col);
        }
    }
});
document.addEventListener("keydown", (event) => {

    if (!selectedCell) return;

    let row = selectedCell.row;
    let col = selectedCell.col;

    switch(event.key){

        case "ArrowUp":
            row = Math.max(0, row - 1);
            break;

        case "ArrowDown":
            row = Math.min(8, row + 1);
            break;

        case "ArrowLeft":
            col = Math.max(0, col - 1);
            break;

        case "ArrowRight":
            col = Math.min(8, col + 1);
            break;

        default:
            return;
    }

    if (puzzleBoard[row][col] === 0) {
        selectCell(row, col);
    }
});
// ====================================
// INITIAL LOAD
// ====================================

loadBestTime();