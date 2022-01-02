import Segment from "./Segment";
import Spot from "./Spot";
import Tentacle from "./Tentacle";
import Vector from "./Vector";
import Spider from "./Spider";

export default function main() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  const setSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 50;
  };

  setSize();
  window.addEventListener("resize", setSize);

  const mousePos = new Vector(20, 20);

  window.addEventListener("mousemove", (e) => {
    mousePos.set(e.clientX, e.clientY);
  });

  window.addEventListener("touchmove", (e) => {
    mousePos.set(e.touches[0].clientX, e.touches[0].clientY);
  });

  const config = [
    {
      legs: 100,
      legsSegments: 30,
      legsSegmentsLength: 10,
      bodySize: 5,
    },
    {
      legs: 8,
      legsSegments: 3,
      legsSegmentsLength: 120,
      bodySize: 20,
    },
    {
      legs: 8,
      legsSegments: 127,
      legsSegmentsLength: 2,
      bodySize: 10,
    },
  ];

  const controllers = config.map((c) => new Spot(Vector, c.bodySize));
  const spiders = config.map(
    (c) =>
      new Spider(
        Tentacle,
        Segment,
        Vector,
        c.legs,
        c.legsSegments,
        c.legsSegmentsLength
      )
  );

  canvas.addEventListener("click", () => {
    for (const c of controllers) {
      c.desiredSpot.set(mousePos.x, mousePos.y);
    }
  });

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < config.length; i++) {
      controllers[i].update(canvas);
      spiders[i].update(controllers[i].pos);
      spiders[i].draw(ctx);
      controllers[i].draw(ctx);
    }

    requestAnimationFrame(loop);
  };

  loop();
}
