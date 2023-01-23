import Vec2D from './Vec2D.js'
import { constrain, randomRange } from './Util.js'

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const targets = {
  ROCK: 'SCISSORS',
  PAPER: 'ROCK',
  SCISSORS: 'PAPER'
}

const images = {
  ROCK: document.querySelector('.imgRock'),
  PAPER: document.querySelector('.imgPaper'),
  SCISSORS: document.querySelector('.imgScissors')
}

export default class Entity {
  constructor(type, x, y, width = 45, height = 50, speed = 10) {
    this.type = type
    this.position = new Vec2D(x, y)
    this.size = new Vec2D(width, height)
    this.velocity = new Vec2D()
    this.speed = speed
  }

  draw() {
    ctx.drawImage(images[this.type], this.position.getX(), this.position.getY(), this.size.getX(), this.size.getY())
  }

  update(gameContext) {
    this.updateVelocity()
    this.swapTarget(gameContext)
  }

  updateVelocity() {
    this.velocity.setX(Math.random() * randomRange(-this.speed, this.speed))
    this.velocity.setY(Math.random() * randomRange(-this.speed, this.speed))

    const velocityX = this.position.getX() + this.velocity.getX()
    const velocityY = this.position.getY() + this.velocity.getY()

    const realX = constrain(velocityX, 0, (ctx.canvas.width - this.size.getX()))
    const realY = constrain(velocityY, 0, (ctx.canvas.height - this.size.getY()))

    this.position.setX(realX)
    this.position.setY(realY)
  }

  swapTarget(gameContext) {
    for (const target of gameContext.entities) {
      if (targets[this.type] === target.type && this.checkEntityCollision(target)) {
        target.type = this.type
        gameContext.audio.play(this.type.toLowerCase())
      }
    }
  }

  checkEntityCollision(target) {
    const entityWidth = this.position.getX() + this.size.getX()
    const entityHeight = this.position.getY() + this.size.getY()

    const targetWidth = target.position.getX() + target.size.getX()
    const targetHeight = target.position.getY() + target.size.getY()

    const overlapW = this.position.getX() < targetWidth && entityWidth > target.position.getX()
    const overlapH = this.position.getY() < targetHeight && entityHeight > target.position.getY()

    return overlapW && overlapH
  }
}
