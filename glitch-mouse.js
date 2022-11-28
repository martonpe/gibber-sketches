glitch = new Glitch()
glitch.loadType('jpg')
glitch.loadQuality(.30)
glitch.errors(false)
capture = createCapture(VIDEO);
capture.hide();

draw = function () {
  if(mouseIsPressed){
    glitch.loadImage(capture)
  }
  glitch.limitBytes(map(mouseY,0, height, 0, 1))
  glitch.randomBytes(map(mouseX,0, width, 0, 100))
  glitch.buildImage()
  image(glitch.image,0,0,width,height)
};

