Clock.bpm = 140
 
verb = Reverb( 'space' ).bus() 
 
perc = Synth[4]( 'square.perc' ).connect( verb, .35 )
  .spread(1)
  .note.seq( sine(2,7) , Hex(0x8036) * 1000000000110110 */  )
  .note.seq( sine(2.25, 4, 7 ) , Hex(0x4541) * 0100010101000001 */ , 1 )
  .loudnessV.seq( sine(1.5, .5, .65 )  )
 
bass = Monosynth( 'bassPad', { decay:4 })
  .connect( verb, .5 )
  .note.seq( [0,-1,-2,-4], 4 )
 
lead = Synth( 'cry', { gain:.1, octave:1 })
  .connect( verb, 1 )
  .note.seq( sine( .15, 7 ) , [1/2,1,2] )
 
relax = Sampler('http://127.0.0.1:8080/relax1.mp3', { loops: true, gain: 2 })
relax.note(1)
relax.gain = 2
 
imageMode(CENTER)
pg = createGraphics(width, height);
webgl = createGraphics(width, height, WEBGL);
webgl.noStroke()
webgl.rotateX(PI/2);
webgl.translate(0,-600,0)
div=2
 
draw = function () {
  webgl.clear();
  pg.clear();
  for(i=0;i<div*div;i++){
    rows = div
    row = int(i/rows)
    column = int(i%rows)
  	pg.drawingContext.drawImage(hydra.canvas, pg.width/div*column, pg.height/div*row, pg.width/div, pg.height/div);
  }
 	webgl.texture(pg)
  webgl.rotateZ(0.01)
  webgl.torus(height, height/2, 100);
  
  webgl.push()
  webgl.translate(0,-900,0)
  webgl.sphere(200)
  webgl.pop()
  
  image(webgl, width/2, height/2);
};

s0.initCam()
src(s0).scale(0.1).scrollX(()=>bass.out(.6,0,8000)).luma(.2).brightness(()=>relax.out(.8,0,200)).kaleid(4).out();
canvas.style.display = "block";