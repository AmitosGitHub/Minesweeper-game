"use strict"

function buildBoard() {
  var board = []
  var levelRow = +gLevels.SIZE_ROW
  var levelCol = +gLevels.SIZE_COL
  var countMines = +gLevels.MINES
  var counter = 0
  var mines = setRandMines(countMines, levelRow * levelCol) //return arr
  for (var i = 0; i < levelRow; i++) {
    board.push([])
    for (var j = 0; j < levelCol; j++) {
      var isMine = mines.includes(counter) ? "true" : "false"
      board[i][j] = {
        minesAroundCount: "",
        isShown: false,
        isMine: isMine,
        isMarked: false,
      }
      counter++
    }
  }
  setMinesNegsCount(board)
  return board
}

function renderBoard(board) {
  var strHTML = "\t<tbody>\n"

  for (var i = 0; i < board.length; i++) {
    strHTML += "\t\t<tr>\n"

    for (var j = 0; j < board[0].length; j++) {
      var cell = EMPTY
      // board[i][j].isMine === "true" ? MINES : board[i][j].minesAroundCount
      //   var className = cell ? "occupied" : ""
      strHTML += `\t\t\t<td class="cell cell-${i}-${j}" onclick="cellClicked(this,${i} ,${j})" onmousedown="cellMarked(event,${i},${j})">${cell}</td>\n`
    }

    strHTML += "\t\t</tr>\n\t</tbody>"
  }

  var elBoard = document.querySelector("table")
  elBoard.innerHTML = strHTML
}

//-----drawNum----without 0---
function getDrawNum() {
  var idx = getRandomInt(0, gNums.length - 1)
  var randNum = gNums[idx]
  gNums.splice(idx, 1)
  return randNum
}

//---Random Int----without max-
function getRandomInt(min, max) {
  var min = Math.ceil(min)
  var max = Math.floor(max)
  var randNum = Math.floor(Math.random() * (max - min)) + min
  return randNum
}
