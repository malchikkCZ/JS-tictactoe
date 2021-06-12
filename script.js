class Board {
    constructor() {
        this.board = [];
        for (var row=0; row<3; row++) {
            this.board.push([]);
            for (var col=0; col<3; col++) {
                var cell = document.createElement("button");
                cell.setAttribute("onclick", "player.putStone("+row+","+col+")");
                cell.setAttribute("id", "cell"+row+col);
                document.getElementById("grid").appendChild(cell);
                this.board[row].push(cell);
            }
      
        }
        document.getElementById("gameOver").style.display = "none";
    }

    movesLeft() {
        for (var row of this.board) {
            for (var col of row) {
                if (col.disabled == false) {
                    return true;
                }
            }
        }
        return false;
    }

    evaluate(stone) {
        // check rows

        // check cols

        // check diags

    }

    isOver(result) {
        document.getElementById("result").innerHTML = result;
        document.getElementById("gameOver").style.display = "block";
    }
}

class Player {
    constructor(stone) {
        this.stone = stone;
    }

    putStone(row, col) {
        game.board[row][col].innerHTML = this.stone;
        game.board[row][col].disabled = true;
        if (game.movesLeft() == true) {
            computer.putStone();
        } else {
            game.isOver("It's a TIE!")
        }
        
    }
}

class Computer extends Player {
    constructor(stone) {
        super(stone);
    }

    putStone() {
        var cell = this.getNextMove();
        
        cell.innerHTML = this.stone;
        cell.disabled = true;
    }

    getNextMove() {
        var possibleMoves = [];
        for (var row=0; row<3; row++) {
            for (var col=0; col<3; col++) {
                if (game.board[row][col].disabled == false) {
                    possibleMoves.push(game.board[row][col]);
                }
            }
        }
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    }
}

function newGame() {
    document.getElementById("grid").innerHTML = "";
    game = new Board();
}

var game = new Board();
var player = new Player("X");
var computer = new Computer("O");
