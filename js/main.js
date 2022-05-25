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
// var cell = {
//   minesAroundCount: 4,
//   isShown: true,
//   isMine: false,
//   isMarked: true,
// }
var gLevels = {
  SIZE_ROW: 4,
  SIZE_COL: 4,
  MINES: 2,
}
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}

function initGame() {
  gBoard = buildBoard()
  console.table(gBoard)
  renderBoard(gBoard)
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
  console.log(gNums)
  return mines
}

function cellClicked(elCell, cellI, cellJ) {
  //   console.log("elCell.dataset:", elCell.dataset)

  if (gBoard[cellI][cellJ].isShown === false) {
    // update the Model
    gBoard[cellI][cellJ].isShown = true

    // update the DOM
    var strHTML = ""
    strHTML +=
      gBoard[cellI][cellJ].isMine === "true"
        ? MINES
        : gBoard[cellI][cellJ].minesAroundCount
    elCell.innerText = strHTML

    if (strHTML === MINES) {
      blownUp()
    }
  }

  //   console.table(gBoard)
}
function blownUp() {}
//  function  cellMarked(elCell)
//  function  checkGameOver()
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
  initGame()
}
