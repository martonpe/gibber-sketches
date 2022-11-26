f = FM("frog");
f.note.seq([-10, -5, 2, -20, -13], [1/4, 1/2, 1/8].rnd());
f.fx.add(Reverb("room"));
f.fx[0].wet1 = 0.2;
f.decay = 1 / 4;
f.cmRatio = sine(.05, .5, .5)
background(40)
angle = 0
f.fadein(48)
 
draw = function () {
  angle += 0.02
  background(0, 4)
  fill(255*(.5*sin(angle)+.5), 255*(.5*cos(angle*.5)+.5), 255)
  translate(mouseX, mouseY);
  const b = f.out(2000);
  rect(b * -0.5, b * -0.5, b, b);
};
