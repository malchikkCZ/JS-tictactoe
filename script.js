class Board {
    constructor() {
        this.board = [];
        for (var row=0; row<3; row++) {
            this.board.push([]);
            for (var col=0; col<3; col++) {
                var cell = document.createElement("button");
                cell.setAttribute("onclick", "player.putStone("+row+","+col+")");
                cell.setAttribute("id", "cell"+row+col);
                cell.setAttribute("class", "gridBtn");
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
        for (var row of this.board) {
            if (row.filter(x => x.innerHTML == stone).length == 3) {
                return true;
            }
        }
        // check cols
        var transponed = [];
        for (var col=0; col<3; col++) {
            var column = [];
            for (var row=0; row<3; row++) {
                column.push(this.board[row][col]);
            }
            transponed.push(column);
        }
        for (var row of transponed) {
            if (row.filter(x => x.innerHTML == stone).length == 3) {
                return true;
            }
        }
        // check diags
        var diag1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
        var diag2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
        if ((diag1.filter(x => x.innerHTML == stone).length == 3) || (diag2.filter(x => x.innerHTML == stone).length == 3)) {
            return true;
        }
        return false;
    }

    isOver(result) {
        for (var row of this.board) {
            for (var cell of row) {
                cell.disabled = true;
            }
        }
        document.getElementById("result").innerHTML = result;
        document.getElementById("gameOver").style.display = "flex";
    }
}

class Player {
    constructor(stone) {
        this.stone = stone;
    }

    putStone(row, col) {
        game.board[row][col].innerHTML = this.stone;
        game.board[row][col].disabled = true;
        if (game.evaluate(this.stone) == true) {
            game.isOver("Player " + this.stone + " is a winner!")
        } else if (game.movesLeft() == true) {
            computer.putStone();
        } else {
            game.isOver("It's a TIE!")
        }        
    }
}

class easyComputer extends Player {
    constructor(stone) {
        super(stone);
    }

    putStone() {
        var cell = this.getNextMove();
        
        cell.innerHTML = this.stone;
        cell.disabled = true;
        if (game.evaluate(this.stone) == true) {
            game.isOver("Player " + this.stone + " is a winner!")
        }
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
var computer = new easyComputer("O");
