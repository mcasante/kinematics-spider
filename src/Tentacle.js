export default class Tentacle {
  constructor(Segment, Vector, length, base, segmentLength) {
    this.length = length;
    this.base = base;
    this.tentacle = [
      new Segment(Vector, new Vector(200, 200), segmentLength, 0),
    ];

    for (let i = 1; i < length; i++) {
      const next = new Segment(
        Vector,
        this.tentacle[i - 1].b,
        segmentLength,
        i
      );
      this.tentacle.push(next);
    }

    this.intentionPoint = new Vector(500, 500);
  }

  setBase(vector) {
    this.base = vector;
  }

  update(mousePos) {
    const lastOne = this.tentacle[this.length - 1];
    lastOne.follow(mousePos);
    lastOne.calculateB();

    for (let i = this.length - 2; i >= 0; i--) {
      this.tentacle[i].follow(this.tentacle[i + 1].a);
      this.tentacle[i].calculateB();
    }

    if (this.base) {
      this.updateBase();
    }
  }

  updateBase() {
    this.tentacle[0].setA(this.base);
    this.tentacle[0].calculateB();

    for (let i = 1; i < this.length; i++) {
      this.tentacle[i].setA(this.tentacle[i - 1].b);
      this.tentacle[i].calculateB();
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.length; i++) {
      this.tentacle[i].draw(ctx);
    }
  }
}
