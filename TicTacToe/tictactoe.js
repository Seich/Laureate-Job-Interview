/*
 *   __  ____        ______  ____  
 *  |  \/  \ \      / /  _ \/ ___| 
 *  | |\/| |\ \ /\ / /| |_) \___ \ 
 *  | |  | | \ V  V / |  __/ ___) |
 *  |_|  |_|  \_/\_/  |_|   |____/ 
 *  Martian Wabbit Productions (c) All Rights Reserved 2012.
 *
 */

window.onload = function() {
  (function(){
  var turn = true;

  var board = {
    // Grab the canvas and initialize the board.
    init: function() {
      turn = true;

      this.canvas = document.getElementById('board');
      this.restartButton = document.getElementById('restart');
      this.newButton = document.getElementById('new');

      // Drawing context.
      this.c = this.canvas.getContext('2d');

      // Clear the screen
      this.c.clearRect(0, 0, 500, 500);

      // Initialize the board's matrix.
      this.boardMatrix = [['-', '-', '-'],
                          ['-', '-', '-'],
                          ['-', '-', '-']];
      // Set draw color to gray.
      this.c.fillStyle = "gray";

      // Draw Vertical Lines.
      this.c.fillRect((this.canvas.width / 3), 0, 5, this.canvas.height);
      this.c.fillRect((this.canvas.width / 3) * 2, 0, 5, this.canvas.height);

      // Draw Horizontal Lines.
      this.c.fillRect(0, this.canvas.height / 3, this.canvas.width, 5);
      this.c.fillRect(0, (this.canvas.height / 3) * 2, this.canvas.width, 5);
    
      // Reset draw color to black.
      this.c.fillStyle = "black";

      // Attach click events
      if (document.addEventListener) {
        this.canvas.addEventListener('click', this.clickEvent, false);
        this.restartButton.addEventListener('click', this.clickRestart, false);
        this.newButton.addEventListener('click', this.clickNew, false);
      } else {
        this.canvas.attachEvent('onclick', this.clickEvent, false);
        this.restartButton.attachEvent('onclick', this.clickRestart, false);
        this.newButton.attachEvent('onclick', this.clickNew, false);
      }
    },

    clickNew: function(e) {
      board.init();
      document.getElementById("X").innerHTML = 0;
      document.getElementById("O").innerHTML = 0;
    },

    clickRestart: function(e) {
      board.init();
    },
   
    // Handle the Board's click event.
    clickEvent: function(e) {
      var x;
      var y;
      
      // Check if it's Firefox.
      if (e.x != undefined && e.y != undefined) {
        x = e.x;
        y = e.y;
        // Firefox fix
      } else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
      // Calculate the mouse position on the canvas element.
      x -= board.canvas.offsetLeft;
      y -= board.canvas.offsetTop;
      
      // Grab the sector the click was on.
      var sector = board.getSector(x, y);

      // Don't do anything if the clicked sector is filled.
      if (board.boardMatrix[sector.x - 1][sector.y - 1] != '-') {
        return;
      }

      if (turn) {
        board.drawX(sector);
        board.boardMatrix[sector.x - 1][sector.y - 1] = 'X';
      } else {
        board.drawO(sector);
        board.boardMatrix[sector.x - 1][sector.y - 1] = 'O';
      }
      
      // Check if the game ended.
      board.gameEnded(sector);

      // Change player.
      turn = !turn;
    },
    
    // Get the sector in which x and y are positioned.
    getSector: function(x, y) {
      var sx;
      var sy;
      
      var firstBoundary = this.canvas.width/3;
      var secondBoundary = firstBoundary * 2;

      // Find x's Sector.
      if (x >= 0 && x <= firstBoundary) {
        sx = 1;
      } else if (x >= firstBoundary && x <= secondBoundary) {
        sx = 2;
      } else {
        sx = 3;
      }
   
      // Find y's Sector.
      if (y >= 0 && y <= firstBoundary) {
        sy = 1;
      } else if (y >= firstBoundary && y <= secondBoundary) {
        sy = 2;
      } else { 
        sy = 3;
      }
      
     return {x: sx, y: sy};
    },

    // Check the board to see if the game has ended already.
    gameEnded: function(sector) {
      sector.x--;
      sector.y--;
      var player = this.boardMatrix[sector.x][sector.y];
      var victory = true;

      // check horizontal lines
      for (i = 0; i < 3; i++) {
        if (this.boardMatrix[i][sector.y] != player) {
          victory = false;
        }
      }

      if (victory) {
        alert(player + " won.");
        this.addPoint(player);
        this.init();
        return;
      }

      victory = true;
      // check vertical lines
      for (i = 0; i < 3; i++) {
        if (this.boardMatrix[sector.x][i] != player) {
          victory = false;
        }
      }
      
      if (victory) {
        alert(player + " won.");
        this.addPoint(player);
        this.init();
        return;
      }

      // Check first diagonal "\"
      if (sector.x == sector.y) {
        victory = true;
        for (i = 0; i < 3; i++) {
          if (this.boardMatrix[i][i] != player) {
            victory = false;
          }
        }

        if (victory) {
          alert(player + " won.");
          this.addPoint(player);
          this.init();
          return;
        }
      }

      // Check second diagonal "/"
      if ((sector.x + sector.y) == 2) {
        victory = true;
        for (i = 0; i < 3; i++) {
          if (this.boardMatrix[i][2 - i] != player) {
            victory = false;
          }
        }

        if (victory) {
          alert(player + " won.");
          this.addPoint(player);
          this.init();
          return;
        }
      }

      if (this.boardFull()) {
        alert("Tie.");
        this.init();
        return;
      }
    },

    boardFull: function() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if(this.boardMatrix[i][j] == '-') {
            return false;
          }
        }
      }
      return true;
    },

    addPoint: function(player) {
      document.getElementById(player).innerHTML = parseInt(document.getElementById(player).innerHTML) + 1;
    },

    // Draw an 'x' on the given sector.
    drawX: function(sector) {
      var boxSize = this.canvas.width / 3;
      var offset = boxSize / 5;

      this.c.strokeStyle = 'blue';
      this.c.lineWidth = 10;
      this.c.lineCap = 'round';

      // Draw "\" The first diagonal.
      this.c.beginPath();
      this.c.moveTo(boxSize * sector.x - boxSize + offset, 
                    boxSize * sector.y - boxSize + offset);

      this.c.lineTo(boxSize * sector.x - offset, 
                    boxSize * sector.y - offset);

      this.c.stroke();
      this.c.closePath();

      // Draw "/" The second diagonal.
      this.c.beginPath();
      this.c.moveTo(boxSize * sector.x - offset,
                    boxSize * sector.y - boxSize + offset);

      this.c.lineTo(boxSize * sector.x - boxSize + offset,
                    boxSize * sector.y - offset);

      this.c.stroke();
      this.c.closePath();

      // Reset the context to the defaults.
      this.c.lineCap = 'butt';
      this.c.lineWidth = 1;
    },
    // Draw an 'o' on the given Sector.
    drawO: function(sector) {
      var boxSize = this.canvas.width / 3;
      var offset = boxSize / 2;  
      
      this.c.strokeStyle = 'red';
      this.c.lineWidth = 10;
      this.c.beginPath();
      // Draw a circle.
      this.c.arc(
                  boxSize * sector.x - offset, // x
                  boxSize * sector.y - offset, // y
                  50, // radius
                  0, Math.PI * 2, false);
      this.c.closePath();
      this.c.stroke();
      this.c.lineWidth = 1;
    }
  };

  board.init();
})();
}
