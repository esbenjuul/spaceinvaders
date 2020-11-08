export default class Star {
  constructor(width, height, minVelocity, maxVelocity) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.velocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
    this.size = Math.random() * 3 + 1;
  }
}
