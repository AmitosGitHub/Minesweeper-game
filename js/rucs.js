"use strict"

function openNebr(elCell, cellI, cellJ) {
  var cell = gBoard[cellI][cellJ]
  if (!cell.minesAroundCount) {
    gGame.shownCount -= 1
    for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
        if (j < 0 || j >= gBoard[i].length) continue
        var cell = gBoard[i][j]
        if (cell.isMine === "true") continue
        //Model
        gGame.shownCount += 1
        cell.isShown = true
        //DOM
        var elCell = document.querySelector(`.cell-${i}-${j}`)
        renderCell(elCell, i, j)
        if (!cell.minesAroundCount) {
          elCell.style.backgroundColor = "rgb(236, 63, 219)"
        }
      }
    }
  }
}
