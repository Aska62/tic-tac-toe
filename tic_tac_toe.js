let player1 = '';
let player2 = '';
const allFields = document.querySelectorAll('.field');
const message = document.querySelector('.msg');

const Gameboard = (player1, player2) => {
    let occupied = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let turnCount = 0;
    let gameSet = false;

    // Players take turn
    let playerOnTurn = "";
    const setPlayer = () => {
        if (turnCount % 2 === 0) {
            playerOnTurn = player1;
        } else {
            playerOnTurn = player2;
        }
        message.textContent = `${playerOnTurn}'s Turn!`;
        // Count turn
        turnCount++;
        return playerOnTurn;
    };

    // Check if the player won
    const checkWinner = () => {
        for (let i = 0; i <= 2; i++) {
            if (occupied[i] === playerOnTurn) {
                if (occupied[i+3] === playerOnTurn && occupied[i+6] === playerOnTurn) {
                    gameSet = true;
                }
            }
        };
        for (let i = 0; i <= 6; i += 3) {
            if (occupied[i] === playerOnTurn) {
                if (occupied[i+1] === playerOnTurn && occupied[i+2] === playerOnTurn) {
                    gameSet = true;
                }
            }
        };
        if (occupied[4] === playerOnTurn) {
            if ((occupied[0] === playerOnTurn && occupied[8] === playerOnTurn) || (occupied[2] === playerOnTurn && occupied[6] === playerOnTurn)) {
                gameSet = true;
            }
        };
    }

    // print winner if any
    const printWinner = () => {
        if (gameSet) {
            console.log(occupied);
            message.textContent = `${playerOnTurn} Won!`;
        } else {
            console.log(occupied);
            setPlayer();
        }
    };

    // Main func to start game
    const play = () => {
        setPlayer();
        // Take player's input
        allFields.forEach((field) => {
            let select = 0;
            field.addEventListener('click', () => {
                select = field.getAttribute('id');
                // Store the input
                occupied[select] = playerOnTurn;
                // Show 'x' or 'o' in the selected field
                const i = document.createElement('i');
                if (playerOnTurn === player1) {
                    i.setAttribute('class', 'fas fa-times');
                } else {
                    i.setAttribute('class', 'far fa-circle')
                };
                field.appendChild(i);
                // Check if there is a winner and print if any
                checkWinner();
                printWinner(gameSet, playerOnTurn);
            })
        });
        // const select = Number(prompt(`${playerOnTurn}'s turn. Input field number 0 to 8`));
    }
    return {occupied, turnCount, gameSet, play}
};

// Start new game by pressing 'start' button
const startBtn = document.querySelector('.startBtn');
startBtn.addEventListener('click', () => {
    // Get players' name
    player1 = prompt('Player1: ');
    player2 = prompt('Player2: ');
    const Game = Gameboard(player1, player2);
    return (Game.play());
});

// TODO 
const clearBtn = document.querySelector('.clearBtn');
clearBtn.addEventListener('click', () => {
    // Clear previous input if any
    if (player1 !== '') {
        allFields.forEach((field) => {
            // const prev = document.querySelectorAll('i');
            field.removeChild(field.lastElementChild);
        })
    };
})