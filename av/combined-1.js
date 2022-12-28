//SAMPLES
moans = [];
for (i = 0; i < 9; i++) {
    moans[i] = "http://127.0.0.1:8080/moans/moan" + i + ".mp3"
}
moan =  Sampler({
    files: moans,
    gain: .4
})
choir1 = Sampler("http://127.0.0.1:8080/choir1.mp3", { gain: .5 })
choir2 = Sampler("http://127.0.0.1:8080/choir2.mp3", { gain: .5 })
choir3 = Sampler("http://127.0.0.1:8080/choir3.mp3", { gain: .5 })
drone = Sampler('http://127.0.0.1:8080/drone1.mp3', { loops: true })
// the long ones
ginsberg = Sampler('http://127.0.0.1:8080/ginsberg.mp3', { gain: 3 })
heaven = Sampler('http://127.0.0.1:8080/heaven.mp3', { gain: 1.5 })
 
 
//EFFECTS
rs = Reverb({roomSize: .2} ).bus()
r = Reverb('space').bus()
d13 = Delay( '1/3' ).bus().connect( r, .5 )
d38 = Delay({ time: 3/8 }).bus().connect(r, .5);
dS = Delay({ time:1/100000, feedback: .9, wetdry: .6 })
 
drone.connect(r)
ginsberg.connect(r, .1)
choir1.connect(r)
choir2.connect(r)
choir3.connect(r)
moan.connect(d38, .6).connect(r, 1)
 
 
//IMAGES
genitals = [];
for (i = 0; i < 9; i++) {
  genitals[i] = loadImage("http://127.0.0.1:8080/geni" + i + ".png");
}
flowers = [];
for (i = 0; i < 9; i++) {
  flowers[i] = loadImage("http://127.0.0.1:8080/flower" + i + ".png");
}
fist = loadImage('http://127.0.0.1:8080/fist.png')
fist2 = loadImage('http://127.0.0.1:8080/fist2.png')
dildos = [
    loadImage("http://127.0.0.1:8080/dildo3.png"),
    loadImage("http://127.0.0.1:8080/dildo4.png"), 
    loadImage("http://127.0.0.1:8080/dildo5.png"),
    loadImage("http://127.0.0.1:8080/dildo2.png"),
    loadImage("http://127.0.0.1:8080/dildo0.png"),
    loadImage("http://127.0.0.1:8080/dildo1.png"),
  ]
   
 
//HYDRA
s0.init({ src: canvas });
src(s0).out()
src(s0).out(o1);
canvas.style.display = "none";
 
 
//FUNCTIONS & SETTINGS
imageMode(CENTER);
angleMode(DEGREES)
background(0)
resetHydra = function(){
    src(s0).out()
    canvas.style.display = "block";
}
noStroke()
drawRays = function(w, h, x) {
  let x0 = (width - w)/2;
  let y0 = (height - h)/2;
  
  for (let i = 0; i < nDiv; i++) {
    fill(colors[x%2]);
    // top
    triangle(x0 + i*w/nDiv, y0, x0 + (i+1)*w/nDiv, y0, width/2, height/2);
    // bottom
    triangle(x0 + i*w/nDiv, h + y0, x0 + (i+1)*w/nDiv, h + y0, width/2, height/2);
    
    x++;
    fill(colors[x%2]);
    // left
    triangle(x0, y0 + i*h/nDiv, x0, y0 + (i+1)*h/nDiv, width/2, height/2);
    // right
    triangle(w + x0, y0 + i*h/nDiv, w + x0, y0 + (i+1)*h/nDiv, width/2, height/2);
  }
}
scale = fibs[fibs.length-5]/fibs[fibs.length-1]
fiboDicks = function(one, two, three){
    push()
    for (let i = 0; i < fibs.length; i++) {
      scaledFib = fibs[i]*scale
      dildo = dildos[i%4]
      
      push()
      rotate(-155)
      if(one) image(dildo, -scaledFib/2, -scaledFib/2, scaledFib, scaledFib)
      
      rotate(-155)
      if(two) image(dildo, scaledFib, -scaledFib/2, scaledFib, scaledFib)
      
      rotate(-155)
      if(three) image(dildo, -scaledFib/2, -scaledFib/2, scaledFib, scaledFib)
      pop()  
      
      translate(scaledFib, scaledFib)
      rotate(-90)
    }
    pop()
    
    if (scale > 1) {
      scale = fibs[fibs.length-5]/fibs[fibs.length-1]
    } else {
      scale *= speed
    }
}
face = function(){
    for(i=0;i<12;i++){
      push()
      n = map(p5.noise((frameCount+i*100)*0.008),0,1,-1,1)
      rotate(i*30)
      image(dildos[0],0,-200+20*n,100-20*n,100-20*n)
      image(dildos[1],0,-270,100+30*n,100+60*n)
      pop()
    }
    push()
    rotate(120)
    image(dildos[2],-90,-40,100,100)
    rotate(130)
    image(dildos[2],90,-60,100,100)
    rotate(110)
    image(dildos[2],10,0,100,100)
    pop()
    //mouth
    push()
    rotate(90)
    image(dildos[4],120+heaven.out(40),0,150,150)
    rotate(180)
    image(dildos[4],-110+heaven.out(30),0,150,150)
    pop()
}



