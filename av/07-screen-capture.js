losing1 = Sampler('http://127.0.0.1:8080/losing.mp3', { loops: true, gain: 1.5})
losing2 = Sampler('http://127.0.0.1:8080/losing2.mp3', { loops: true, gain: 2})
r = Reverb({ wet2: 0.1 }).bus().connect();
dl = Delay({ time: 3 / 8 }).bus().connect(r);
ds = Delay({ time: 1 / 100, feedback: 0.9 }).connect(r);
losing1.connect(dl, .3).connect(r, .6)
 
losing1.trigger(1)

losing2.trigger(1)

s = Synth('blank', { waveform:'square' }).note.seq( 12, 1 )
s.connect(r, 1).connect(dl, .1)
 
s1.initScreen();
src(s1).kaleid(2).out();
 
grindr = []
for(i=0;i<12;i++){
  grindr[i] = loadImage("http://127.0.0.1:8080/grindr/"+i+".jpg");
}
pg = createGraphics(width, height);
webgl = createGraphics(width, height, WEBGL);
webgl.noStroke()
webgl.rotateY(1)
webgl.translate(500,0,0)
imageMode(CENTER)
pg.imageMode(CENTER)
direction = -3
 
draw = function () {
  if(frameCount%700==0){
    direction *= -1
  }
  webgl.clear();
  pg.drawingContext.drawImage(hydra.canvas, 0, 0, pg.width, pg.height);
  if(s.out()>.2){
		pg.image(grindr[rndi(grindr.length-1)], width/2, height/2)
  }
  webgl.texture(pg);
  
  webgl.box(width, height)
  webgl.rotateX(0.01)
  webgl.translate(direction,0,0)
  
  image(webgl, width/2, height/2)
};
