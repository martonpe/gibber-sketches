Clock.bpm = 140
technosexual = Sampler('http://127.0.0.1:8080/technosexual/technosexual.mp3', { gain: 2 })
productive = Sampler('http://127.0.0.1:8080/technosexual/productive.mp3', { loops: true, gain: 2 })
sex = Sampler('http://127.0.0.1:8080/technosexual/moans.mp3', { loops: true, gain: 1 })
r = Reverb({ wet2: 0.1 }).bus().connect();
dl = Delay({ time: 3 / 8 }).bus().connect(r);
ds = Delay({ time: 1 / 100, feedback: 0.9 }).connect(r);
technosexual.connect(dl, 0.1).connect(r, .6)
productive.connect(dl, 0.4).connect(r, .5)
 
rave = Sampler('http://127.0.0.1:8080/technosexual/rave2.mp3')
k = Sampler('http://127.0.0.1:8080/technosexual/kick1.mp3')
 
effectLevel = 100
pixelEffect = function(vid, on){
  vid.loadPixels();
  	color = {r: rndi(255), g: 0, b: rndi(155)}
  	for (let i = 0; i < vid.pixels.length; i += 4) {
    	if (vid.pixels[i] > 255 - effectLevel) {
      	vid.pixels[i] = color.r;
      	vid.pixels[i+1] = color.g;
      	vid.pixels[i+2] = color.b;
    	}
  	}
  vid.updatePixels()
}
 
div = 1
loadVideo("http://127.0.0.1:8080/technosexual/vid" + 1 + ".mp4")
 
font = googleFont('Black Ops One')
pg = createGraphics(width, height)
pg.textFont(font)
textFont(font)
pg.textAlign(CENTER, CENTER)
textAlign(CENTER, CENTER)
texts = ['PRODUCE', 'CUM', 'FUCK', 'PROGRESS', 'MACHINE']
pg.textSize(250)
textSize(250)
pg.fill(255,0,0)
fill(255,0,0)
iText = 0
webgl = createGraphics(width, height, WEBGL)
webgl.noStroke()
 
hh = Hat()
productive.note(.9)

k.note.seq( 1, 1/4 )
k.stop()
rave.stop()

hh.trigger.seq( 1, 1/16 )
hh.stop()

sex.note(.8)
sex.gain.fade(2,4,4)
sex.fadeout(8)

p.fadeout(4)

technosexual.note(1)
technosexual.fadeout()

effectLevel = 10
div = 2

rave.note.seq( 1, 4 )
rave.stop()

currentVideo = 1
draw = function(){  
  if(frameCount%200 == 0){
    currentVideo += 1
    if(currentVideo > 6) currentVideo = 0
    loadVideo("http://127.0.0.1:8080/technosexual/vid" + currentVideo + ".mp4")
  }
  
  for(i=0;i<div*div;i++){
    rows = div
    row = int(i/rows)
    column = int(i%rows)
    pg.image(vid, width/div*column, height/div*row, width/div, height/div);
  }
  pixelEffect(vid, true)
  if(k.out()+p.out(3)>.7){
    iText += 1
    if(iText>texts.length-1){
      iText = 0
    }
  }
	pg.text(texts[iText], pg.width/2, pg.height/2)
  
  webgl.clear()
  webgl.texture(pg)
  
  webgl.push()
  webgl.translate(width/4, height/4, 0)
  webgl.rotateY(frameCount/50)
  webgl.box(width/8)
  webgl.pop()
  
  webgl.push()
  webgl.translate(-width/4, height/4, 0)
  webgl.rotateX(frameCount/50)
  webgl.box(width/8)
  webgl.pop()
  
  webgl.push()
  webgl.translate(width/4, -height/4, 0)
  webgl.rotateX(frameCount/50)
  webgl.box(width/8)
  webgl.pop()
  
  webgl.push()
  webgl.translate(-width/4, -height/4, 0)
  webgl.rotateX(frameCount/50)
  webgl.box(width/8)
  webgl.pop()
  
  webgl.rotateY(0.01)
  
  image(pg,0,0)
  image(webgl,0, 0)
  
	text(texts[iText], pg.width/2, pg.height/2)
}