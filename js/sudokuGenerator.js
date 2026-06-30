// ===============================
// Sudoku Generator & Solver
// ===============================

class SudokuGenerator {

    constructor() {
        this.size = 9;
        this.boxSize = 3;
    }

    // Create empty board
    createEmptyBoard() {
        return Array.from({ length: 9 }, () =>
            Array(9).fill(0)
        );
    }

    // Shuffle numbers 1-9
    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [arr[i], arr[j]] =
            [arr[j], arr[i]];
        }

        return arr;
    }

    // Check valid placement
    isValid(board, row, col, num) {

        // Row
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num)
                return false;
        }

        // Column
        for (let x = 0; x < 9; x++) {
            if (board[x][col] === num)
                return false;
        }

        // 3x3 Box
        const startRow =
            row - (row % 3);

        const startCol =
            col - (col % 3);

        for (let r = 0; r < 3; r++) {

            for (let c = 0; c < 3; c++) {

                if (
                    board[startRow + r]
                    [startCol + c] === num
                ) {
                    return false;
                }

            }

        }

        return true;
    }

    // Backtracking Solver
    solve(board) {

        for (let row = 0; row < 9; row++) {

            for (let col = 0; col < 9; col++) {

                if (board[row][col] === 0) {

                    let numbers =
                        this.shuffle(
                            [1,2,3,4,5,6,7,8,9]
                        );

                    for (let num of numbers) {

                        if (
                            this.isValid(
                                board,
                                row,
                                col,
                                num
                            )
                        ) {

                            board[row][col] = num;

                            if (
                                this.solve(board)
                            ) {
                                return true;
                            }

                            board[row][col] = 0;

                        }

                    }

                    return false;
                }

            }

        }

        return true;
    }

    // Generate solved board
    generateSolvedBoard() {

        let board =
            this.createEmptyBoard();

        this.solve(board);

        return board;
    }

    // Deep copy board
    copyBoard(board) {

        return board.map(
            row => [...row]
        );

    }

    // Remove cells by difficulty
    removeCells(board, difficulty) {

        let cellsToRemove;

        switch(difficulty){

            case "easy":
                cellsToRemove = 35;
                break;

            case "medium":
                cellsToRemove = 45;
                break;

            case "hard":
                cellsToRemove = 55;
                break;

            default:
                cellsToRemove = 35;

        }

        let puzzle =
            this.copyBoard(board);

        while(cellsToRemove > 0){

            let row =
                Math.floor(
                    Math.random()*9
                );

            let col =
                Math.floor(
                    Math.random()*9
                );

            if(puzzle[row][col] !== 0){

                puzzle[row][col] = 0;

                cellsToRemove--;

            }

        }

        return puzzle;
    }

    // Generate puzzle
    generatePuzzle(
        difficulty = "easy"
    ){

        const solvedBoard =
            this.generateSolvedBoard();

        const puzzleBoard =
            this.removeCells(
                solvedBoard,
                difficulty
            );

        return {

            puzzle: puzzleBoard,

            solution:
                this.copyBoard(
                    solvedBoard
                )

        };

    }

    // Daily Challenge
    generateDailyChallenge() {

        const today =
            new Date();

        const seed =
            today.getFullYear() +
            "-" +
            (today.getMonth()+1) +
            "-" +
            today.getDate();

        let difficulty = "medium";

        const generated =
            this.generatePuzzle(
                difficulty
            );

        generated.challengeDate =
            seed;

        return generated;
    }

    // Get candidates
    getCandidates(
        board,
        row,
        col
    ){

        if(board[row][col] !== 0)
            return [];

        let candidates = [];

        for(
            let num = 1;
            num <= 9;
            num++
        ){

            if(
                this.isValid(
                    board,
                    row,
                    col,
                    num
                )
            ){

                candidates.push(num);

            }

        }

        return candidates;
    }

    // Hint System
    getHint(
        currentBoard,
        solutionBoard
    ){

        let emptyCells = [];

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

                if(
                    currentBoard[row][col] === 0
                ){

                    emptyCells.push({
                        row,
                        col
                    });

                }

            }

        }

        if(
            emptyCells.length === 0
        ){
            return null;
        }

        const randomCell =
            emptyCells[
                Math.floor(
                    Math.random()
                    * emptyCells.length
                )
            ];

        return {

            row:
                randomCell.row,

            col:
                randomCell.col,

            value:
                solutionBoard[
                    randomCell.row
                ][
                    randomCell.col
                ],

            message:
                `Try Row ${
                    randomCell.row + 1
                }, Column ${
                    randomCell.col + 1
                }`

        };

    }

    // Check board complete
    isBoardComplete(board){

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

                if(
                    board[row][col] === 0
                ){
                    return false;
                }

            }

        }

        return true;
    }

    // Compare solution
    checkSolution(
        currentBoard,
        solutionBoard
    ){

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

                if(
                    currentBoard[row][col]
                    !==
                    solutionBoard[row][col]
                ){

                    return false;

                }

            }

        }

        return true;
    }

}

// Global instance
const sudokuGenerator =
    new SudokuGenerator();