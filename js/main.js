"use strict"

const MINES = "💣"
const FLAG = "🚩"
const EMPTY = ""

//-----model-------
var gBoard
var gNums = []
var gLevels = { SIZE_ROW: 4, SIZE_COL: 4, MINES: 2 }
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  minesCount: 0,
  firstClicked: 0,
}
var gStartTime
var gIntervalId

function initGame() {
  gBoard = buildBoard()
  renderBoard(gBoard)

  gGame.isOn = true
}

function buildBoard() {
  var board = []
  var row = gLevels.SIZE_ROW
  var col = gLevels.SIZE_COL
  var countMines = gLevels.MINES
  var counter = 0
  var mines = setRandMines(countMines, row * col) //return arrays
  for (var i = 0; i < row; i++) {
    board[i] = []
    for (var j = 0; j < col; j++) {
      var isMine = mines.includes(counter) ? "true" : "false"
      board[i][j] = {
        minesAroundCount: 0,
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

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      var cell = board[i][j]
      var countNeig = getCountNeighbors(board, i, j)
      var item = countNeig === 0 ? EMPTY : countNeig
      cell.minesAroundCount = item
    }
  }
  return
}

function getCountNeighbors(board, cellI, cellJ) {
  var neighborsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= board[i].length) continue
      var cell = board[i][j]

      if (cell.isMine === "true") {
        neighborsCount++
      }
    }
  }
  return neighborsCount
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

function renderBoard(board) {
  var strHTML = "\t<tbody>\n"

  for (var i = 0; i < board.length; i++) {
    strHTML += "\t\t<tr>\n"

    for (var j = 0; j < board[0].length; j++) {
      var cell = ""
      var classCell = getClassCell(gBoard[i][j])

      strHTML += `\t\t\t<td class="${classCell} cell-${i}-${j}" onclick="cellClicked(this,${i} ,${j})" oncontextmenu="cellMarked(this,${i} ,${j})">${cell}</td>\n`
    }
  }
  strHTML += "\t\t</tr>\n\t</tbody>"
  // console.log(strHTML)
  var elBoard = document.querySelector("table")
  elBoard.innerHTML = strHTML
}

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

function restart() {
  clearInterval(gIntervalId)
  gGame.firstClicked = 0

  var strTime = "00:00"

  var elTime = document.querySelector(".timer span")
  elTime.innerText = strTime
  initGame()
}
