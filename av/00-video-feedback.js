use("p5");
use("hydra").then((init) => init());

vid = createVideo("http://127.0.0.1:8080/porn-1.mp4", () => {
  vid.loop();
  vid.volume(0);
  vid.hide();
});
imageMode(CENTER);

f = FM("glockenspiel", { decay: 1 / 8 });
f.note.seq((p = [-10, -9, -8, -10]), [1/16, 1/16, 1/16, 2]);
f.stop();

p.set.seq( [[-10, -9, -2],[-10, -9, -8, -2],[-10, -9, -8, -4],[-10, -9, -6]], 2 );

p.transpose(-5);
b = FM("deepbass", { attack: 1 / 4 });
b.attack = 0;
b.note.seq((bp = [-1]), 1 / 8);
bp.set.seq( [[2, 4],[0, 5],[10, -2, 13, 20]], 1 );

b.gain = 1;
b.connect(r, 0.5);

r = Reverb().bus();
d = Delay({ time: 2 / 6, feedback: 0.2 }).bus();

f.connect(r, 0.5);
f.connect(d, 0.5);

s = FM("glockenspiel", { decay: 1 / 16 });
s.note.tidal("-10 -1 [0 -1]*2");
s.connect(r, 1);

s.gain = 0.5;
s.fadein();

b.fadeout();

draw = function () {
  background(0);
  //  translate(mouseX, mouseY);
  image(vid, 0, 0, vid.width, vid.height);
};

s0.init({ src: canvas });
src(s0).out();
canvas.style.display = "none";

//stretch
src(o0)
  .scale(() => 1 + 0.004 * cc[30])
  .out();

//rotate into a vortex
src(o0).scale(1.002).rotate(0.01).blend(src(o1), 0, 2).out();

//holy dick - nice to play with moving too
src(s0).out();
src(s0).out(o1);
src(o0).scale(1.0).blend(src(o1).color(1), 0.2).out();

// or even holier
src(o0).scale(1.1).blend(src(o1).color(1), b.out(7)).out();

// rainbow trail
src(o0).scale(1.04).hue(1.1).blend(src(o1).color(1), 0.2).out();

// crazy digital color mindfuck
src(o0).hue(1.01).out();
