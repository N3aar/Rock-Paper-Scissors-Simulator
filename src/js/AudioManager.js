const volumes = {
  rock: 0.1,
  paper: 0.2,
  scissors: 0.4
}

export default class AudioManager {
  constructor() {
    this.context = new AudioContext()
    this.buffers = new Map()
  }

  async loadAudios(sounds) {
    const promises = sounds.map(async sound => {
      const fetched = await fetch(`./src/assets/sounds/${sound}.ogg`)
      const arrayBuffer = await fetched.arrayBuffer()
      const decode = await this.context.decodeAudioData(arrayBuffer)
      this.buffers.set(sound, { volume: volumes[sound], buffer: decode })
    })

    return Promise.all(promises)
  }

  play(name) {
    const sound = this.buffers.get(name)

    if (!sound) {
      return
    }

    const gainNode = this.context.createGain()
    const source = this.context.createBufferSource()

    source.connect(gainNode)
    gainNode.connect(this.context.destination)
    gainNode.gain.setValueAtTime(sound.volume, this.context.currentTime)

    source.buffer = sound.buffer
    source.start(0)
  }
}