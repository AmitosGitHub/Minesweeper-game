"use strict"

function cellClicked(elCell, cellI, cellJ) {
  if (gGame.firstClicked === 0) {
    startTime()
    gGame.firstClicked++
  }
  var cell = gBoard[cellI][cellJ]
  console.log(gGame.shownCount, "gGame.shownCount")
  if (cell.isShown === false) {
    console.log(cell.isShown, "cell.isShown")
    if (cell.isMine === "true") {
      console.log(cell, "2")
      elCell.style.backgroundColor = "red"
      blowUp()
      playSound()

      if (checkGameOver()) {
        GameOver()
      }
    } else if (!cell.minesAroundCount) {
      console.log(gGame.shownCount, "gGame.shownCount")
      open(cellI, cellJ)
    } else {
      // update the Model
      cell.isShown = "true"
      gGame.shownCount++
      console.log(gGame.shownCount, "gGame.shownCount")
      // update the DOM
      renderCell(cell, cellI, cellJ)
    }
  }

  if (checkGameOver()) {
    GameOver()
  }
}

function blowUp() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var cell = gBoard[i][j]
      if (cell.isMine === "true") {
        //update the Model

        gGame.minesCount++
        console.log(gGame.minesCount, "gGame.minesCount")
        //update the DOM
        console.log("mine", cell)
        renderCell(cell, i, j)
      }
    }
  }
}

function playSound() {
  var sound = new Audio("audio/boom.mp3")
  sound.play()
}

function GameOver() {
  clearInterval(gIntervalId)
  gGame.isOn = "false"
  if (gGame.minesCount === gLevels.MINES) {
    var elModal = document.querySelector("img .modalLose ")
    elModal.style.display = "block"
    setTimeout(closeModal, 5000)
  } else {
    var elModal = document.querySelector("img .modalWin")
    elModal.style.display = "block"
    setTimeout(closeModal, 5000)
  }
}

function checkGameOver() {
  if (gGame.isOn) {
    console.log(gGame.minesCount, "gGame.minesCount")
    console.log(gGame.shownCount, "gGame.shownCount")
    if (gGame.minesCount === gLevels.MINES) {
      return true
    }

    var countCell = gLevels.SIZE_ROW * gLevels.SIZE_COL - gLevels.MINES
    var markedMines = gLevels.MINES
    if (gGame.shownCount === countCell && gGame.markedCount === markedMines) {
      return true
    }
  }
  return false
}

function renderCell(cell, cellI, cellJ) {
  var strHTML = ""
  if (!cell.minesAroundCount) {
    strHTML = ""
  } else {
    strHTML += cell.isMine === "true" ? MINES : cell.minesAroundCount
  }

  var elCell = document.querySelector(`.cell-${cellI}-${cellJ}`)
  elCell.innerText = strHTML
  console.log("strHTML", strHTML)
}

function getClassCell(currCell) {
  if (currCell.isMine === "true") {
    return "mines"
  } else if (!currCell.minesAroundCount) {
    return "empty"
  } else {
    return "nebr"
  }
}

function cellMarked(elBtn, i, j) {
  var cell = gBoard[i][j]
  if (cell.isShown === "true") {
    console.log("okk")
    cell.isShown = "false"
    gGame.markedCount--
    renderCell(cell, i, j)
  } else {
    console.log("ok")
    gBoard[i][j].isShown = "true"
    gGame.markedCount++
    elBtn.innerText = FLAG
    // renderCell(cell, i, j)
  }
}
