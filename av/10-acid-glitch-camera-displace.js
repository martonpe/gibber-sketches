verb  = Reverb( 'space' ).bus()
delay = Delay( {time: 1/128, feedback: .8} )
delay.bus().connect( verb, .1 )

Clock.bpm = 142
acid = Sampler('http://127.0.0.1:8080/acid2.mp3', {gain: 2})
acid.note.seq(1,1)

acid.disconnect().connect()
acid.connect(verb,1)
delay.feedback = .1
delay.time = 1/128


imageMode(CENTER)
smiley = loadImage("http://127.0.0.1:8080/smiley.png")
glitch = new Glitch()
glitch.loadType('jpg')
glitch.loadQuality(.3)
glitch.errors(false)

draw = function () {
    glitch.loadImage(smiley)
  	glitch.replaceByte(acid.out(7500), 154)
  	glitch.buildImage()
  	image(glitch.image, width/4, height/2, height, height);
  	image(glitch.image, width-width/4, height/2, height, height);  
    image(smiley,rndi(width), rndi(height))
};

s0.init({ src: canvas });
s1.initCam()
canvas.style.display = "none";
src(s0).out();

src(s0).modulate(src(s1),.0).out();
