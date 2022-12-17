dildos = [
  loadImage("http://127.0.0.1:8080/dildo3.png"),
  loadImage("http://127.0.0.1:8080/dildo4.png"), 
  loadImage("http://127.0.0.1:8080/dildo5.png"),
  loadImage("http://127.0.0.1:8080/dildo2.png"),
  loadImage("http://127.0.0.1:8080/dildo0.png"),
  loadImage("http://127.0.0.1:8080/dildo1.png"),
]
 
heaven = Sampler('http://127.0.0.1:8080/heaven.mp3', {gain: 2})
d1 = Sampler('http://127.0.0.1:8080/drone1.mp3', {loops: true, gain: 1.5})
 
heaven.trigger(1)
 
d1.note(1)
d1.fadein()
 
move = Sine({frequency: 100, gain:0}).connect()
 
move.gain.fade(.5, 0, 4)
move.frequency.fade(1000,100,16) 
move.gain = .5

imageMode(CENTER)
angleMode(DEGREES)
scale = fibs[fibs.length-5]/fibs[fibs.length-1]
 
fiboDicks = function(){
  //FIBONACCI ZOOM
  push()
  for (let i = 0; i < fibs.length; i++) {
    scaledFib = fibs[i]*scale
    dildo = dildos[i%4]
    
    push()
    rotate(-155)
    image(dildo, -scaledFib/2, -scaledFib/2, scaledFib, scaledFib)
    
    rotate(-155)
    image(dildo, scaledFib, -scaledFib/2, scaledFib, scaledFib)
    
    rotate(-155)
    image(dildo, -scaledFib/2, -scaledFib/2, scaledFib, scaledFib)
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
 
speed = 1.008
 
draw = function() {
  n = map(p5.noise(frameCount*0.008),0,1,-1,1)
  translate(width/2+100*n, height/2+100*n)
  
  fiboDicks()
  
  background(255,255 - move.out(1000))
  
  rotate(frameCount*0.1)
  
  //FACE
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
  
  push()
  rotate(90)
  image(dildos[4],120+heaven.out(40),0,150,150)
  rotate(180)
  image(dildos[4],-110+heaven.out(30),0,150,150)
  pop()
}