win95 = loadImage("http://127.0.0.1:8080/win95.webp");
ws = Sampler('http://127.0.0.1:8080/winerr.mp3')


ws.note.seq( Rndf(.75,1.5), Rndf(0.2,1) )   
ws.trigger(1)

fm = FM('frog', { feedback:.01, decay:1/3, attack: 0, cmRatio: 2, antialias: false })
fm.note.seq( Rndf(27,29), Rndf(0.2,1) )   

fm.stop()

glitch = new Glitch()
glitch.loadType('jpg')
glitch.loadQuality(.30)
glitch.loadImage(win95)
glitch.errors(false)

draw = function () {
  glitch.resetBytes()
  glitch.replaceByte(ws.out(6500), 254)
  glitch.buildImage()
  image(glitch.image,0,0,width,height)
};

//TODO: move glitched image around for glitchy trail effects