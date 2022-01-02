export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }

  normalize() {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  mult(v) {
    if (v instanceof Vector) {
      this.set(this.x * v.x, this.y * v.y);
    } else {
      this.set(this.x * v, this.y * v);
    }
    return this;
  }

  mag() {
    const [x, y] = [this.x, this.y];
    return Math.sqrt(x * x + y * y);
  }

  setMag(n) {
    this.normalize().mult(n);
  }

  heading() {
    return Math.atan2(this.x, this.y);
  }

  static add(v0, v1) {
    return new Vector(v0.x + v1.x, v0.y + v1.y);
  }

  static sub(v0, v1) {
    return new Vector(v0.x - v1.x, v0.y - v1.y);
  }

  static getDistance(v0, v1) {
    return Math.sqrt(Math.abs((v0.x - v1.x) ** 2 + (v0.y - v1.y) ** 2));
  }

  static lerp(v0, v1, t) {
    return (1 - t) * v0 + t * v1;
  }
}
