let playerOneCells =[],
    playerTwoCells =[],
    count =0,
    gameOverStatus;

// winning cells
const winningCells = [V1, V2, V3, H1, H2, H3, D1, D2]
                   = [[1,4,7], [2,5,8], [3,6,9], [1,2,3], [4,5,6], [7,8,9],[1,5,9], [3,5,7]];

const inputList = Array.from(document.querySelector(".game").children);

document.querySelector(".game").addEventListener("click", playGame);


// function playGame
function playGame(e){
    if (e.target.value) return;

    count += 1;
    if (count%2 === 1){
        e.target.value = "X";
        playerOneCells.push(Number(e.target.id))
    }else if (count%2 === 0){
        e.target.value = "O";
        playerTwoCells.push(Number(e.target.id))
    }
    
    // console.log(playerOneCells)
    // check the 2 player if they won
    let playerOneWins = playerWon(playerOneCells, "player1"),
          playerTwoWins = playerWon(playerTwoCells, "player2");

    // console.log(playerOneWins, playerTwoWins)


    console.log(count, playerOneWins, playerTwoWins);
    if (count === 9 && playerOneWins === false && playerTwoWins === false){
        gameOverStatus= "draw";

    }else if(playerOneWins === true){
        gameOverStatus = "Player1 wins!";
    }else if(playerTwoWins === true){
        gameOverStatus = "Player2 wins!";
    }
    
    if (gameOverStatus){
        setTimeout(gameOver, 3000)
        // console.log(gameOverStatus);
        count = 0;
        playerOneWins = false;
        playerTwoWins = false;
    }
}

function gameOver(){
    setTimeout(inputList.forEach(function(input){
        input.value = "";
    }), 3000);

    
}

function playerWon(playerCells, player){
    for(let i=0; i< winningCells.length; i++){
        if (!(playerCells.includes(winningCells[i][0]) && playerCells.includes(winningCells[i][1]) && playerCells.includes(winningCells[i][2]))){
            continue
        }else{
            return true;
        }
    }
    return false   
}
     

