"use strict"

function buildBoard() {
  var board = []
  var levelRow = +gLevels.SIZE_ROW
  var levelCol = +gLevels.SIZE_COL
  var countMines = +gLevels.MINES
  var counter = 0
  var mines = setRandMines(countMines, levelRow * levelCol)
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
      var cell = ""
      // board[i][j].isMine === "true" ? MINES : board[i][j].minesAroundCount
      //   var className = cell ? "occupied" : ""
      strHTML += `\t\t\t<td data-i="${i}" data-j="${j}" onclick="cellClicked(this,${i} ,${j})">${cell}</td>\n`
    }

    strHTML += "\t\t</tr>\n\t</tbody>"
  }

  var elBoard = document.querySelector("table")
  elBoard.innerHTML = strHTML
}

// function blowUpNeigs(cellI, cellJ) {
//   for (var i = cellI - 1; i <= cellI + 1; i++) {
//     if (i < 0 || i >= gBoard.length) continue
//     for (var j = cellJ - 1; j <= cellJ + 1; j++) {
//       if (i === cellI && j === cellJ) continue
//       if (j < 0 || j >= gBoard[i].length) continue
//       if (gBoard[i][j] === LIFE) {
//         //model
//         gBoard[i][j] = ""

//         //dom
//         var elCell = renderCell(i, j, "")
//         elCell.classList.remove("occupied")
//       }
//     }
//   }
// }

// function renderCell(i, j, value) {
//   var elCell = document.querySelector(`[data-i="${i}"][data-j="${j}"]`)
//   elCell.innerText = value
//   return elCell
// }

// function copyMat(mat) {
//   var newMat = []
//   for (var i = 0; i < mat.length; i++) {
//     newMat[i] = []
//     for (var j = 0; j < mat[0].length; j++) {
//       newMat[i][j] = mat[i][j]
//     }
//   }
//   return newMat
// }

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
