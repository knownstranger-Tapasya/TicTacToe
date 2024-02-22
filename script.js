const cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "X";
const result = document.querySelector('.result');
const resetButton = document.querySelector('#reset');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return { winner: cells[a], cells: condition };
        }
    }
    return null;
}

function drawLine(cells) {
    const [cell1, cell2, cell3] = cells;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const cellElements = cells.map(cell => document.getElementById(`cell${cell}`));
    const cellRects = cellElements.map(cell => cell.getBoundingClientRect());

    const centerX = (cellRects[0].left + cellRects[2].right) / 2;
    const centerY = (cellRects[0].top + cellRects[2].bottom) / 2;

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.moveTo(cellRects[0].left, cellRects[0].top);
    ctx.lineTo(cellRects[2].right, cellRects[2].bottom);
    ctx.stroke();
}

function handleClick(index) {
    if (cells[index] !== '' || checkWinner()) return;

    cells[index] = currentPlayer;
    renderBoard();

    const winner = checkWinner();
    if (winner) {
        result.textContent = `Player ${winner.winner} wins!`;
        drawLine(winner.cells);
        resetButton.disabled = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        result.textContent = `Player ${currentPlayer} Turn`;
    }
}

function renderBoard() {
    const cellElements = document.querySelectorAll('.cell');
    cells.forEach((value, index) => {
        cellElements[index].textContent = value;
    });
}

function resetGame() {
    cells.fill('');
    currentPlayer = 'X';
    result.textContent = 'Player X Turn';
    renderBoard();
    resetButton.disabled = true;
    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.remove();
    }
}

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

resetButton.addEventListener('click', resetGame);

resetGame();