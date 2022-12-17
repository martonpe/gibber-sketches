c1 = Sampler("http://127.0.0.1:8080/choir1.mp3")
c2 = Sampler("http://127.0.0.1:8080/choir2.mp3")
c3 = Sampler("http://127.0.0.1:8080/choir3.mp3")
c1.note.seq( [1,.75, .5].rnd(), Rndf(4,8)  )
c2.note.seq( [1,.75, .5].rnd(), Rndf(4,8)  )
c3.note.seq( [1,.75, .5].rnd(), Rndf(4,8)  )
r = Reverb().bus()
c1.connect(r)
c2.connect(r)
c3.connect(r)

c1.stop()
c2.stop()
c3.stop()

d1 = loadImage("http://127.0.0.1:8080/dildo0.png");
d2 = loadImage("http://127.0.0.1:8080/dildo1.png");
nDiv = 10
step = .05
colors = [color(255, 255, 0), color(0, 0, 0)];
imageMode(CENTER)
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
 
draw = function () {
  let percent = (frameCount/500)%(2*step);
  let x = 0;
  for (let i = 1; i > 0; i -= step) {
    let alpha = pow(i + percent, 5);
    drawRays(alpha*width, alpha*height, x);
    x++;
  }
  smooth = 6000
  image(d1, width/2, height/2, c1.out(2000,1,smooth), c1.out(2000,1,smooth))
  image(d2, width/2, height/2-c2.out(800,0,smooth), c2.out(2000,1,smooth), c2.out(2000,1,smooth))
}

p = Monosynth('edgy', {attack: 1/4, gain: 1}).fx.add(Reverb()).fx.add(BitCrusher({bitDepth: .2})).fx.add(Distortion({gain: 2}))
p.note(1)

s0.init({ src: canvas });
canvas.style.display = "none"
src(s0).pixelate(()=>max(10,width-p.out(7000)),()=>max(10,height-p.out(7000))).rotate(0,.1 ).out();
