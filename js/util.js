"use strict"

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
function startTime() {
  gStartTime = Date.now()
  gIntervalId = setInterval(updateTime, 80)
}

function updateTime() {
  var now = Date.now()
  var distance = now - gStartTime
  var secondsPast = Math.floor((distance % (1000 * 60)) / 1000)
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  var strTime = minutes + ":" + secondsPast

  var elTime = document.querySelector(".timer span")
  elTime.innerText = strTime
}

function closeModal() {
  var elModal = document.querySelector(".modal")
  elModal.style.display = "none"
}
