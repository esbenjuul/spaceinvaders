import Star from "./Star";

export default class Startfield {
  constructor(div) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas = document.createElement("canvas");
    this.minVelocity = 15;
    this.maxVelocity = 30;
    this.stars = 100;
    this.fps = 60;
    this.start();
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    div.appendChild(this.canvas);
  }
  start() {
    const stars = [];
    for (let i = 0; i < this.stars; i++) {
      stars[i] = new Star(
        this.width,
        this.height,
        this.minVelocity,
        this.maxVelocity
      );
    }
    this.stars = stars;
    console.log("start");
    this.tick();
  }
  stop() {
    console.log("stop");
  }
  draw() {
    console.log("draw");
    const ctx = this.canvas.getContext("2d");

    // Draw the background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, this.width, this.height);

    //  Draw stars
    ctx.fillStyle = "#ffffff";
    for (var i = 0; i < this.stars.length; i++) {
      var star = this.stars[i];
      ctx.fillRect(star.x, star.y, star.size, star.size);
    }
  }
  update() {
    const dt = 1 / this.fps;
    for (var i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.y += dt * star.velocity;
      //  If the star has moved from the bottom of the screen, spawn it at the top.
      if (star.y > this.height) {
        this.stars[i] = new Star(
          this.width,
          0,
          this.minVelocity,
          this.minVelocity
        );
      }
    }
  }

  tick() {
    let prevTick = 0;
    requestAnimationFrame(this.tick.bind(this));

    // clamp to fixed framerate
    let now = Math.round((this.fps * Date.now()) / 1000);
    if (now === prevTick) return;
    prevTick = now;
    this.update();
    this.draw();
  }
}