//SKETCHES
//////////////////////////////////////
//01 ginsberg
////////////////////////////////////


perc = FM( 'perc').connect( d13, .5 ).connect(r,.5)
perc.note.seq( sine( btof(7),7,7 )        , 1/2, 2 )

perc.connect(r,.5)
ginsberg.note(1)



///////////////////////////////////////
//02 yes, master
////////////////////////////////////
porn = loadVideo("http://127.0.0.1:8080/porn2.mp4")
f = FM("glockenspiel", { decay: 1 / 16, gain: .7 }).connect(d13,1), connect(r,1)
s = Sine({ frequency: 100, gain:0 })

s.connect()
b = FM[2]("deepbass", { attack: 0.001, decay: 1/8, gain: 1 }).connect(r, 0.1);
draw = function () {
  image(porn, width/2, height/2, width, height);
};
src(o0).scale(1.005).blend(src(o1), ()=>1.5-b.out(5)).out();

b.note.seq((bp = [-25]), 1/8);
perc.stop()
ginsberg.fx.add(dS)
dS.time.seq([1/2, 1/4, 1/64, 1/128, 1/8, 1/1000], 2)

bp.transpose.seq([1], 4)
s.frequency.fade(10,1000,32)
s.gain.fade(0,.5,32)

src(o0).scale(1.04).hue(0.1).blend(src(o1), ()=>0.2+b.out(10+s.out(100))).out();

////////////////////////////////////
//03 orgy
////////////////////////////////////
s.disconnect()
perc.stop()
b.stop()
ginsberg.gain = 0
s = Synth("bleep").connect(r, 0.5);
s.note.seq( (notes = [0, -3, -14, 1, -10, -4, 13, -6]), [1,1/2,1/4,1/12,1/16].rnd() );
background(rndi(200, 255), rndi(155, 255), rndi(255));
resetHydra()
var i, x, y;
draw = function () {
  if (s.out() > 0.01 && i === undefined) {
    background(rndi(200, 255), rndi(155, 255), rndi(255));
    for (j = 0; j < 1; j++) {
      i = rndi(0, 8);
      x = rndi(width);
      y = rndi(height);
      push()
      translate(x, y);
      rotate(random(90));
      s1 = rndi(200,400)
      image(genitals[i], 0, 0, s1, s1);
      pop()
    }
  }
  if (s.out() < 0.01) {
    i = undefined;
  }
};


////////////////////////////////////
//04 moaning flowers 👼🌸🌹🌼
////////////////////////////////////
s.stop()
moan.connect(d38, .6).connect(r, 1)
moan.pick.seq( Rndi(0,9) )
moan.note.seq( [1,.75, 1.2,1.25,1.3].rnd(), [2,1.5,1,1/2,1/4,1/12,1/16].rnd() )
background(rndi(200, 255), rndi(155, 255), rndi(255));
var iNo;
draw = function () {
  if (moan.__out > 0.01 && iNo === undefined) {
      iNo = rndi(0, 8);
      x = rndi(width);
      y = rndi(height);
      s1 = rndi(200,400)
      push()
      translate(x, y);
      rotate(random(90));
      image(flowers[iNo], 0, 0, s1, s1)
    	pop()
  }
  if (moan.__out < 0.01) {
    iNo = undefined;
  }
};
canvas.style.display = "none";
src(o0).modulateHue(src(s0).rotate(() => time%1060).diff(s0),()=>moan.out(110)).blend(src(o1), .5).out()

