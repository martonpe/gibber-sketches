//SAMPLES
ambiences = [];
for (i = 0; i < 9; i++) {
    ambiences[i] = Sampler("http://127.0.0.1:8080/hdri/" + i + ".wav")
}
drone = Sampler('http://127.0.0.1:8080/drone1.mp3', { loops: true })
rave = Sampler('http://127.0.0.1:8080/technosexual/rave2.mp3',  { gain: 1.5 })
k = Sampler('http://127.0.0.1:8080/technosexual/kick1.mp3')
spacetime = Sampler("http://127.0.0.1:8080/spacetime.mp3", { loops: true, gain: 3 });
loop92 = Sampler('http://127.0.0.1:8080/metatron/92.wav', { gain: 3 })
loop93 = Sampler('http://127.0.0.1:8080/metatron/93.mp3', { gain: 3 })
technosexual = Sampler('http://127.0.0.1:8080/technosexual/technosexual.mp3', { gain: 1.8 })
productive = Sampler('http://127.0.0.1:8080/technosexual/productive.mp3', { loops: true, gain: 1.5 })
sex = Sampler('http://127.0.0.1:8080/technosexual/moans.mp3', { loops: true, gain: 1.5 })
rave = Sampler('http://127.0.0.1:8080/technosexual/rave2.mp3')
k = Sampler('http://127.0.0.1:8080/technosexual/kick1.mp3')
acid = Sampler('http://127.0.0.1:8080/acid2.wav', {gain: 3})
losing1 = Sampler('http://127.0.0.1:8080/losing1.wav', { loops: true, gain: 1.5})
losing2 = Sampler('http://127.0.0.1:8080/losing2.mp3', { loops: true, gain: 2.5})
relax = Sampler('http://127.0.0.1:8080/relax1.mp3', { gain: 3 })
relax2 = Sampler('http://127.0.0.1:8080/relax3.mp3', { gain: 3 })
relax3 = Sampler('http://127.0.0.1:8080/relax4.mp3', { gain: 3 })
relax4 = Sampler('http://127.0.0.1:8080/relax5.mp3', { gain: 3 })
// the long ones
changes = Sampler('http://127.0.0.1:8080/changes.mp3', { gain: 2.5})
 
 
//EFFECTS
rs = Reverb({roomSize: .2} ).bus()
r = Reverb('space').bus()
d13 = Delay( '1/3' ).bus().connect( r, .5 )
d38 = Delay({ time: 3/8 }).bus().connect(r, .5);
dS = Delay({time:1/100000, feedback: .9, })
 
