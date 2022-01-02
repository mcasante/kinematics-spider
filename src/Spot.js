export default class Spot {
  constructor(Vector, radius) {
    this.Vector = Vector;
    this.pos = new Vector(0, 0);
    this.r = radius;
    this.dirX = 10;
    this.dirY = 10;

    this.desiredSpot = new Vector(Math.random() * 500, Math.random() * 500);
  }

  update(canvas) {
    const d = this.Vector.getDistance(this.pos, this.desiredSpot);
    if (d < this.r) {
      this.desiredSpot.set(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    } else {
      this.follow(this.desiredSpot);
    }
  }

  setDesiredSpot(vector) {
    this.desiredSpot.set(vector.x, vector.y);
  }

  follow(vector) {
    const lerpX = this.Vector.lerp(this.pos.x, vector.x, 0.05);
    const lerpY = this.Vector.lerp(this.pos.y, vector.y, 0.05);
    this.pos.set(lerpX, lerpY);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.desiredSpot.x, this.desiredSpot.y, 5, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 0, 0, .4)";
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI * 2, false);
    ctx.stroke();
  }
}
