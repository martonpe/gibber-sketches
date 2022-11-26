use("p5");
use("hydra").then((init) => init());

images = [];
sounds = [];
for (i = 0; i < 9; i++) {
  images[i] = loadImage("http://127.0.0.1:8080/flower" + i + ".png");
	sounds[i] = "http://127.0.0.1:8080/moans/moan" + i + ".mp3"
}

r = Reverb().bus();
s = Synth("bleep")
s.attack = 0
s.note.seq( notes = [0, -3, -14, 1, -10, -4, 13, -6], [1/8,1/16].rnd() ).connect(r,.5)

s.stop();


m =  Sampler({
  files: sounds
}).connect(r,.5)

m.note(1)
m.note.seq( [1,.75, .5,1.25].rnd(), Rndf(1,4)   )
m.pick.seq( Rndi(0,9)  )

m.stop()

background(rndi(200, 255), rndi(155, 255), rndi(255));
imageMode(CENTER);

draw = function () {
    if (s.__out > 0.01) {
      background(rndi(200, 255), rndi(155, 255), rndi(255));
    }
}

var iNo, x, y;
draw = function () {
  if (s.__out > 0.01 && iNo === undefined) {
      iNo = rndi(0, 8);
      x = rndi(width);
      y = rndi(height);
      s1 = rndi(200,400)
      translate(x, y);
      rotate(rndf(PI));
      image(images[iNo], 0, 0, s1, s1)
  }
  if (s.__out < 0.01) {
    iNo = undefined;
  }
};

s0.init({ src: canvas });
src(s0).out();
src(s0).out(o1);
canvas.style.display = "none";
src(o0).modulateHue(src(s0).rotate(() => time%360).diff(s0),()=>100*m.__out).blend(src(o1), .05).out()
