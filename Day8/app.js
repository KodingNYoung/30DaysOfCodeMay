class Player{
    constructor(id){
        this.id= id;
        this.cellList = [];
        this.playName = `player${this.id}`;
    }

    pushToCellList(cellNo){
        this.cellList.push(cellNo);
    }

    checkIfWin(){
        const [V1, V2, V3] = [[1,4,7], [2,5,8], [3,6,9]],
              [H1, H2, H3] = [[1,2,3], [4,5,6], [7,8,9]],
              [D1, D2] = [[1,5,9], [3,5,7]];
        
        if (Player.hasWon(V1, this.cellList) || Player.hasWon(V2, this.cellList) || Player.hasWon(V3, this.cellList) || Player.hasWon(H1, this.cellList) || Player.hasWon(H2, this.cellList) || Player.hasWon(H3, this.cellList) || Player.hasWon(D1, this.cellList) || Player.hasWon(D2, this.cellList)){
            console.log("win")
        }else{
            return false;
        }
    }

    // showWinMessage(){
    //     document.createElement("p");


    // }

    static hasWon(winningCells, playedCellList){
        if (playedCellList.includes(winningCells[0]) && playedCellList.includes(winningCells[1]) && playedCellList.includes(winningCells[2])){
            return true;
        }else{
            return false;
        }
    } 

}

let count = 0;

const player1 = new Player(1),
      player2 = new Player(2);


document.querySelector(".game").addEventListener("click", playGame);



function playGame(e){
    // if there is a value in that cell, don't do anything
    if (e.target.value) return;

    count += 1;
    if (count%2 === 1){
        player1.pushToCellList(e.target.id);
        e.target.value = "X";

        player1.checkIfWin();
            // console.log("won");
            // this.showWinMessage();
    }


    // else if(count%2 ===0){
    //     player2.pushToCellList(e.target.id);
    //     e.target.value = "O";
    // }
}