spacetime.connect(d38, 0.8);
drone.connect(r);
losing1.connect(r)
technosexual.connect(r, .1)
productive.connect(d38, 0.1).connect(r, .3)
 
 
//IMAGES
genitals = [];
for (i = 0; i < 9; i++) {
  genitals[i] = loadImage("http://127.0.0.1:8080/geni" + i + ".png");
}
flowers = [];
for (i = 0; i < 9; i++) {
  flowers[i] = loadImage("http://127.0.0.1:8080/flower" + i + ".png");
}
grindr = []
for(i=0;i<12;i++){
  grindr[i] = loadImage("http://127.0.0.1:8080/grindr/"+i+".jpg");
}
smiley = loadImage("http://127.0.0.1:8080/smiley.png")
hdri = [];
for (i = 0; i < 9; i++) {
  hdri[i] = loadImage("http://127.0.0.1:8080/hdri/" + i + ".jpg");
}
 
 
//HYDRA
s0.init({ src: canvas });
s1.initCam()
src(s0).out()
src(s0).out(o1);
canvas.style.display = "none";
 
 
//FUNCTIONS & SETTINGS
imageMode(CENTER);
background(255)
resetHydra = function(){
    src(s0).out()
    canvas.style.display = "block";
}
noStroke()
clouds = loadVideo("http://127.0.0.1:8080/clouds.mp4")
draw = function () {
  image(clouds, width/2, height/2, width, height);
};
pixelDensity(1) // fixes retina display offset
pg = createGraphics(width, height);
pg.imageMode(CENTER)
webgl = createGraphics(width, height, WEBGL);
webgl.noStroke()
glitch = new Glitch()
glitch.loadType('jpg')
glitch.loadQuality(.3)
glitch.errors(false)
pix = 0
pixelEffect = function(vid, on){
  vid.loadPixels();
  	color = {r: rndi(255), g: 0, b: rndi(155)}
  	for (let i = 0; i < vid.pixels.length; i += 4) {
    	if (vid.pixels[i] > 255 - pix) {
      	vid.pixels[i] = color.r;
      	vid.pixels[i+1] = color.g;
      	vid.pixels[i+2] = color.b;
    	}
  	}
  vid.updatePixels()
}
font = googleFont('Black Ops One')
pg.textFont(font)
textFont(font)
pg.textAlign(CENTER, CENTER)
textAlign(CENTER, CENTER)
pg.textSize(250)
textSize(250)
fill(255,0,0)
fade = 0
iFade = 0
fadeFunc = function(){
	background(0,fade)
	fade += iFade
}
 
 
//SHADERS
vertShader = `
	attribute vec3 aPosition;
	attribute vec2 aTexCoord;
	
	varying vec2 vTexCoord;
	
	void main() {
	  vTexCoord = aTexCoord;
	
	  vec4 positionVec4 = vec4(aPosition, 1.0);
	  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
	
	  gl_Position = positionVec4;
	}
`
fragShader = `
	#ifdef GL_ES
	precision mediump float;
	#endif
	
	uniform sampler2D tInput;
	uniform vec2 resolution;
	uniform float max_distort;
	uniform vec2 iMouse;
	
	vec2 barrelDistortion(vec2 coord, float amt) {
		vec2 cc = coord - iMouse;
		float dist = dot(cc, cc);
		return coord + cc * dist * amt;
	}
	
	float sat( float t )
	{
		return clamp( t, 0.0, 1.0 );
	}
	
	float linterp( float t ) {
		return sat( 1.0 - abs( 2.0*t - 1.0 ) );
	}
	
	float remap( float t, float a, float b ) {
		return sat( (t - a) / (b - a) );
	}
	
	vec4 spectrum_offset( float t ) {
		vec4 ret;
		float lo = step(t,0.5);
		float hi = 1.0-lo;
		float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );
		ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);
	
		return pow( ret, vec4(1.0/2.2) );
	}
	
	const int num_iter = 37;
	
	void main()
	{	
		vec2 uv=(gl_FragCoord.xy/resolution.xy*1.0)+.0;
		uv.y = 1.0 - uv.y;
		
		float reci_num_iter_f = 1.0 / float(num_iter);
		vec4 sumcol = vec4(0.0);
		vec4 sumw = vec4(0.0);	
		for ( int i=0; i<num_iter;++i )
		{
			float t = float(i) * reci_num_iter_f;
			vec4 w = spectrum_offset( t );
			sumw += w;
			sumcol += w * texture2D( tInput, barrelDistortion(uv, .16 * max_distort*t ) );
		}
			
		gl_FragColor = sumcol / sumw;
	}
`


//SKETCHES
////////////////////////////////////
//08 cloud drone
////////////////////////////////////
drone.note(1)
drone.gain.fade(0,1,12)

draw = function () {
  webgl.clear();
  image(clouds, width/2, height/2, width, height);
  pg.clear();
  pg.drawingContext.drawImage(hydra.canvas, 0, 0, pg.width, pg.height);
  webgl.texture(pg);
  webgl.rotateX(0.002);
  webgl.rotateZ(0.003);
  webgl.box(height / 2);
  image(webgl, width/2, height/2);
};
canvas.style.display = "none";
osc(6, 0.03, 2).out(o1);
src(s0).out(o2);
src(o0).modulateHue(src(o0).scale(1.002).kaleid(10), 100).blend(src(o2), () => 1 - (spacetime.out(5))).blend(src(o1), 0.02).out();

f = FM[5]("bass", { decay: 3, attack: 1, gain: .1 }).connect(d38, 0.3).connect(r, 1)
f.note.seq([4, 0, -3, 4, 11], [3, 2, 1/8].rnd());

s = Synth("bleep", { decay: 1/8, attack: 1/24, glide: 2000 }).connect(d38, 0.7);
s.seq((pp = [0, 2, -8, 14]), [1 / 8, 1, 2, 1/16, 1/16].rnd());
pp.transpose.seq([12, -12, -12, 12], 4);

spacetime.note(-1);

canvas.style.display = "block";
src(s1).scale(0.5).kaleid(3).out(o2)
src(o2).modulateHue(src(o2).scale(1.2), 100).blend(src(o2), () => .8 - (spacetime.out(78))).blend(src(o2), 0.6).out();

