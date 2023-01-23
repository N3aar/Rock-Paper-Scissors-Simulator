function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function constrain(nmb, min, max) {
  return Math.max(Math.min(nmb, max), min)
}

function randomLocation(width, height, size) {
  return {
    x: Math.floor(Math.random() * (width - size)),
    y: Math.floor(Math.random() * (height - size))
  }
}

export {
  constrain,
  randomRange,
  randomLocation
}