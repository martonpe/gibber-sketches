f = FM[5]("frog");
f.note.seq([-10, -5, 2, -20, -13], [1,1/2, 1/8].rnd());
f.fx.add(Reverb("room"));
f.fx[0].wet1 = .3;
f.decay = 1 / 4;

f.cmRatio = .9
background(40)

f.fadein(48)

//colorful ellipse worm
draw = function () {
  speedX = sin(frameCount * .011)
  speedY = sin(frameCount * .028)
  if(frameCount%2000>1000){
		fill(255)
    f.cmRatio = .99
  }
  else{
    f.cmRatio = .2
    fill(100+200*speedX, f.out(1000), 100+200*speedY)  
  }
  x = map(noise(frameCount * .004),0,1,-200, width+300)
	y = map(noise(frameCount * .006),0,1,-200, height+300)
  translate(x, y);
  const b = 3 + f.out(400);
  ellipse(0,0,b);
};

//rectagle worm
draw = function () {
  x = noise(frameCount * .0002) * width
	y = noise(frameCount * .0003) * height
  translate(x, y);

  fill(255)
  b = (.1 + speedX) * f.out(1000);
  rect(b * -0.5, b )* -0.5, b, b);
};
