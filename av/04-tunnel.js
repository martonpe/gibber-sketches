choir1 = Sampler("http://127.0.0.1:8080/choir1.mp3")
choir2 = Sampler("http://127.0.0.1:8080/choir2.mp3")
choir3 = Sampler("http://127.0.0.1:8080/choir3.mp3")
 
r = Reverb().bus()
choir1.connect(r)
choir2.connect(r)
choir3.connect(r)
 
d1 = loadImage("http://127.0.0.1:8080/dildo0.png");
d2 = loadImage("http://127.0.0.1:8080/dildo1.png");
nDiv = 10
step = .05
colors = [[5, 5, 5], [0, 0, 0]];
imageMode(CENTER)
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

draw = function () {
  let percent = (frameCount/1000)%(2*step);
  let x = 0;
  for (let i = 1; i > 0; i -= step) {
    let alpha = pow(i + percent, 5);
    drawRays(alpha*width, alpha*height, x);
    x++;
  }
  smooth = 6000
  image(d1, width/2, height/2, choir1.out(2000,1,smooth), choir1.out(2000,1,smooth))
  image(d2, width/2, height/2-choir2.out(800,0,smooth), choir2.out(2000,1,smooth), choir2.out(2000,1,smooth))
}

choir1.note.seq( [1,.75, .5].rnd(), Rndf(4,8)/* 351805.9 */  )
choir2.note.seq( [1,.75, .5].rnd(), Rndf(4,8)/* 427182.5 */  )
choir3.note.seq( [1,.75, .5].rnd(), Rndf(4,8)/* 499219.6 */  )

colors[0] = colors[0].map((c)=>c+10)
colors[1] = colors[1].map((c)=>c+10)

