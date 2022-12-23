statik = createVideo('http://127.0.0.1:8080/static.mp4', () => {
  statik.loop();
  statik.hide();
})
fist = loadImage('http://127.0.0.1:8080/fist.png')
fist2 = loadImage('http://127.0.0.1:8080/fist2.png')
r = Reverb('space').bus()
dS = Delay({time:1/32, feedback: .9, })
imageMode(CENTER)

b = Monosynth("short.dry");
b.note.seq((patt = [-20, -20, -20, -20, -21]), 1 / 8);
b.cutoff = 0.1;
b.Q = 0.01;
b.attack = 0;
b.loudness.seq([1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], 1 / 8);
b.fadein();
b.gain = 1;

s = Synth("bleep");
s.loudness.seq((sp = [1, 0.05, 0.05, 0.05, 0.05, 0.2, 0.1, 0.1]), 1 / 16);
s.note.seq([0, 2, 4, 5, 8], 1 / 16);
s.cutoff = 0.2;
s.decay = 1 / 16;
s.gain = 0.7;
s.connect(r, .5)

hh = Hat({ gain:0.1 });
hh.tune.seq((hhp = [0.7, 0.705].rnd()), 1 / 8);
hh.gain.seq([0.2, 0.2, 0.2, 0.2, 0.4, 0.2].rnd(), 1 / 16);
hh.trigger.seq(1, 1 / 16);
hh.connect(r,.5)

hh.fx.add(dS);
dS.time.seq([1/2, 1/4, 1/8, 1/1000], 2)
dS.feedback = .9;

draw = function() {
  background(0)
  image(statik, width/2, height/2, width, height)
  image(fist, width/2, height/2, fist.width-200, fist.height-200)
  image(fist2, random(width), random(height), fist.width-200, fist.height-200)
  rotate(PI/2,0)
  image(fist, random(height), -random(width), fist.height, fist.width)
}

s0.init({src: canvas})
osc(6,0.03,2).out(o1);
canvas.style.display = "none";
src(s0).out();
src(s0).out(o2);
src(o0).modulateHue(src(o0).scale(1.002).kaleid(10),100).blend(src(o2), ()=>1-b.out(10)).blend(src(o1),.02).out()
