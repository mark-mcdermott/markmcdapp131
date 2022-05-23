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
  // pixel = canWidth / 10.0;
  pixel = canWidth / 10;
  let frame = 0,
      speed = 125,
      // fontStyle = "18px Georgia",
  fontStyle = "30px Georgia",
      // colorI = '#1abc9c',
  // colorT = '#e67e22',
  // colorO = '#3498db',
  // colorJ = '#e74c3c',
  // colorL = '#9b59b6',
  // colorS = '#f1c40f',
  // colorZ = '#e97066',
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
      score = 0; // init blocks
  // function defs
  // helper functions - draw boxes & text to correct scale

  /*function strokeRec(x, y, w, h) {
    ctx.strokeRect(x * pixel, y * pixel, w * pixel, h * pixel);
  }*/
  // function fillText(text, x, y) {
  //   //console.log(text,x,y);
  //   //ctx.fillStyle = color;
  //   ctx.fillStyle = '#1abc9c';
  //   ctx.font="18px Georgia";
  //   //ctx.fillText("text", (x + 0.25) * pixel, (y + 0.75) * pixel);
  //   //ctx.fillText(text, (0 + 0.25) * pixel, (0 + 0.75) * pixel);
  //   ctx.fillText(text, (x + 0.25) * pixel, (y + 0.75) * pixel);
  //   //ctx.strokeRect(x * pixel, y * pixel, w * pixel, h * pixel);
  //   //ctx.strokeRect(0 * pixel, 0 * pixel, 1 * pixel, 1 * pixel);
  // }
  // function drawPixel(x, y, color) {
  //   ctx.fillStyle = color;
  //   ctx.fillRect(x * pixel, y * pixel, 1 * pixel, 1 * pixel);
  // }

  function drawBlock(coords, numPix, emoji) {
    for (let i = 0; i < numPix; i++) {
      //ctx.fillStyle = color;
      //ctx.fillRect(coords[i][0] * pixel, coords[i][1] * pixel, 1 * pixel, 1 * pixel);
      // drawText(emoji) {
      //ctx.fillStyle = '#1abc9c';
      ctx.font = fontStyle;
      ctx.fillText(emoji, coords[i][0] * pixel, coords[i][1] * pixel); //fillText(emoji, coords[i][0] * pixel, coords[i][1] * pixel);
      //}
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
  // can copy emoji from http://unicode.org/emoji/charts/full-emoji-list.html#1f600
  // function drawText() {
  //     fillText("😀", 0, 0);
  // }


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
  } // function getColor(block) {
  //   let color;
  //   switch (block) {
  //     case 'I':
  //       color = colorI;
  //       break;
  //     case 'T':
  //       color = colorT;
  //       break;
  //     case 'O':
  //       color = colorO;
  //       break;
  //     case 'S':
  //       color = colorS;
  //       break;
  //     case 'Z':
  //       color = colorZ;
  //       break;
  //     case 'J':
  //       color = colorJ;
  //       break;
  //     case 'L':
  //       color = colorL;
  //       break;
  //   }
  //   return color;
  // }


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
          //let color = getColor(landed[i][j]);
          let emoji = getEmoji(landed[i][j]); //  drawPixel(j,i,color);
          //ctx.fillStyle = '#1abc9c';

          ctx.font = fontStyle;
          ctx.fillText(emoji, j * pixel, i * pixel);
        }
      }
    }
  }

  function drawFallingBlock() {
    if (fallingBlock) {
      //let color = getColor(fallingBlock.letter);
      drawBlock(fallingBlock.coords, fallingBlock.numPix, fallingBlock.emoji);
    }
  } // // check if fallen pieces have reached top
  // // if so clear board
  // function checkFullBoard() {
  //   let boardFull = false;
  //   for (let i=0; i<10; i++) {
  //     if (landed[0][i] === 1) {
  //       boardFull = true;
  //     }
  //   }
  //   if (boardFull) {
  //     for (let i=0; i<10; i++) {
  //       for (let j=0; j<20; j++) {
  //         landed[j][i] = 0;
  //       }
  //     }
  //   }
  // }


  function clearBoardAfterGameOver() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 20; j++) {
        landed[j][i] = 0;
      }
    }
  }

  function moveDownOrNewBlock() {
    //console.log(speed);
    if (frame % (speed / 5) === 0) {
      if (!fallingBlock) {
        spawnBlock();
      }
    }

    if (frame % speed === 0) {
      if (moveDown() === 'boardFull') {
        return 'boardFull';
      }
    }

    return 'spawned';
  }

  function checkSpeedUp() {
    //console.log(frame, speed);
    if (frame % 1000 === 0) {
      if (speed > 49) {
        //console.log('a');
        speed -= 25;
      }

      if (speed > 10 && speed < 50) {
        //console.log('b');
        speed -= 5;
      }
    }
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


  function processKeystroke(key) {
    if (!fallingBlock) {
      return;
    } // move block keyboard input


    switch (key) {
      case 38:
        // up arrow
        rotate();
        break;

      case 40:
        // down arrow
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
  } // function drawOnEvent(e) {
  //   draw();
  //   e.preventDefault();
  // }


  function resetForNewGame() {
    score = 0;
    speed = 125;
    updateScoreDisplay(score);
    clearBoardAfterGameOver();
  }

  function updateScoreDisplay(score) {
    gameScore.innerText = score;
  }

  function setInitialScore() {
    score = 0;
    updateScoreDisplay(score);
  }

  function updateRailsLeaderboard(userId, score) {
    const scoresApiUrl = '/api/scores/new'; // this is the post request the js uses to send the game score to rails when a game finished

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
    }

    clearBoardBetweenFrames(); //makeGrid();
    //drawText();

    drawLanded();
    drawFallingBlock();
    frame++;
    requestAnimationFrame(draw);
  } // event listeners
  // for testing - "next" button below board
  // (make sure moveDown() in draw() is uncommented)
  //document.getElementById("next").addEventListener("click", drawOnEvent);
  // event listener for all keystrokes


  document.onkeydown = function (e) {
    processKeystroke(e.keyCode);
  }; // start game


  setInitialScore();
  spawnBlock();
  sendFakeScoreRequest();
  draw(); // call main draw loop
})();

},{"./Block.js":1}]},{},[1,2]);
