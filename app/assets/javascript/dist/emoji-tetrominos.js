(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// -------------------------------------------------------------
// --------------------- Block Class ---------------------------
// -------------------------------------------------------------
// Blocks have letter name: I, T, J, L & O (http://i.imgur.com/9Z0oJXe.png)
// All block movement/collision calculated from block coordiates
// Blocks are made of 4 "pixels"
// First block "pixel" is top left pixel
// Subsequent block coordinates are calculated from first pixel
// Rotations based on NES controls (http://imgur.com/a/IVRrf)
// For collision detection, make first coordinate pair in coords
// array the block's far left pixel.  Make the last coorinate
// coordinate pair the far right pixel.
module.exports = class Block {
  // block constructor (needs block letter & initial coords)
  constructor(letter, x, y) {
    this.letter = letter.toUpperCase();
    this[`_init${this.letter}`](x, y);
  } // init L block (needs its initial coords)


  _initL(x, y) {
    this.height = 2; // L block height (for floor/block collision)

    this.width = 3; // L block width (for wall collision)

    this.numPix = 4; // num pixels in L block

    this.curRotation = 0; // current pos in rotations array

    this.emoji = "😀";
    this.coords = [[x, y], [x, y + 1], [x + 1, y], [x + 2, y]];

    this.rotate = function () {
      // gets current x & y
      let x = this.coords[0][0];
      let y = this.coords[0][1]; // if L is vert, checks for collisions

      if (this.curRotation === 0 && y < 1 || this.curRotation === 1 && x < 1 || this.curRotation === 1 && x > 7 || this.curRotation === 3 && x < 1) {
        return;
      }

      if (x >= 0 && x < 9) {
        // advances curRotation (always 0 or 1)
        this.curRotation = (this.curRotation + 1) % 4; // rotates to new curRotation

        switch (this.curRotation) {
          /* down facing L block */
          case 0:
            this.coords = [[x - 1, y + 1], [x, y + 1], [x + 1, y + 1], [x - 1, y + 2]];
            break;

          /* left facing L block */

          case 1:
            this.coords = [[x, y - 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]];
            break;

          /* up facing L block */

          case 2:
            this.coords = [[x, y + 1], [x + 1, y + 1], [x + 2, y + 1], [x + 2, y]];
            break;

          /* right facing L block */

          case 3:
            this.coords = [[x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x + 2, y + 1]];
            break;
        }
      }
    };
  } // init J block (needs its initial coords)


  _initJ(x, y) {
    this.height = 2; // J block height (for floor/block collision)

    this.width = 3; // J block width (for wall collision)

    this.numPix = 4; // num pixels in J block

    this.curRotation = 0; // current pos in rotations array

    this.emoji = "💩";
    this.coords = [[x, y], [x + 1, y], [x + 2, y], [x + 2, y + 1]];

    this.rotate = function () {
      // gets current x & y
      let x = this.coords[0][0];
      let y = this.coords[0][1]; // if J is vert, checks for collisions

      if (this.curRotation === 0 && y < 1 || this.curRotation === 1 && x < 1 || this.curRotation === 1 && x > 7 || this.curRotation === 3 && x < 1) {
        return;
      }

      if (x >= 0 && x < 9) {
        // advances curRotation (always 0 or 1)
        this.curRotation = (this.curRotation + 1) % 4; // rotates to new curRotation

        switch (this.curRotation) {
          /* down facing J block */
          case 0:
            this.coords = [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1], [x + 1, y]];
            break;

          /* left facing J block */

          case 1:
            this.coords = [[x, y + 1], [x + 1, y + 1], [x + 1, y], [x + 1, y - 1]];
            break;

          /* up facing J block */

          case 2:
            this.coords = [[x, y - 2], [x, y - 1], [x + 1, y - 1], [x + 2, y - 1]];
            break;

          /* right facing J block */

          case 3:
            this.coords = [[x + 1, y + 2], [x + 1, y + 1], [x + 1, y], [x + 2, y]];
            break;
        }
      }
    };
  } // init Z block (needs its initial coords)


  _initZ(x, y) {
    this.height = 2; // Z block height (for floor/block collision)

    this.width = 3; // Z block width (for wall collision)

    this.numPix = 4; // num pixels in Z block

    this.curRotation = 0; // current pos in rotations array

    this.emoji = "🐶";
    this.coords = [[x, y], [x + 1, y], [x + 1, y + 1], [x + 2, y + 1]];

    this.rotate = function () {
      // gets current x & y
      let x = this.coords[0][0];
      let y = this.coords[0][1]; // if Z is vert, checks for collisions

      if (this.curRotation === 0 && y < 1) {
        return;
      }

      if (x >= 0 && x < 9) {
        // advances curRotation (always 0 or 1)
        this.curRotation = (this.curRotation + 1) % 2; // rotates to new curRotation

        switch (this.curRotation) {
          /* down facing Z block */
          case 0:
            this.coords = [[x, y], [x - 1, y], [x, y + 1], [x + 1, y + 1]];
            break;

          /* vert Z block */

          case 1:
            this.coords = [[x, y], [x, y + 1], [x + 1, y], [x + 1, y - 1]];
            break;
        }
      }
    };
  } // init S block (needs its initial coords)


  _initS(x, y) {
    this.height = 2; // S block height (for floor/block collision)

    this.width = 3; // S block width (for wall collision)

    this.numPix = 4; // num pixels in S block

    this.curRotation = 0; // current pos in rotations array

    this.emoji = "🐮";
    this.coords = [[x, y], [x + 1, y], [x + 1, y - 1], [x + 2, y - 1]];

    this.rotate = function () {
      // gets current x & y
      let x = this.coords[0][0];
      let y = this.coords[0][1]; // if S is vert, checks for collisions

      if (this.curRotation === 0 && y < 1) {
        return;
      }

      if (x >= 0 && x < 9) {
        // advances curRotation (always 0 or 1)
        this.curRotation = (this.curRotation + 1) % 2; // rotates to new curRotation

        switch (this.curRotation) {
          /* down facing S block */
          case 0:
            this.coords = [[x - 1, y + 1], [x, y + 1], [x, y], [x + 1, y]];
            break;

          /* vert S block */

          case 1:
            this.coords = [[x + 1, y - 1], [x + 1, y - 2], [x + 2, y - 1], [x + 2, y]];
            break;
        }
      }
    };
  } // init T block (needs its initial coords)


  _initT(x, y) {
    this.height = 2; // T block height (for floor/block collision)

    this.width = 3; // T block width (for wall collision)

    this.numPix = 4; // num pixels in T block

    this.curRotation = 0; // current pos in rotations array

    this.emoji = "🚔";
    this.coords = [[x, y], [x + 1, y], [x + 1, y + 1], [x + 2, y]];

    this.rotate = function () {
      // gets current x & y
      let x = this.coords[0][0];
      let y = this.coords[0][1]; // if T is vert, checks for collisions

      if (this.curRotation === 0 && y < 1 || this.curRotation === 1 && x > 7 || this.curRotation === 1 && x < 0 || this.curRotation === 3 && x < 1) {
        return;
      }

      if (x >= 0 && x < 9) {
        // advances curRotation (always 0 or 1)
        this.curRotation = (this.curRotation + 1) % 4; // rotates to new curRotation

        switch (this.curRotation) {
          /* down facing T block */
          case 0:
            this.coords = [[x - 1, y - 1], [x, y - 1], [x, y], [x + 1, y - 1]];
            break;

          /* left facing T block */

          case 1:
            this.coords = [[x, y], [x + 1, y], [x + 1, y - 1], [x + 1, y + 1]];
            break;

          /* up facing T block */

          case 2:
            this.coords = [[x, y], [x + 1, y], [x + 1, y - 1], [x + 2, y]];
            break;

          /* right facing T block */

          case 3:
            this.coords = [[x + 1, y + 1], [x + 1, y], [x + 1, y - 1], [x + 2, y]];
            break;
        }
      }
    };
  } // init I block (needs its initial coords)


  _initI(x, y) {
    this.height = 1; // I block height (for floor/block collision)

    this.width = 4; // I block width (for wall collision)

    this.numPix = 4; // num pixels in I block

    this.curRotation = 0; // current pos in rotations array

    this.emoji = "🚀";
    this.coords = [[x, y], [x + 1, y], [x + 2, y], [x + 3, y]];

    this.rotate = function () {
      // gets current x & y
      let x = this.coords[0][0];
      let y = this.coords[0][1]; // if I is vert, checks for collisions

      if (this.curRotation === 0 && y < 2 || this.curRotation === 1 && x < 2) {
        return;
      }

      if (x >= 0 && x < 9) {
        // advances curRotation (always 0 or 1)
        this.curRotation = (this.curRotation + 1) % 2; // rotates to new curRotation

        switch (this.curRotation) {
          /* vert I block */
          case 0:
            this.coords = [[x - 2, y + 2], [x - 1, y + 2], [x, y + 2], [x + 1, y + 2]];
            break;

          /* horiz I block */

          case 1:
            this.coords = [[x + 2, y - 2], [x + 2, y - 1], [x + 2, y], [x + 2, y + 1]];
            break;
        }
      }
    };
  } // init I block (needs its initial coords)


  _initO(x, y) {
    this.height = 2; // I block height (for floor/block collision)

    this.width = 2; // I block width (for wall collision)

    this.numPix = 4; // num pixels in I block

    this.curRotation = 0; // current pos in rotations array

    this.emoji = "🍆";
    this.coords = [[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]];

    this.rotate = function () {// no rotation on O block;
    };
  }

};

},{}],2:[function(require,module,exports){
let block = require("./Block.js");

(function () {
  // init vars
  const scoresApiUrl = '/api/scores/new';
  const canvas = document.getElementById("canvas");
  const gameScore = document.getElementById("gameScore");
  const currentUserId = document.getElementById("current-user-id");
  const userId = currentUserId.dataset.userId;
  ctx = canvas.getContext("2d"), canWidth = canvas.width,
  /*
     "Pixel" is unit of height/width, 1/10 width of board.
    Each block is made of 4 pixels.
   */
  // frame counter (needed for block entrance timing)
  pixel = canWidth / 10;
  let frame = 0,
      initialSpeed = 35,
      speed = initialSpeed,
      fontStyle = "30px Georgia",
      fallingBlock,

  /*
     2d array of board layout for keeping track
    of all "landed" blocks.
    Landed blocks are blocks that have hit
    the floor or hit other blocks collected at bottom.
     landed array is all 0's to start, since no
    blocks have hit the floor.  Every coordinate
    with a landed block will have that
    block's letter.
   */
  landed = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      score = 0,
      level = 1,
      rowsCleared = 0;

  function drawBlock(coords, numPix, emoji) {
    for (let i = 0; i < numPix; i++) {
      ctx.font = fontStyle;
      ctx.fillText(emoji, coords[i][0] * pixel, coords[i][1] * pixel);
    }
  } // add a numbered grid to board.  for debugging

  /*function makeGrid() {
    for (let i=0; i<10; i++) {
      strokeRec(i, 0, 1, 20);
    }
    for (let i=0; i<20; i++) {
      strokeRec(0, i, 10, 1);
    }
    for (let i=0; i<20; i++) {
      fillText(i, 0, i);
    }
    for (let i=1; i<10; i++) {
      fillText(i, i, 0);
    }
  }
  */


  function checkFullRows() {
    needToUpdateScoreDisplay = false; // check for any full rows

    for (let i = 0; i < 20; i++) {
      // goes down far left pixel from top of board to bottom
      // if far left pixel is a landed block, then it checks
      // that whole row to see if it's a full row ready to clear
      if (landed[i][0] !== 0) {
        let fullRow = true;

        for (let j = 1; j < 10; j++) {
          if (landed[i][j] === 0) {
            fullRow = false;
          }
        }

        if (fullRow) {
          score += 1000;
          rowsCleared += 1;
          level = Math.floor(rowsCleared / 10) + 1;
          needToUpdateScoreDisplay = true; // clear the found full row

          for (let j = 0; j < 10; j++) {
            landed[i][j] = 0;
          }
          /*
             not positive, but i think there's an
            intermittant bug here leaving certain
            pixels floating and not dropping when
            they should be dropped down one
           */


          for (let k = i - 1; k >= 0; k--) {
            for (let l = 0; l < 10; l++) {
              if (landed[k][l] !== 0) {
                landed[k + 1][l] = landed[k][l];
                landed[k][l] = 0;
              }
            }
          }
        }
      }
    }

    return needToUpdateScoreDisplay ? true : false;
  } // move the falling block down


  function moveDown() {
    if (fallingBlock) {
      // check if block is touching bottom now
      let touchingFloor = false;

      for (let i = 0; i < fallingBlock.coords.length && touchingFloor === false; i++) {
        if (fallingBlock['coords'][i][1] === 19) {
          touchingFloor = true;
        }
      } // check if touching another block
      // (this approach to collision detection from https://gamedevelopment.tutsplus.com/tutorials/implementing-tetris-collision-detection--gamedev-852 )


      let collision = false;

      if (!touchingFloor) {
        for (let coords of fallingBlock.coords) {
          const [x, y] = coords;

          if (landed[y + 1][x] !== 0) {
            collision = true;
          }
        }
      } // if at floor or , add block's pixels to landed array


      if (touchingFloor || collision) {
        for (let coords of fallingBlock.coords) {
          const [x, y] = coords;

          if (y === 0) {
            return 'boardFull';
          }

          landed[y][x] = fallingBlock.letter;
        }

        fallingBlock = null;
        return 'cantMoveDown';
      } else {
        // lower the block
        for (let i = 0; i < fallingBlock.coords.length; i++) {
          fallingBlock['coords'][i][1]++;
        }
      }
    }

    return 'movedDown';
  }

  function moveSide(direction) {
    if (direction === 'left') {
      // if not at left edge, move left
      let firstPixel = fallingBlock['coords'][0];

      if (firstPixel[0] > 0) {
        // check if touching another block
        // (this approach to collision detection from https://gamedevelopment.tutsplus.com/tutorials/implementing-tetris-collision-detection--gamedev-852 )
        let collision = false;

        for (let coords of fallingBlock.coords) {
          const [x, y] = coords;

          if (x > 0 && y >= 0) {
            //console.log(x+','+y+'   '+landed[y]);
            if (landed[y][x - 1] !== 0) {
              collision = true;
            }
          }
        }

        if (!collision) {
          for (let i = 0; i < fallingBlock.coords.length; i++) {
            fallingBlock['coords'][i][0]--;
          }
        }
      }
    }

    if (direction === 'right') {
      // TODO: run this check on every pixel in block, not just last
      // if not at right edge, move right
      let length = fallingBlock.coords.length;
      let lastPixel = fallingBlock['coords'][length - 1];

      if (lastPixel[0] < 9) {
        // check if touching another block
        // (this approach to collision detection from https://gamedevelopment.tutsplus.com/tutorials/implementing-tetris-collision-detection--gamedev-852 )
        let collision = false;

        for (let coords of fallingBlock.coords) {
          const [x, y] = coords;

          if (x < 9 && y >= 0) {
            if (landed[y][x + 1] !== 0) {
              collision = true;
            }
          }
        }

        if (!collision) {
          for (let i = 0; i < fallingBlock.coords.length; i++) {
            fallingBlock['coords'][i][0]++;
          }
        }
      }
    }
  } // rotate block


  function rotate() {
    // todo: add collision detection
    fallingBlock.rotate();
  } // clear the whole board each frame to redraw all pieces in new pos


  function clearBoardBetweenFrames() {
    ctx.clearRect(0, 0, 10 * pixel, 20 * pixel);
  } // can copy emoji from http://unicode.org/emoji/charts/full-emoji-list.html#1f600


  function getEmoji(block) {
    // let color;
    let emoji;

    switch (block) {
      case 'I':
        // color = colorI;
        emoji = "🚀";
        break;

      case 'T':
        // color = colorT;
        emoji = "🚔";
        break;

      case 'O':
        // color = colorO;
        emoji = "🍆";
        break;

      case 'S':
        // color = colorS;
        emoji = "🐮";
        break;

      case 'Z':
        // color = colorZ;
        emoji = "🐶";
        break;

      case 'J':
        // color = colorJ;
        emoji = "💩";
        break;

      case 'L':
        // color = colorL;
        emoji = "😀";
        break;
    } // return color;


    return emoji;
  } // draw all pieces that have hit the bottom
  // (this set grows as new pieces hit the bottom)


  function drawLanded() {
    for (let i = 0; i < landed.length; i++) {
      for (let j = 0; j < landed[i].length; j++) {
        if (landed[i][j] !== 0) {
          let emoji = getEmoji(landed[i][j]);
          ctx.font = fontStyle;
          ctx.fillText(emoji, j * pixel, i * pixel);
        }
      }
    }
  }

  function drawFallingBlock() {
    if (fallingBlock) {
      drawBlock(fallingBlock.coords, fallingBlock.numPix, fallingBlock.emoji);
    }
  }

  function clearBoardAfterGameOver() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        landed[j][i] = 0;
      }
    }
  }

  function moveDownOrNewBlock() {
    //console.log(speed);
    // if (frame % (speed / 5) === 0) {
    if (frame % speed === 0) {
      if (!fallingBlock) {
        spawnBlock();
      }
    } // console.log(frame % speed);


    if (frame % speed === 0) {
      if (moveDown() === 'boardFull') {
        return 'boardFull';
      }
    }

    return 'spawned';
  }

  function checkSpeedUp() {
    speed = initialSpeed - level;
  } // spawns new block at top
  // (todo: x-pos will be random & will account for block width
  //        so not over either edge)
  // this falling var couldn't be seen by the other functions
  // (scoping issues), so scrapping for now...


  function spawnBlock() {
    let blockType;
    let x;
    const numBlock = Math.floor(Math.random() * 7);

    switch (numBlock) {
      case 0:
        blockType = 'i';
        x = Math.floor(Math.random() * (10 - 3));
        break;

      case 1:
        blockType = 'o';
        x = Math.floor(Math.random() * (10 - 2));
        break;

      case 2:
        blockType = 't';
        x = Math.floor(Math.random() * (10 - 2));
        break;

      case 3:
        blockType = 's';
        x = Math.floor(Math.random() * (10 - 2));
        break;

      case 4:
        blockType = 'z';
        x = Math.floor(Math.random() * (10 - 2));
        break;

      case 5:
        blockType = 'j';
        x = Math.floor(Math.random() * (10 - 2));
        break;

      case 6:
        blockType = 'l';
        x = Math.floor(Math.random() * (10 - 2));
        break;
    }

    const y = 0;
    fallingBlock = new block(blockType, x, y);
  } // process all keystrokes


  function processKeystroke(e) {
    key = e.keyCode;

    if (!fallingBlock) {
      return;
    } // move block keyboard input


    switch (key) {
      case 38:
        // up arrow
        e.preventDefault();
        rotate();
        break;

      case 40:
        // down arrow
        console.log('down!');
        e.preventDefault();
        moveDown();
        break;

      case 39:
        // right arrow
        moveSide('right');
        break;

      case 37:
        // left arrow
        moveSide('left');
        break;
    }
  }

  function resetForNewGame() {
    score = 0;
    level = 0;
    speed = 125;
    updateScoreDisplay(score);
    updateLevelDisplay(level);
    clearBoardAfterGameOver();
  }

  function updateScoreDisplay(score) {
    gameScore.innerText = score;
  }

  function updateLevelDisplay(level) {
    gameLevel.innerText = level;
  }

  function setInitialStats() {
    rowsCleared = 0;
    setInitialScore();
    setInitialLevel();
  }

  function setInitialScore() {
    score = 0;
    updateScoreDisplay(score);
  }

  function setInitialLevel() {
    level = 1;
    updateLevelDisplay(level);
  }

  function setBgColor(level) {
    colors = ['#ffeaa7', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7', '#fab1a0', '#ff7675', '#fd79a8', '#fdcb6e', '#e17055', '#d63031', '#e84393'];
    ctx.fillStyle = colors[level - 1];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function checkLevel() {
    return Math.floor(rowsCleared / 10);
  } // score post request game sends to rails after a game


  function updateRailsLeaderboard(userId, score) {
    console.log('in post request');
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', scoresApiUrl);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);

    xhr.onload = function () {
      console.log('Scores API post request success');
    };

    xhr.send(JSON.stringify({
      score: {
        "val": score,
        "user_id": userId
      }
    }));
  }

  function sendFakeScoreRequest() {
    updateRailsLeaderboard(1, 1000);
  } // main draw loop (calls itself recursively at end)


  function draw() {
    checkSpeedUp();

    if (moveDownOrNewBlock() === 'boardFull') {
      updateRailsLeaderboard(userId, score);
      resetForNewGame();
    }

    if (checkFullRows()) {
      updateScoreDisplay(score);
      updateLevelDisplay(level);
    }

    clearBoardBetweenFrames();
    setBgColor(level);
    drawLanded();
    drawFallingBlock();
    frame++;
    requestAnimationFrame(draw);
  } // event listener for all keystrokes


  document.onkeydown = function (e) {
    processKeystroke(e);
  }; // start game


  setInitialStats();
  spawnBlock();
  draw(); // call main draw loop
})();

},{"./Block.js":1}],3:[function(require,module,exports){
const scoresApiUrl = '/api/scores/new'; // this form submit listener on /api/scores/new is a test for the javascript sending the score in post 
// request to rails. you can go to /api/scores/new in your browser and fill in the form and click submit 
// to simulate the automatic call that will happen when a game ends and the js sends the score to rails

document.addEventListener("DOMContentLoaded", function (event) {
  if (document.getElementById('testScoresApiSubmit')) {
    const formElem = document.querySelector('form');
    formElem.addEventListener('submit', e => {
      e.preventDefault();
      const val = formElem.querySelector('input[name="score[val]"]').value;
      const user_id = formElem.querySelector('input[name="score[user_id]"]').value;
      console.log('val: ' + val + ', user_id: ' + user_id);
      scoresApiPostRequest(scoresApiUrl, val, user_id);
    });
  }
});

},{}]},{},[1,2,3]);
