let block = require("./Block.js");

(function(){

  // init vars
  const scoresApiUrl = '/api/scores/new';
  const canvas = document.getElementById("canvas");
  const gameScore = document.getElementById("gameScore");
  const currentUserId = document.getElementById("current-user-id");
  const userId = currentUserId.dataset.userId;
      ctx = canvas.getContext("2d"),
      canWidth = canvas.width,

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

      landed = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
      ],
      score = 0,
      level = 1,
      rowsCleared = 0;

  function drawBlock(coords, numPix, emoji) {
    for (let i=0; i<numPix; i++) {
      ctx.font=fontStyle;
      ctx.fillText(emoji, (coords[i][0]) * pixel, (coords[i][1]) * pixel);
    }
  }

  // add a numbered grid to board.  for debugging
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

  function checkFullRows()
  {
    needToUpdateScoreDisplay = false;
    // check for any full rows
    for (let i=0; i<20; i++) {
      // goes down far left pixel from top of board to bottom
      // if far left pixel is a landed block, then it checks
      // that whole row to see if it's a full row ready to clear
      if (landed[i][0] !== 0) {
        let fullRow = true;
        for (let j=1; j<10; j++) {
          if (landed[i][j] === 0) {
            fullRow = false;
          }
        }
        if (fullRow) {
          score += 1000;
          rowsCleared += 1;
          level = Math.floor(rowsCleared / 10) + 1;
          needToUpdateScoreDisplay = true;
          // clear the found full row
          for (let j=0; j<10; j++) {
            landed[i][j] = 0;
          }

          /*

            not positive, but i think there's an
            intermittant bug here leaving certain
            pixels floating and not dropping when
            they should be dropped down one

          */
          for (let k=i-1; k>=0; k--) {
            for (let l=0; l<10; l++) {
              if (landed[k][l] !== 0) {
                landed[k+1][l] = landed[k][l];
                landed[k][l] = 0;
              }
            }
          }
        }
      }
    }
    return needToUpdateScoreDisplay ? true : false;
  }

  // move the falling block down
  function moveDown() {

    if (fallingBlock) {

      // check if block is touching bottom now
      let touchingFloor = false;
      for (let i=0; i<fallingBlock.coords.length && touchingFloor===false; i++) {
        if (fallingBlock['coords'][i][1] === 19) {
          touchingFloor = true;
        }
      }

      // check if touching another block
      // (this approach to collision detection from https://gamedevelopment.tutsplus.com/tutorials/implementing-tetris-collision-detection--gamedev-852 )
      let collision = false;
      if (!touchingFloor) {
        for (let coords of fallingBlock.coords) {
          const [ x, y ] = coords;
          if (landed[ y + 1 ][ x ] !== 0) {
            collision = true;
          }
        }
      }

      // if at floor or , add block's pixels to landed array
      if (touchingFloor || collision) {
        for (let coords of fallingBlock.coords) {
          const [ x, y ] = coords;
          if (y === 0) {
            return 'boardFull';
          }
          landed[y][x] = fallingBlock.letter;
        }
        fallingBlock = null;
        return 'cantMoveDown';
      } else {
        // lower the block
        for (let i=0; i<fallingBlock.coords.length; i++) {
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
          const [ x, y ] = coords;
          if ( (x > 0) && ( y >= 0) ) {
            //console.log(x+','+y+'   '+landed[y]);
            if (landed[ y ][ x - 1 ] !== 0) {
              collision = true;
            }
          }
        }

        if (!collision) {
          for (let i=0; i<fallingBlock.coords.length; i++) {
            fallingBlock['coords'][i][0]--;
          }

        }

      }
    }

    if (direction === 'right') {

      // TODO: run this check on every pixel in block, not just last
      // if not at right edge, move right
      let length = fallingBlock.coords.length;
      let lastPixel = fallingBlock['coords'][length-1];
      if (lastPixel[0] < 9) {

        // check if touching another block
        // (this approach to collision detection from https://gamedevelopment.tutsplus.com/tutorials/implementing-tetris-collision-detection--gamedev-852 )
        let collision = false;
        for (let coords of fallingBlock.coords) {
          const [ x, y ] = coords;
          if ( (x < 9) && (y>=0) ) {
            if (landed[ y ][ x + 1 ] !== 0) {
              collision = true;
            }
          }
        }

        if (!collision) {
          for (let i=0; i<fallingBlock.coords.length; i++) {
            fallingBlock['coords'][i][0]++;
          }
        }

      }
    }

  }

  // rotate block
  function rotate() {
    // todo: add collision detection
    fallingBlock.rotate();
  }

  // clear the whole board each frame to redraw all pieces in new pos
  function clearBoardBetweenFrames() {
    ctx.clearRect(0, 0, 10 * pixel, 20 * pixel);
  }

  // can copy emoji from http://unicode.org/emoji/charts/full-emoji-list.html#1f600
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
    }
    // return color;
    return emoji;
  }

  // draw all pieces that have hit the bottom
  // (this set grows as new pieces hit the bottom)
  function drawLanded() {
    for (let i=0; i<landed.length; i++) {
      for (let j=0; j<landed[i].length; j++) {
        if (landed[i][j] !== 0) {
          let emoji = getEmoji(landed[i][j]);
        ctx.font=fontStyle;
        ctx.fillText(emoji, j * pixel, i * pixel);
        }
      }
    }
  }

  function drawFallingBlock() {
    if (fallingBlock) {
      drawBlock(
        fallingBlock.coords,
        fallingBlock.numPix,
        fallingBlock.emoji
      );
    }
  }

  function clearBoardAfterGameOver() {
    for (let i=0; i<10; i++) {
      for (let j=0; j<20; j++) {
        landed[j][i] = 0;
      }
    }
  }

  function moveDownOrNewBlock() {
    //console.log(speed);
    // if (frame % (speed / 5) === 0) {
      if (frame % (speed) === 0) {
      if (!fallingBlock) {
        spawnBlock(4);
      }
    }
    // console.log(frame % speed);
    if (frame % speed === 0) {
      if (moveDown() === 'boardFull') {
        return 'boardFull';
      }
    }
    return 'spawned';
  }

  function checkSpeedUp() {

    speed = initialSpeed - level * 2;
  }

  // spawns new block at top
  // (todo: x-pos will be random & will account for block width
  //        so not over either edge)
  // this falling var couldn't be seen by the other functions
  // (scoping issues), so scrapping for now...
  function spawnBlock(debugBlockNum) {

    let blockType;
    let x;
    let numBlock;

    if (debugBlockNum) {
      numBlock = debugBlockNum;
    } else {
      numBlock = Math.floor(Math.random() * 7);
    }

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
  }

  // process all keystrokes
  function processKeystroke(e) {
    key = e.keyCode;

    if (!fallingBlock) {
      return;
    }

    // move block keyboard input
    switch (key) {

      case 38:  // up arrow
        e.preventDefault();
        rotate();
        break;
      case 40:  // down arrow
        e.preventDefault();
        moveDown();
        break;
      case 39:  // right arrow
        moveSide('right');
        break;
      case 37:  // left arrow
        moveSide('left');
        break;
    }
  }

  function resetForNewGame() {
    score = 0;
    level = 1;
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
    colors = ['#ffeaa7','#81ecec','#74b9ff','#a29bfe','#ffeaa7','#fab1a0','#ff7675','#fd79a8','#fdcb6e','#e17055','#d63031','#e84393'];
    ctx.fillStyle = colors[level - 1];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function checkLevel() {
    return Math.floor(rowsCleared / 10);
  }

  // score post request game sends to rails after a game
  function updateRailsLeaderboard(userId,score) {
    console.log('in post request')
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', scoresApiUrl);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    xhr.onload = function () { console.log('Scores API post request success'); };
    xhr.send(JSON.stringify({ score: { "val": score, "user_id": userId }}));
  }

  function sendFakeScoreRequest() {
    updateRailsLeaderboard(1,1000);
  }

  // main draw loop (calls itself recursively at end)
  function draw() {
    checkSpeedUp();
    if (moveDownOrNewBlock() === 'boardFull') {
      updateRailsLeaderboard(userId,score);
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
  }

  // event listener for all keystrokes
  document.onkeydown = function(e) {
    processKeystroke(e);
  };

  // start game
  setInitialStats();
  spawnBlock(4);
  draw();  // call main draw loop

})();
