use("p5");
use("hydra").then((init) => init());

dick = loadImage("http://127.0.0.1:8080/dick-flower.png");
imageMode(p5.CENTER);

angle = 0.0;
draw = function () {
  translate(width * cc[0], height * cc[1]);
  rotate(angle);
  clear();
  image(dick, 0, 0);
  angle += 0.01 * cc[3];
};

s0.init({ src: canvas });
src(s0).out();
canvas.style.display = "none";

//stretch
src(o0)
  .scale(() => 1 + 0.004 * cc[1])
  .out();

//rotate into a vortex
src(o0).scale(1.002).rotate(0.01).out();

//holy dick - nice to play with moving too
src(s0).out();
src(s0).out(o1);
src(o0).scale(1.1).blend(src(o1).color(1), 0.2).out();

// or even holier
src(o0).scale(1.02).blend(src(o1).color(1), 0.06).out();

// rainbow trail
src(o0).scale(1.04).hue(1.1).blend(src(o1).color(1), 0.2).out();

// crazy digital color mindfuck
src(o0).hue(1.01).out();
