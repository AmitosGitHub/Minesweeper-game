"use strict"

const MINES = "💣"
const FLAG = "🚩"
const NEIGHBOR_MINES1 = "①"
const NEIGHBOR_MINES2 = "②"
const NEIGHBOR_MINES3 = "③"
const NEIGHBOR_MINES4 = "⓸"
const EMPTY = ""

//-----model-------
var gBoard
var gNums = []
var gLevels = { SIZE_ROW: 4, SIZE_COL: 4, MINES: 2 }
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }

function initGame() {
  // gLevels = { SIZE_ROW: 4, SIZE_COL: 4, MINES: 2 }
  // gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
  gBoard = buildBoard()
  renderBoard(gBoard)

  gGame.isOn = true
}
function getCountNeighbors(cellI, cellJ, board) {
  var neighborsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= board[i].length) continue
      var cell = board[i][j]

      if (cell.isMine === "true") {
        neighborsCount += 1
      }
    }
  }
  return neighborsCount
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var cell = board[i][j]
      var countNeig = getCountNeighbors(i, j, board)
      var item = countNeig === 0 ? "" : countNeig
      cell.minesAroundCount = item
    }
  }
  return
}

function setRandMines(countMines, countCell) {
  var mines = []

  for (var i = 0; i < countCell; i++) {
    gNums.push(i)
  }
  while (countMines > 0) {
    var currCell = getDrawNum()
    mines.push(currCell)
    countMines--
  }

  return mines
}

function cellClicked(elCell, cellI, cellJ) {
  if (gBoard[cellI][cellJ].isShown === false) {
    if (gBoard[cellI][cellJ].isMine === "true") {
      elCell.style.backgroundColor = "red"
      blowUp()
      playSound()
      // gGame.isOn = "false"
      if (checkGameOver()) {
        GameOver()
      }
    }

    if (!gBoard[cellI][cellJ].minesAroundCount) {
      openNebr(elCell, cellI, cellJ)
    }
    // update the Model
    gBoard[cellI][cellJ].isShown = true
    gGame.shownCount += 1

    // update the DOM
    renderCell(elCell, cellI, cellJ)
  }

  if (checkGameOver()) {
    GameOver()
  }
}

function renderCell(elCell, cellI, cellJ) {
  var strHTML = ""
  strHTML +=
    gBoard[cellI][cellJ].isMine === "true"
      ? MINES
      : gBoard[cellI][cellJ].minesAroundCount
  elCell.innerText = strHTML
}

function blowUp() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var cell = gBoard[i][j]
      if (cell.isMine === "true") {
        //update the Model
        cell.isShown = true
        gGame.shownCount += 1
        gGame.markedCount += 1
        //update the DOM
        var elCell = document.querySelector(`.cell-${i}-${j}`)
        renderCell(elCell, i, j)
      }
    }
  }
}

function playSound() {
  var sound = new Audio("audio/boom.mp3")
  sound.play()
}

function cellMarked(ev, cellI, cellJ) {
  var cell = gBoard[cellI][cellJ]

  if (ev.button === 2) {
    if (cell.isMarked === false) {
      gGame.markedCount += 1
      gGame.shownCount += 1
      // update the Model
      cell.isShown = true
      cell.isMarked = true

      // update the DOM
      var elCell = document.querySelector(`.cell-${cellI}-${cellJ}`)
      elCell.innerText = FLAG
    } else {
      gGame.markedCount -= 1
      gGame.shownCount -= 1
      // update the Model
      cell.isShown = false
      cell.isMarked = false
      // update the DOM
      var elCell = document.querySelector(`.cell-${cellI}-${cellJ}`)
      elCell.innerText = EMPTY
    }
  }

  if (checkGameOver()) {
    GameOver()
  }
}

function checkGameOver() {
  var gameOver = "true"
  if (gGame.isOn) {
    var countCell = gLevels.SIZE_ROW * gLevels.SIZE_COL - gLevels.MINES
    if (!(gGame.shownCount === countCell)) {
      return false
    }
    var markedMines = gLevels.MINES
    if (!(gGame.markedCount === markedMines)) {
      return false
    }
  }
  return gameOver
}

//  function  expandShown(board, elCell, i, j)

function levelBeginner() {
  gLevels = {
    SIZE_ROW: 4,
    SIZE_COL: 4,
    MINES: 2,
  }
  initGame()
  return
}
function levelIntermediate() {
  gLevels = {
    SIZE_ROW: 8,
    SIZE_COL: 8,
    MINES: 12,
  }
  initGame()
  return
}
function levelExpert() {
  gLevels = {
    SIZE_ROW: 12,
    SIZE_COL: 12,
    MINES: 30,
  }
  initGame()
  return
}
function restartGame() {
  gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
  var elModal = document.querySelector(".modal")
  elModal.style.display = "none"
  initGame()
}
function GameOver() {
  gGame.isOn = "false"
  var elModal = document.querySelector(".modal img")
  elModal.style.display = "block"
}
