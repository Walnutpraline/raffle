const beaseSize = 16
function setRem () {
  const scale = document.documentElement.clientWidth / 1024
  document.documentElement.style.fontSize = beaseSize * Math.min(scale, 2) + 'px'
}
setRem()
window.onresize = function () {
  setRem()
}
