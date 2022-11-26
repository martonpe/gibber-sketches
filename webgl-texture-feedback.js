use("p5");

dick = loadImage("http://127.0.0.1:8080/dick-flower.png");
imageMode(p5.CENTER);
cg = createGraphics(800, 800, WEBGL);
cg2 = createGraphics(800, 800, WEBGL);
draw = function () {
  background(125, 255, 0);
  cg.clear();
  cg.texture(cg2);
  cg.plane(805, 805);
  cg.texture(dick);
  cg2.background(125, 255, 0);

  cg2.rotateZ(0);

  cg.plane(200, 200);
  cg2.push();
  cg2.scale(1.2, 1.2);
  cg2.texture(cg);
  cg2.plane(800, 800);
  cg2.pop();
  s1 = 4 * dick.width;
  image(cg2, width / 2, height / 2, s1, s1);
};
