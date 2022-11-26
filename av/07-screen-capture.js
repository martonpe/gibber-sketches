win95 = loadImage("http://127.0.0.1:8080/win95.webp");
beat = Sampler("http://127.0.0.1:8080/tape/beat.mp3", { loops: true });
piano = Sampler("http://127.0.0.1:8080/tape/piano.mp3", { loops: true });
scifi = Sampler("http://127.0.0.1:8080/tape/scifi.mp3", { loops: true });

verb = Reverb("space").bus();
delay = Delay("1/8").bus().connect(verb);
piano.connect().connect(verb, 0.2).connect(delay, 0.5);
beat.disconnect().connect(verb, 0.5);

beat.note(0.7);

piano.trigger(1);
piano.rate = lfo("sine", btof(24), 0.01, -1.3);

scifi.trigger(1);
scifi.rate = 0.4;
scifi.rate.fade(0.3, 0.4, 16);

pg = createGraphics(width, height);
webgl = createGraphics(width, height, WEBGL);
webgl.noStroke();
draw = function () {
  pg.clear();
  webgl.clear();
  pg.drawingContext.drawImage(hydra.canvas, 0, 0);
  webgl.texture(pg);
  webgl.box(height / 2, height / 2);
  //webgl.rotateX(0.1 * sin(time))
  image(webgl, 0, 0);
};

s0.initScreen();
src(o0).out();

src(s0).scale(1.02).blend(src(o0), 0.1).out(o0);
src(o0).modulateHue(src(o0).scale(1.002).kaleid(10), 100).blend(s0, 0.9).out();
