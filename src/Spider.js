export default class Spider {
  constructor(Tentacle, Segment, Vector, legs, legsLength, segmentLength = 2) {
    this.legsLength = legsLength;
    this.Vector = Vector;
    this.segmentLength = segmentLength;
    this.tentacles = Array.from(
      { length: legs },
      () =>
        new Tentacle(
          Segment,
          Vector,
          legsLength,
          new Vector(Math.random() * 500, Math.random() * 500),
          segmentLength
        )
    );
  }

  update(nextPosition) {
    const tentacles = this.tentacles;
    for (let i = 0; i < tentacles.length; i++) {
      const t = tentacles[i];
      const ip = tentacles[i].intentionPoint;

      t.update(nextPosition);

      if (this.Vector.getDistance(t.base, ip) > 20) {
        const speed = 0.25;
        const x = this.Vector.lerp(t.base.x, ip.x, speed);
        const y = this.Vector.lerp(t.base.y, ip.y, speed);

        t.setBase(new this.Vector(x, y));
      }

      const d = this.Vector.getDistance(nextPosition, t.base);

      if (d > this.legsLength * this.segmentLength) {
        const p = this.Vector.sub(t.base, nextPosition);

        const magFactor = Math.floor(Math.random() * 1 + 2);

        p.setMag(this.legsLength * this.segmentLength * magFactor);
        p.mult(-1);

        const newP = this.Vector.add(t.base, p);

        ip.set(newP.x, newP.y);
        t.updateBase();
      }
    }
  }

  draw(ctx) {
    for (const t of this.tentacles) {
      t.draw(ctx);
    }
  }
}
