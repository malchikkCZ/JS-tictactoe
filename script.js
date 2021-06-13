var game;
var player;
var computer;
const grid = document.getElementById("grid");
const infobox = document.getElementById("infobox")


class Board {
    constructor() {
        this.board = [];
        for (var row=0; row<3; row++) {
            this.board.push([]);
            for (var col=0; col<3; col++) {
                var cell = document.createElement("button");
                cell.setAttribute("onclick", "player.putStone(this)");
                cell.setAttribute("class", "gridBtn");
                grid.appendChild(cell);
                grid.style.display = "grid";
                this.board[row].push(cell);
            }      
        }
        infobox.style.display = "none";
    }

    possibleMoves() {
        var possibleMoves = [];
        for (var row=0; row<3; row++) {
            for (var col=0; col<3; col++) {
                if (game.board[row][col].innerHTML == "") {
                    possibleMoves.push(game.board[row][col]);
                }
            }
        }
        return possibleMoves;
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
        infobox.style.display = "flex";
    }
}

class Player {
    constructor(stone) {
        this.stone = stone;
    }

    putStone(cell) {
        cell.innerHTML = this.stone;
        cell.disabled = true;
        if (game.evaluate(this.stone) == true) {
            game.isOver("Player " + this.stone + " is a winner!");
        } else if (game.possibleMoves().length == 0) {
            game.isOver("It's a TIE!");
        } else {
            setTimeout(() => {computer.putStone(); }, 100);
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
        var possibleMoves = game.possibleMoves();
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }
}

class hardComputer extends easyComputer {
    constructor(stone) {
        super(stone);
    }

    getNextMove() {
        var possibleMoves = game.possibleMoves();
        if (possibleMoves.length == 9) {
            return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        } else {
            return this.findBestMove();
        }
    }

    findBestMove() {
        var bestScore = -999;
        for (var cell of game.possibleMoves()) {
            cell.innerHTML = this.stone;
            var score = this.minimax(0, false);
            cell.innerHTML = "";
            if (score > bestScore) {
                var bestMove = cell;
                bestScore = score;
            }
        }
        return bestMove;
    }

    minimax(depth, isMax) {
        if (this.stone == "X") {
            var otherStone = "O";
        } else {
            var otherStone = "X";
        }
        if (game.evaluate(this.stone) == true) {
            return (10 - depth);
        } else if (game.evaluate(otherStone) == true) {
            return (-10 + depth);
        } else if (game.possibleMoves().length == 0) {
            return 0;
        }
        if (isMax == true) {
            var bestScore = -999;
            for (var cell of game.possibleMoves()) {
                cell.innerHTML = this.stone;
                bestScore = Math.max(bestScore, this.minimax(depth+1, !(isMax)));
                cell.innerHTML = "";
            }
            return bestScore;
        } else {
            var bestScore = 999;
            for (var cell of game.possibleMoves()) {
                cell.innerHTML = otherStone;
                bestScore = Math.min(bestScore, this.minimax(depth+1, !(isMax)));
                cell.innerHTML = "";
            }
            return bestScore;
        }
    }
}

function newEasyGame() {
    grid.innerHTML = "";
    grid.style.display = "none";
    game = new Board();
    player = new Player("X");
    computer = new easyComputer("O");
}

function newHardGame() {
    grid.innerHTML = "";
    grid.style.display = "grid";
    game = new Board();
    player = new Player("X");
    computer = new hardComputer("O");
}
