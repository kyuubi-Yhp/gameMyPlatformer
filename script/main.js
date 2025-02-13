
const jumpBlock = document.getElementById('jump')
const hitBlock = document.getElementById('hit')
const hero = document.getElementById('hero__img')

const blockStep = document.getElementById('block__with-hero')
const canvas = document.getElementById('canvas')
const fsBtn = document.getElementById('fsBtn')
jumpBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`
hitBlock.style.top = `${window.screen.height / 2 - 144 / 2}px`
hero.onclick = (event) => {
  event.preventDefault()
}

let blockStepBlock = 0
let position = 0
let direction = 'right'
let hit = false
let jump = false
let timer = null
let x = 0
let halfWidth = window.screen.width / 2


// ОБРАБОТЧИК ФУЛЛ СКРИН ЭКРАНА С ПРОВЕРКОЙ 
fsBtn.onclick = () => {
  if (window.document.fullscreen) {
    window.document.exitFullscreen()
    fsBtn.src = `fullscreen.png`
  } else {
    fsBtn.src = `cancel.png`
    canvas.requestFullscreen()
  }
}

jumpBlock.onclick = () => { jump = true }
hitBlock.onclick = () => { hit = true }

// ФУНКЦИЯ ИДТИ В ПРАВО
const rightHandler = () => {
  hero.style.transform = `scale(-1,1)`
  position = position + 1
  blockStepBlock = blockStepBlock + 1
  if (position > 5) {
    position = 0
  }
  hero.style.left = `-${position * 288}px`
  hero.style.top = `-576px`
  blockStep.style.left = `${blockStepBlock * 20}px`
}

// ФУНКЦИЯ ИДТИ В ЛЕВО 
const leftHandler = () => {
  hero.style.transform = `scale(1,1)`
  position = position + 1
  blockStepBlock = blockStepBlock - 1
  if (position > 5) {
    position = 0
  }
  hero.style.left = `-${position * 288}px`
  hero.style.top = `-576px`
  blockStep.style.left = `${blockStepBlock * 20}px`
}

// ФУНКЦИЯ ПРОВЕРКИ СТОИТ ЛИ ПЕРСОНАЖ
const standHandler = () => {
  switch (direction) {
    case 'right': {
      hero.style.transform = `scale(-1,1)`
      if (position > 4) {
        position = 1
      }
      break;
    }
    case 'left': {
      hero.style.transform = `scale(1,1)`
      if (position > 3) {
        position = 0
      }
      break;
    }
    default: break;
  }
  position = position + 1
  hero.style.left = `-${position * 288}px`
  hero.style.top = `0px`
}

// ФУНКЦИЯ УДАРА 
const hitHandler = () => {
  switch (direction) {
    case 'right': {
      hero.style.transform = `scale(-1,1)`
      if (position > 4) {
        position = 1
        hit = false
      }
      break;
    }
    case 'left': {
      hero.style.transform = `scale(1,1)`
      if (position > 3) {
        position = 0
        hit = false
      }
      break;
    }
    default: break;
  }
  position = position + 1
  hero.style.left = `-${position * 288}px`
  hero.style.top = `-864px`
}

// ФУНКЦИЯ ПРЫЖКА 
const jumpHandler = () => {
  switch (direction) {
    case 'right': {
      hero.style.transform = `scale(-1,1)`
      if (position > 4) {
        position = 1
        jump = false
      }
      break;
    }
    case 'left': {
      hero.style.transform = `scale(1,1)`
      if (position > 3) {
        position = 0
        jump = false
      }
      break;
    }
    default: break;
  }
  position = position + 1
  hero.style.left = `-${position * 288}px`
  hero.style.top = `-288px`
}


let onTouchStart = (event) => {
  clearInterval(timer)
  x = (event.type === 'mousedown') ? event.screenX : event.touches[0].screenX
  timer = setInterval(() => {
    if (x > halfWidth) {
      direction = 'right'
      rightHandler()
    } else {
      direction = 'left'
      leftHandler()
    }
  }, 130)
}

let onTouchEnd = (event) => {
  clearInterval(timer)
  lifeCycle()
}

window.onmousedown = onTouchStart
window.ontouchstart = onTouchStart

window.onmouseup = onTouchEnd
window.ontouchend = onTouchEnd

const lifeCycle = () => {
  timer = setInterval(() => {
    if (hit) {
      hitHandler()
    } else if (jump) {
      jumpHandler()
    } else {
      standHandler()
    }
  }, 150)
}

const start = () => {
  lifeCycle()
}
start()

