import Entity from './Entity.js'
import AudioManager from './AudioManager.js'
import { randomLocation } from './Util.js'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const gameContext = {
  entities: [],
  gameTick: null,
  audio: null
}

const display = {
  ROCK: document.querySelector('.rock'),
  PAPER: document.querySelector('.paper'),
  SCISSORS: document.querySelector('.scissors')
}

const amount = {
  ROCK: 0,
  PAPER: 0,
  SCISSORS: 0
}

let started = false

function draw() {
  requestAnimationFrame(draw)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  gameContext.entities.forEach(entity => entity.draw())
}

function update() {
  for (const type in amount) {
    amount[type] = 0
  }

  gameContext.entities.forEach(entity => {
    amount[entity.type]++
    entity.update(gameContext)
  })

  for (const type in amount) {
    const value = amount[type]
    display[type].innerText = `${type}: ${value}`

    if (value >= gameContext.entities.length) {
      clearInterval(gameContext.gameTick)
      gameContext.gameTick = null
    }
  }
}

function newEntity(type) {
  const { x, y } = randomLocation(ctx.canvas.width, ctx.canvas.height, 50)
  return new Entity(type, x, y)
}

function createEntities(type, n) {
  for (let i = 0; i < n; i++) {
    gameContext.entities.push(newEntity(type))
  }
}

async function start() {
  gameContext.audio = new AudioManager()
  await gameContext.audio.loadAudios(['rock', 'paper', 'scissors'])
  gameContext.gameTick = setInterval(update, 1000 / 60)
  canvasResize()
  createEntities('ROCK', 30)
  createEntities('PAPER', 30)
  createEntities('SCISSORS', 30)
  draw()
}

function canvasResize() {
  ctx.canvas.width = document.body.clientWidth * .99
  ctx.canvas.height = document.body.clientHeight * .99
}

window.addEventListener('resize', canvasResize)
window.addEventListener('click', () => {
  if (!started) {
    document.querySelector('.clickhere').classList.add('hidden')
    document.querySelector('#canvas').classList.remove('hidden')
    started = true
    start()
  }
})

canvasResize()
