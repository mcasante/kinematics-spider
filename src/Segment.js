export default class Segment {
  constructor(Vector, vector, len, i) {
    this.Vector = Vector;
    this.a = new Vector(vector.x, vector.y);
    this.b = new Vector();
    this.angle = 0;
    this.len = len;
    this.calculateB();
    this.i = i;
  }

  setA(vector) {
    this.a.set(vector.x, vector.y);
  }

  calculateB() {
    let dx = this.len * Math.sin(this.angle);
    let dy = this.len * Math.cos(this.angle);
    this.b.set(this.a.x + dx, this.a.y + dy);
  }

  follow(vector) {
    const p = this.Vector.sub(vector, this.a);
    this.angle = p.heading();
    p.setMag(this.len);

    p.mult(-1);
    this.a = this.Vector.add(vector, p);
  }

  draw(ctx) {
    if (!ctx) return;
    ctx.beginPath();

    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.strokeStyle = `hsl(${this.i * 3}, 100%, 50%)`;

    ctx.closePath();
    ctx.stroke();
  }
}
