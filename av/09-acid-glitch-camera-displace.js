verb  = Reverb( 'space' ).bus()
delay = Delay( {time: 1/128, feedback: .8} )
delay.bus().connect( verb, .1 )
Clock.bpm = 142
a = Sampler('http://127.0.0.1:8080/acid2.mp3', {gain: 2})
a.note.seq(1,1)

a.disconnect().connect()
a.connect(verb,1)
delay.feedback = .1
delay.time = 1/128


imageMode(CENTER)
d = loadImage("http://127.0.0.1:8080/smiley.png")
g1 = new Glitch()
g1.loadType('jpg')
g1.loadQuality(.1)
g1.errors(false)
draw = function () {
    g1.loadImage(d)
  	g1.replaceByte(a.out(7500), 154)
  	g1.buildImage()
  	image(g1.image, width/4, height/2, height, height);
  	image(g1.image, width-width/4, height/2, height, height);  
    image(d,rndi(width), rndi(height))
};

s0.init({ src: canvas });
s1.initCam()
canvas.style.display = "none";
src(s0).out();

src(s0).modulate(src(s1),.0).out();
