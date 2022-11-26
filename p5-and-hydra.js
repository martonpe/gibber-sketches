use("p5");
use("hydra").then((init) => init());

dick = loadImage("http://127.0.0.1:8080/Penis-Envy-Single.png");
smiley = loadImage("http://127.0.0.1:8080/smiley.png");
k = Kick();
console.log(smiley);
x = 0;
y = 0;
xPlus = 10;
yPlus = 10;
draw = function () {
  x += xPlus;
  y += yPlus;
  fill(cc[3], 255 * sin(frameCount * 0.005), 255 * cos(frameCount * 0.01));
  r = random();
  //image(smiley,x,y)
  s1 = dick.width * k.out() * cc[0];
  image(smiley, x, y, s1, s1);
  rect(y, x, 100, 100);

  if (x > width) xPlus = -10;
  if (x < 0) xPlus = 10;
  if (y > height) yPlus = -10;
  if (y < 0) yPlus = 10;
};

k.fx.add(Distortion({ pregain: 5 }));
s0.init({ src: canvas });
src(s0).modulate(o1).diff(o2).out();
render(o0);
osc(1, 4).kaleid(3).mask(shape(3).repeat(5, 5).kaleid(1)).out(o1);
osc().kaleid(3).out(o2);

k.trigger.seq(1, Euclid(2, 4, 1 / 16));
k.frequency = 60;
k.tone = 0;
