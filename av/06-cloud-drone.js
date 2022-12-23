r = Reverb('space').bus().connect();
d38 = Delay({ time: 3/8 }).bus().connect(r);

teardrops = Sampler("http://127.0.0.1:8080/teardrops.mp3", { loudness: 2 });
spacetime = Sampler("http://127.0.0.1:8080/spacetime.mp3", { loops: true });
drone = Sampler("http://127.0.0.1:8080/drone1.mp3", { loops: true });

spacetime.connect(d38, 0.5);
drone.connect(r);
teardrops.disconnect().connect(d38, 1).connect(r, 1);

drone.note(1);

f = FM[5]("bass", { decay: 3, attack: 1, gain: 0.1 });
f.connect(d38, 0.3);
f.connect(r, 1);
f.gain = .1

f.note.seq((fp = [4, 0, -3, 4, 11]), [3, 2, 1 / 8].rnd());

s = Synth("bleep", { decay: 1 / 8, attack: 1 / 24 });
s.glide = 2000;
s.connect(d38, 0.7);
s.seq((pp = [0, 2, -8, 14]), [1 / 8, 1, 2, 1 / 16, 1 / 16].rnd());
pp.transpose.seq([12, -12, -12, 12], 4);

p = FM("perc");
p.connect(d38, 0.2);
p.gain.seq([0.1, 0.1, 0.7, 0.1].rnd(), 1 / 8);
p.note.seq([10, 0], [1 / 8, 1 / 16, 1 / 8, 1 / 8, 1 / 16], 1);

b = Synth("bleep", { decay: 1 / 8 });
b.note.seq([-20], [1 / 8, 1 / 16, 1 / 16, 1 / 16]);

spacetime.note(-1);
spacetime.gain = 0;

teardrops.note(1);
teardrops.loudness = 2;

clouds = createVideo("http://127.0.0.1:8080/clouds.mp4", () => {
  clouds.loop();
  clouds.hide();
});

pg = createGraphics(width, height);
webgl = createGraphics(width, height, WEBGL);
draw = function () {
  webgl.clear();
  image(clouds, 0, 0, width, height);
  pg.clear();
  pg.drawingContext.drawImage(hydra.canvas, 0, 0, pg.width, pg.height);
  webgl.texture(pg);
  webgl.rotateX(0.01);
  webgl.rotateZ(0.01);
  webgl.box(height / 2);
  image(webgl, 0, 0);
};

canvas.style.display = "none";
s0.init({ src: canvas });
osc(6, 0.03, 2).out(o1);
src(s0).out(o0);
src(s0).out(o2);
src(o0).modulateHue(src(o0).scale(1.002).kaleid(10), 100).blend(src(o2), () => 1 - (spacetime.out(8)+teardrops.out(3))).blend(src(o1), 0.02).out();

src(o0).modulateHue(src(o0).scale(1.002).kaleid(10), 100).blend(src(o2), () => 1 - teardrops.out(3)).blend(src(o1), 0.4).out();
