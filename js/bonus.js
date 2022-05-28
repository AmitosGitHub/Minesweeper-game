"use strict"

function open(cellI, cellJ) {
  var cell = gBoard[cellI][cellJ]
  console.log(cell, "6")
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue

    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue

      var cell = gBoard[i][j]
      console.log(cell, "7")
      if (!cell.minesAroundCount) {
        var elCurrCell = document.querySelector(`.cell-${i}-${j}`)
        elCurrCell.style.backgroundColor = "green"
        gGame.shownCount++
        cell.isShown = true
        console.log(gGame.shownCount, "gGame.shownCount")
        renderCell(cell, i, j)
      } else if (cell.isMine === "true") continue
      else {
        cell.isShown = true
        gGame.shownCount++
        console.log(gGame.shownCount, "gGame.shownCount")
        renderCell(cell, i, j)
      }
    }
  }
}

// function openEmpty(cellI, cellJ) {
//   var cell = gBoard[cellI][cellJ]
//   console.log(cell, "6")
//   if (isValid(cellI, cellJ)) {
//     if (cell.isMine === "true") {
//       return
//     } else if (cell.minesAroundCount) {
//       //Model
//       gGame.shownCount++
//       cell.isShown = true
//       //DOM

//       renderCell(cell, cellI, cellJ)
//       return
//     } else {
//       if (cell.isShown === false) {
//         var elCurrCell = document.querySelector(".empty")
//         elCurrCell.style.backgroundColor = "green"
//         gGame.shownCount++
//         gBoard[cellI][cellJ].isShown = "true"
//       }

//       console.log("open1", gBoard[cellI][cellJ])
//       openEmpty(cellI + 1, cellJ)
//       openEmpty(cellI, cellJ + 1)
//       openEmpty(cellI, cellJ - 1)
//       openEmpty(cellI - 1, cellJ)
//     }
//   } else {
//     return
//   }
// }

// function isValid(row, col) {
//   for (var i = row - 1; i < row + 1; i++) {
//     if (i < 0 || i > gBoard.length - 1) {
//       continue
//     }
//     for (var j = col; j < col + 1; j++) {
//       if (j < 0 || j > gBoard.length - 1) {
//         continue
//       }
//       if (i === row && j === col) {
//         continue
//       }
//       return true
//     }
//   }
//   return false
// }
