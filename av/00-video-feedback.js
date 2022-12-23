porn = createVideo("http://127.0.0.1:8080/porn1.mp4", () => {
  porn.loop();
  porn.volume(0);
  porn.hide();
});
r = Reverb().bus();
rs = Reverb({roomSize: .2} ).bus()
d13 = Delay('1/3').bus();
imageMode(CENTER);

b = FM[2]("deepbass", { decay: 1/8, gain:2 }).connect(r, 0.1);
b.note.seq((bp = [-23]), 1/8);
b.stop()

bp.transpose.seq([1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,1], 4)

f = FM("glockenspiel", { decay: 1 / 16 });
f.connect(r, 1);
f.connect(d13, 1);
f.note.seq((p = [-10, -9, -8, -10]), [1/16, 1/16, 1/16, 2-1/16]);

p.set.seq( [[-10, -9, -8, -2],[-10, -9, -7, -1],[-10, -8, -0, -6]], 2 );

f.note.seq((p = [-10, -9, -8, -10]), [1/16, 1/16, 1/16, 1/8, 1/16]);

s = Sine({frequency: 100, gain:0}).connect()
s.frequency.fade(100,1000,32)
s.gain.fade(0,.5,32)
s.frequency.fade(1000,100,32)
s.gain.fade(0.5,0,32)

draw = function () {
  image(porn, width/2, height/2, width, height);
};

s0.init({ src: canvas });
src(s0).out()
src(s0).out(o1);
canvas.style.display = "none";

//rotate
src(o0).scale(1.05).rotate(0.01).blend(src(o1), ()=>1.5-f.out(20000)+c.out(2)).out();

//holy dick - nice to play with moving too
src(o0).scale(1.0).blend(src(o1), ()=>1.5+f.out(s.out(60))+c.out(2)).out();

// rainbow trail
src(o0).scale(1.04).hue(0.1).blend(src(o1), ()=>0.1+f.out(8)+c.out(2)).out();
