changes = Sampler('http://127.0.0.1:8080/changes.wav', { gain: 2})
 
changes.note(1)

imageMode(CENTER)
flowers = [];
hdri = [];
sounds = [];
for (i = 0; i < 9; i++) {
  flowers[i] = loadImage("http://127.0.0.1:8080/flower" + i + ".png");
  hdri[i] = loadImage("http://127.0.0.1:8080/hdri/" + i + ".jpg");
  sounds[i] = Sampler("http://127.0.0.1:8080/hdri/" + i + ".wav", {loops: true, gain: 0})
}

for (i = 0; i < 9; i++) {
  sounds[i].gain = 0
  sounds[i].note(1)
}

webgl = createGraphics(width, height, WEBGL)
webgl.noStroke()
flowerNo = 0
hdriNo = 0
soundNo = 0
sounds[soundNo].gain.fade(0,1,1)

draw = function(){
  if(frameCount%100==0){
    flowerNo = rndi(flowers.length-1)
  }
  if(frameCount%300==0){
    sounds[soundNo].gain.fade(1,0,1)
    hdriNo = soundNo = soundNo + 1
    if(soundNo>8){ soundNo = 0; hdriNo = 0 }
    sounds[soundNo].gain.fade(0,1,1)
  }
  webgl.clear()
  webgl.texture(hdri[hdriNo])
  webgl.sphere(1000)
  
 	webgl.rotateX(changes.out(.05))
 	webgl.rotateY(changes.out(.1) + sounds[soundNo].out(.5))
	
  webgl.push()
  webgl.texture(flowers[flowerNo])
  webgl.translate(0, 0, 0)
  webgl.box(400)	
  webgl.pop()
  
  image(webgl, width/2, height/2)
}

s0.init({ src: canvas });
s1.initCam()
canvas.style.display = "none";
src(s0).out();

src(s0).modulate(src(s1),0).out();
src(s0).modulate(src(s1),()=>changes.out(3)).out();
src(s1).modulate(src(s0),1).out();

webgl.rotateX(1)

d = Delay()
traffic.fx.add(d)
d.wetdry = .9
d.feedback = .7
d.time.seq([1/100,1/80,1/40,1/8 ], 1)
d.time = 1/100
d.feedback = sine(btof(1),.1,.9)
d.feedback = .7
d.time = sine(.1,.1,.1)
traffic.rate.fade(1,0,20)