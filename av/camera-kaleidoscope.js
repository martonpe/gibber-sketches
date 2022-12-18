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
src(s0).scale(0.1).kaleid(4).out();
canvas.style.display = "block";