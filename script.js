const player1 = document.getElementById('p1');
const player2 = document.getElementById('p2');
const btn = document.querySelectorAll('.btn');
const modal = document.getElementById('reset-modal');
const resetBtn = document.getElementById('reset-button');
const winnerText = document.getElementById('winner');
const p1Progress = [];
const p2Progress = [];
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

let currentPlayer ;
let winner = false;



btn.forEach((button, index) => {     
    button.addEventListener('click', () => {
       if (checkSelected(button) !== true){console.log(index);       
        recordChoice(index);
        winningCombo();
        if (winner === false) {
            switchPlayer();
            highlightPlayer();
        }} else {console.log('already selected');}
       
    });
    
}); 

function checkSelected(button) {
    if (button.classList.contains('selected')) {
        return true;
    } else if (currentPlayer === 2){ 
        button.classList.add('selected'); 
        button.classList.add('player2');
        button.disabled = true;
        button.innerHTML = '<img src="images/o.svg" alt="O">';
    }else {
        button.classList.add('selected'); 
        button.classList.add('player1');
        button.disabled = true;
        button.innerHTML = '<img src="images/x.svg" alt="X">';
    }
}




function startingPlayer() {
    let choice = Math.floor(Math.random() * 2);
    
    if (choice === 0) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
    highlightPlayer();
    return currentPlayer;
}

function highlightPlayer() {
    if (currentPlayer === 1) {
        player1.classList.add('active');
        player2.classList.remove('active');
    } else {
        player2.classList.add('active');
        player1.classList.remove('active');
    }
}

function resetGame() {
    p1Progress.length = 0;
    p2Progress.length = 0;
    currentPlayer = null;
    winner = false;
    modal.style.display = "none";
    btn.forEach((button) => {
        button.classList.remove('selected');
        button.classList.remove('player1');
        button.classList.remove('player2');
        button.disabled = false;
        button.innerHTML = '';
    
    });
    startingPlayer();
}




function switchPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
    } else {
        currentPlayer = 1;
    }
    return currentPlayer;
}

function recordChoice(index){
    if (currentPlayer === 1) {
    // player1.classList.add('active');
    p1Progress.push(index);
    console.log([p1Progress] + ' p1');
} else {
    // player2.classList.add('active');
    p2Progress.push(index);
    console.log([p2Progress] + 'p2');
}
};


function isWinningCombo(playerProgress) {
    return winningCombinations.some(combo => 
        combo.every(index => playerProgress.includes(index))
    );
}


function winningCombo() {
    if (isWinningCombo(p1Progress)) {
        winner = true;
        console.log('Player 1 wins');
        btn.forEach((button) => {
            button.disabled = true;});
        modal.style.display = "block";
        winnerText.innerHTML = 'Player 1 Wins!';
    } else if (isWinningCombo(p2Progress)) {
        winner = true;
        console.log('Player 2 wins');
        btn.forEach((button) => {
            button.disabled = true;});
        modal.style.display = "block";
        winnerText.innerHTML = 'Player 2 Wins!';
    } else if (p1Progress.length + p2Progress.length === 9) {
        console.log('Draw');
        modal.style.display = "block";
        winnerText.innerHTML = 'It\'s a Draw!';
    }
}

resetBtn.addEventListener('click', resetGame);

startingPlayer();