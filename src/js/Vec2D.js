export default class Vec2D {
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  get() {
    return { x: this.getX(), y: this.getY() }
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }

  set(x, y) {
    this.setX(x)
    this.setY(y)
  }

  setX(x) {
    this.x = x
  }

  setY(y) {
    this.y = y
  }
}