src(o0).modulateHue(src(s0).rotate(() => time%1060).diff(s0),()=>moan.out(110)).blend(src(o1), .03).out()


////////////////////////////////////
//05 fist the system
////////////////////////////////////
statik = loadVideo('http://127.0.0.1:8080/static.mp4')
b = Monosynth("short.dry", { decay: .1, gain: .7 });
b.note.seq( [-20, -20, -20, -20, -21], 1/8 );
b.loudness.seq( [1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], 1/8 );
s = Synth("bleep", { decay: 1/16, gain: .7 }).connect(r, .5)
hh = Hat({ gain: 0.1, tune: 0.7 }).connect(r, .3)
moan.stop()

resetHydra()
draw = function() {
    background(0)
    image(statik, width/2, height/2, width, height)
    image(fist, width/2, height/2, fist.width-200, fist.height-200)
    //image(fist2, random(width), random(height), fist.width-200, fist.height-200)
    rotate(90,0)
    //image(fist, random(height), -random(width), fist.height, fist.width)
}
osc(6,0.03,2).out(o2);
canvas.style.display = "none";
src(o0).modulateHue(src(o0).scale(1.002).kaleid(10),100).blend(src(o1), ()=>1-b.out(10)).blend(src(o2),.02).out()

s.loudness.seq([1, 0.05, 0.05, 0.05, 0.05, 0.2, 0.1, 0.1], 1/16)
s.note.seq([0, 2, 4, 5, 8], 1/16)

hh.gain.seq([0.2, 0.2, 0.2, 0.2, 0.4, 0.2].rnd(), 1/16);
hh.trigger.seq(1, 1/16);
hh.fx.add(dS);
dS.time = 1/10000;

dS.time.seq([1/2, 1/10000, 1/4, 1/8, 1/1000, 1/128], [1,2].rnd())

////////////////////////////////////
//06 tunnel to heaven
////////////////////////////////////
s.stop()
hh.stop()
b.stop()
resetHydra()
nDiv = 10
step = .05
colors = [[255, 255, 255], [0, 0, 0]];
draw = function () {
    let percent = (frameCount/2000)%(2*step);
    let x = 0;
    for (let i = 1; i > 0; i -= step) {
      let alpha = pow(i + percent, 5);
      drawRays(alpha*width, alpha*height, x);
      x++;
    }
    smooth = 6000
    image(dildos[4], width/2, height/2, choir1.out(2000,1,smooth), choir1.out(2000,1,smooth))
    image(dildos[5], width/2, height/2-choir2.out(800,0,smooth), choir2.out(2000,1,smooth), choir2.out(2000,1,smooth))
}
choir1.note.seq( [1,.75, .5].rnd(), Rndf(4,8) )
choir2.note.seq( [1,.75, .5].rnd(), Rndf(4,8) )
choir3.note.seq( [1,.75, .5].rnd(), Rndf(4,8) )

colors[1] = colors[1].map((c)=>c+10)

////////////////////////////////////
//07 dildo heaven
////////////////////////////////////
drone.note(1)
drone.fadein()
speed = 1.004
choir1.stop()
choir2.stop()
choir3.stop()
s = Sine({ frequency: 1000, gain:0 }).connect()

draw = function() {
  n = map(p5.noise(frameCount*0.008),0,1,-1,1.2)
  translate(width/2+100*n, height/2+100*n)
  fiboDicks(false, true, false)
  rotate(frameCount*0.1)
  //face()
}

heaven.trigger(1)

s.gain.fade(0, .3, 16)
canvas.style.display = "none";
src(o0).scale(1.0).blend(src(o1), ()=>1+s.out(10)).out();

s.gain.fade(.3,0,16)
clouds = loadVideo("http://127.0.0.1:8080/clouds.mp4")
fade = 0
draw = function() {
  tint(255,fade)
  fade += 0.01
  image(clouds, width/2, height/2, width, height);
}

drone.fadeout()