////////////////////////////////////
//09 chromatic aberration dream
////////////////////////////////////
loop92.note.seq(1, 4, 0)
drone.fadeout()
spacetime.gain = 0
f.stop()
p.stop()
words = ['EXTASY', 'DREAM', 'ETERNITY']
wordNo = 0
resetHydra()
webgl = createGraphics(width, height, WEBGL);
theShader = webgl.createShader(vertShader, fragShader)
tex = createGraphics(width, height)
tex.imageMode(CENTER)
strength = .1
draw = function() {
    if(frameCount%200 == 0){
      wordNo = rndi(2)
    }
    sound = (loop92.out(strength,0.1,8000) + loop93.out(strength,0.1,8000)) * 0.1
    if(frameCount%10 == 0){
	    tex.noFill()
	    tex.stroke(255)
	    let y = random(tex.height)
	    tex.image(genitals[rndi(8)],random(width), random(height), 550, 550)
	    tex.fill(255)
	    tex.textSize(tex.width / 5)
	    tex.textAlign(CENTER, CENTER)
	    tex.text(words[wordNo], tex.width / 2, tex.height / 2)
	}  
	theShader.setUniform("resolution", [width, height])
	theShader.setUniform('tInput', tex)
	theShader.setUniform("max_distort", abs(sin(frameCount * .001) * 5))
	theShader.setUniform("iMouse", [0.5 + sin(frameCount * .01 * map(sound, 0, .2, 1, 0)) * .3, .5 + cos(frameCount * .1) * map(sound, 0, .2, 0, 1)])
	theShader.setUniform("num_iter", 12)
	theShader.setUniform("focalDistance", 42.0)
	theShader.setUniform("aperture", 12.0)
 
	webgl.shader(theShader) // apply shader
	webgl.rect(0, 0, width, height) // display shader
    image(webgl,width/2,height/2)
}

strength = .2
loop92.note.seq(1, 4, 0)
loop93.note.seq(1, 4)

loop92.fadeout()
loop93.fadeout()

////////////////////////////////////
//10 interstellar worm
////////////////////////////////////
f = FM[5]("frog", {decay: 1/4, cmRatio: .9}).connect(r,.5)
f.gain.fade(0.5,1,24)
f.note.seq([-10, -5, 2, -20, -13], [1,1/2, 1/8].rnd());
stroke(0)

draw = function () {
    x = map(noise(frameCount * .004),0,1,-200, width+300)
    y = map(noise(frameCount * .006),0,1,-200, height+300)
    translate(x, y);
    fill(255)
    b = f.out(200);
    rect(b * -0.5, b * -0.5, b, b);
  }

//colorful shapeshifting worm
draw = function () {
  speedX = sin(frameCount * .011)
  speedY = sin(frameCount * .028)
  
  x = map(noise(frameCount * .004),0,1,-200, width+300)
  y = map(noise(frameCount * .006),0,1,-200, height+300)
  translate(x, y);
  const b = 3 + f.out(150);
  if(frameCount%2000>1000){
    f.cmRatio = .99
  	ellipse(0,0,b);
  	fill(100+200*speedX, f.out(1000), 100+200*speedY)  
  }
  else{
    f.cmRatio = .2
  	fill(f.out(300))  
    rect(b * -0.5, b * -0.5, b, b);
  }
};

////////////////////////////////////
//11 grindr doomhole
////////////////////////////////////
s2.initScreen();
f.stop()
resetHydra()
s = Synth('blank', { waveform:'square' }).note.seq( 12, 1 )
s.connect(r, 1).connect(d38, .1)
src(s2).kaleid(2).out();
pg.reset()
webgl.reset()
webgl.noStroke()
webgl.rotateY(1)
webgl.translate(500,0,0)
direction = -3
counter = 0
var i
draw = function () {
  counter++
  if(counter%480==0){
    direction *= -1
  }
  webgl.clear();
  pg.drawingContext.drawImage(hydra.canvas, 0, 0, pg.width, pg.height);
  if(s.out()>.1 && i === undefined){
    i = rndi(11)
  }
  if(s.out()<.1) {
    i = undefined
  }
	if(i){
    pg.image(grindr[i], width/2, height/2)
  }
  webgl.texture(pg);
  
  webgl.box(width, height)
  webgl.rotateX(0.01)
  webgl.translate(direction,0,0)
  
  image(webgl, width/2, height/2)
};

losing1.trigger(1)

losing2.trigger(1)

losing1.fadeout()
losing2.fadeout()

///////////////////////////////////
//12 acid glitch
////////////////////////////////////
acid.note.seq(1,1)
hh = Hat({ gain: 0.1, tune: 0.7 }).connect(r, .3)
canvas.style.display = "none";
mod = .05
draw = function () {
    glitch.loadImage(smiley)
  	glitch.replaceByte(acid.out(7500), 154)
  	glitch.buildImage()
  	image(glitch.image, width/4, height/2, height, height);
  	image(glitch.image, width-width/4, height/2, height, height);  
    image(smiley, rndi(width), rndi(height), 1+hh.out(1000), 1+hh.out(1000))
};
src(s0).modulate(src(s1),()=>mod).out();

