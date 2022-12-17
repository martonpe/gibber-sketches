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
  
m =  Sampler({
  files: sounds,
	gain: .5
})
m.connect(r,.5)
 
background(rndi(200, 255), rndi(155, 255), rndi(255));
imageMode(CENTER);
 
var iNo;
draw = function () {
  if(frameCount%100==0){
		background(rndi(200, 255), rndi(155, 255), rndi(255));
  }
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

Clock.bpm = 100

m.pick.seq( Rndi(0,9)/* 6 */ )
m.note.seq( [1,.75, .7,1.25].rnd(), Rndf(1,2)/* 137850.9 */ )
 
s0.init({ src: canvas });
src(s0).out();
src(s0).out(o1);
canvas.style.display = "block";
src(o0).modulateHue(src(s0).rotate(() => time%1060).diff(s0),()=>100*m.__out).blend(src(o1), .05).out()

draw = function () {
    if (s.__out > 0.01) {
      background(rndi(200, 255), rndi(155, 255), rndi(255));
    }
}
