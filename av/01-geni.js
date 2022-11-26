use("p5");
use("hydra").then((init) => init());

images = [];

for (i = 0; i < 10; i++) {
  images[i] = loadImage("http://127.0.0.1:8080/geni" + i + ".png");
}

r = Reverb().bus();
s = Synth("bleep").connect(r, 0.5);

s.note.seq( (notes = [0, -3, -14, 1, -10, -4, 13, -6]), [1, 1/2, 1/12, 1/16].rnd() );

s.stop();

background(rndi(200, 255), rndi(155, 255), rndi(255));
imageMode(CENTER);

var i, x, y;
draw = function () {
  if (s.out() > 0.01 && i === undefined) {
    background(rndi(200, 255), rndi(155, 255), rndi(255));

    for (j = 0; j < 2; j++) {
      i = rndi(0, 9);
      x = rndi(width);
      y = rndi(height);
      translate(x, y);
      rotate(rndf(PI));
      image(images[i], 0, 0, s.out(4000), s.out(4000));
    }
  }
  if (s.out() < 0.01) {
    i = undefined;
  }
};
