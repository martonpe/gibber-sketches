clouds = createVideo('http://127.0.0.1:8080/clouds.mp4', () => {
  clouds.loop();
  clouds.hide();
})
fist = loadImage('http://127.0.0.1:8080/fist.png')
fist2 = loadImage('http://127.0.0.1:8080/fist2.png')

imageMode(CENTER)

b = Monosynth('wander')
b.frequency = lfo( 'sine', 8, 100, 220 )
b.trigger.seq( 1, [1/8, 1/4, 1/3, 1/2].rnd()  )
b.gain = .8

b.stop()

bb = Monosynth('easy')
bb.note.seq([-20,-21,-17], 1/8)
bb.cutoff = lfo( 'sine', 1/16, .25, .5 )

bb.stop()

hc = select(".graphics")
hc.show()

//TODO: can i draw over on top of hydra with p5?
let sketch = function(p) {
  p.setup = function() {
    p.createCanvas(width, height);
  };
  p.draw = function() {
    p.clear()
    p.rect(100, 100, 50, 50);
  };
};
let myp5 = new p5(sketch);

draw = function() {
  background(0)
  image(clouds, width/2, height/2, width, height)
  image(fist2, width/2, height/2)
}

s0.init({src: canvas})
osc(6,0.03,2).out(o1);
canvas.style.display = "none";
src(s0).out();
src(s0).out(o2);
src(o0).modulateHue(src(o0).scale(1.002).kaleid(10),100).blend(src(o2), ()=>1-b.out(6)).blend(src(o1),.02).out()
