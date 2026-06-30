// ======================================
// SOLVER BOARD
// ======================================

const board =
document.getElementById(
    "solver-board"
);

// ======================================
// CREATE GRID
// ======================================

function createGrid(){

    board.innerHTML = "";

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

            const input =
            document.createElement(
                "input"
            );

            input.type =
            "text";

            input.maxLength =
            1;

            input.classList.add(
                "solver-cell"
            );

            if(
                col === 2 ||
                col === 5
            ){
                input.classList.add(
                    "border-right"
                );
            }

            if(
                row === 2 ||
                row === 5
            ){
                input.classList.add(
                    "border-bottom"
                );
            }

            input.dataset.row =
            row;

            input.dataset.col =
            col;

            input.addEventListener(
                "input",
                () => {

                    if(
                        !/^[1-9]?$/
                        .test(input.value)
                    ){
                        input.value = "";
                    }

                }
            );

            board.appendChild(
                input
            );

        }

    }

}

// ======================================
// READ BOARD
// ======================================

function getBoardValues(){

    const cells =
    document.querySelectorAll(
        ".solver-cell"
    );

    let matrix = [];

    for(
        let row = 0;
        row < 9;
        row++
    ){

        matrix[row] = [];

        for(
            let col = 0;
            col < 9;
            col++
        ){

            const index =
            row * 9 + col;

            const value =
            Number(
                cells[index].value
            );

            matrix[row][col] =
            value || 0;

        }

    }

    return matrix;

}

// ======================================
// DISPLAY SOLUTION
// ======================================

function displayBoard(matrix){

    const cells =
    document.querySelectorAll(
        ".solver-cell"
    );

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

            const index =
            row * 9 + col;

            cells[index].value =
            matrix[row][col];

        }

    }

}

// ======================================
// SOLVE BUTTON
// ======================================

document
.getElementById(
    "solvePuzzle"
)
.addEventListener(
    "click",
    () => {

        const matrix =
        getBoardValues();

        const copy =
        matrix.map(
            row => [...row]
        );

        const solved =
        sudokuGenerator.solve(
            copy
        );

        if(solved){

            displayBoard(copy);

            alert(
                "Puzzle Solved!"
            );

        }
        else{

            alert(
                "No valid solution exists."
            );

        }

    }
);

// ======================================
// CLEAR BUTTON
// ======================================

document
.getElementById(
    "clearPuzzle"
)
.addEventListener(
    "click",
    () => {

        document
        .querySelectorAll(
            ".solver-cell"
        )
        .forEach(cell => {

            cell.value = "";

        });

    }
);

// ======================================
// INIT
// ======================================

createGrid();