hh.gain.seq([0.2, 0.2, 0.2, 0.2, 0.4, 0.2].rnd(), 1/16);
hh.trigger.seq(1, 1/16);
hh.fx.add(dS);
dS.time = 1/10000;

s = Synth('chirp', { decay: 1/16, gain: 1 }).connect(r, .5)
s.loudness.seq([1, 0.5, 0.5, 1, 0.05, 0.2, 1, 0.1], 1/16)
s.note.seq([0, 2, 4,], 1/16)

mod = .1

relax.note(1)

relax2.note.seq(1.2, 2)
relax3.note.seq(1.4, 2, 0, 1)
relax4.note.seq(1.5, 2, 0, 1.5)

relax2.stop()

s = Sine({frequency: 100, gain:.5}).connect()
s.frequency.fade(10,200,32)

////////////////////////////////////
//13 changes
////////////////////////////////////
acid.rate.fade(1,0,16)
hh.stop()
s.frequency.fade(200,0,2)

changes.note(1)

acid.stop()
webgl.reset()
webgl.noStroke()
flowerNo = 0
hdriNo = 0
soundNo = 0
ambiences[soundNo].note(1)
hdriTimer = 13000
hdriNextChange = hdriTimer
draw = function(){
	if(frameCount%200 == 0){
	  flowerNo++
		if(flowerNo>8) flowerNo = 0 
	}
	if(millis() > hdriNextChange){
		hdriNo = soundNo = soundNo + 1
		if(soundNo>8){ soundNo = 0; hdriNo = 0 }
		ambiences[soundNo].note(1)
    hdriNextChange = millis() + hdriTimer
	}
	webgl.clear()
	webgl.texture(hdri[hdriNo])
	webgl.sphere(1000)
  
	webgl.rotateX(changes.out(.01))
 	webgl.rotateY(changes.out(.02) + ambiences[soundNo].out(.1))
	
	webgl.push()
	webgl.texture(flowers[flowerNo])
	webgl.translate(0, 0, 0)
	webgl.box(350)	
	webgl.pop()
	
	image(webgl, width/2, height/2)
}
src(s0).modulate(src(s1),.02).scale(1.1).out();

webgl.rotateX(1)

productive.note(.9)

////////////////////////////////////
//14 technosexual
////////////////////////////////////
// Ctrl+Enter
div = 1
vid = loadVideo("http://127.0.0.1:8080/technosexual/vid" + 1 + ".mp4")
texts = ['PRODUCE', 'CUM', 'FUCK', 'PROGRESS', 'MACHINE']
iText = 0
webgl.reset()
fill(255,0,0)
pg.fill(255,0,0)
pg.imageMode(CORNER)
currentVideo = 0
resetHydra()
tsTimer = 8000
tsNextChange = tsTimer
draw = function(){  
	if(millis() > tsNextChange){
	  currentVideo += 1
	  if(currentVideo > 6) currentVideo = 0
	  vid = loadVideo("http://127.0.0.1:8080/technosexual/vid" + currentVideo + ".mp4")
    tsNextChange = millis() + tsTimer
	}
	for(i=0;i<div*div;i++){
	  rows = div
	  row = int(i/rows)
	  column = int(i%rows)
	  pg.image(vid, width/div*column, height/div*row, width/div, height/div);
	}
	pixelEffect(vid, true)
	if(k.out()>.7){
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
	image(pg,width/2,height/2)
	image(webgl,width/2, height/2)
  
	text(texts[iText], pg.width/2, pg.height/2)

	fadeFunc()
}
hh = Hat({decay: 1/32})
hh.trigger.seq( 1, 1/16 )

k.note(1)

k.note.seq( 1, 1/4 )
div = 2
pix = 30

div = 3
sex.note(.8)

div = 4

div = 6
pix = 120
rave.note.seq( 1, 4 )

div = 15
oh = Hat({ decay: 1/8, gain: .7 }).seq( [0,.2,1,0], 1/16 )

div = 8
pix = 0
k.stop()
hh.stop()
oh.stop()
rave.gain = 0
productive.gain = 0
sex.gain = 0
technosexual.note(1)

k.note(1)

iFade = 1

////////////////////////////////////////



















///////////////////////////////////////////////////////////////////////////////////////////////////
// many thanks to the Jobcenter and ALG2 for making this possible <3
// 😁😅😜
////////////////////////


















//////////////////////////////////////