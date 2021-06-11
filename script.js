class Board {
    constructor() {
        for (var i=0; i<9; i++) {
            var cell = document.createElement("button");
            cell.setAttribute("onclick", "player.putStone("+i+")");
            cell.setAttribute("id", "cell"+i);
            document.getElementById("grid").appendChild(cell)
        }
    }
}

class Player {
    constructor(stone) {
        this.stone = stone;
    }

    putStone(i) {
        document.getElementById("cell"+i).innerHTML = this.stone;
        document.getElementById("cell"+i).disabled = true;
        computer.putStone()
    }
}

class Computer extends Player {
    constructor(stone) {
        super(stone);
    }

    putStone() {
        var i = this.getNextMove();
        document.getElementById("cell"+i).innerHTML = this.stone;
        document.getElementById("cell"+i).disabled = true;
    }

    getNextMove() {
        var empty = Math.floor(Math.random() * 8);
        while (document.getElementById("cell"+empty).disabled == true) {
            empty = Math.floor(Math.random() * 8);
        }
        return empty;
    }
}

var board = new Board();
var player = new Player("X");
var computer = new Computer("O");
