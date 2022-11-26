use("p5");

vid = createVideo("http://127.0.0.1:8080/porn-1.mp4", () => {
  vid.loop();
  vid.volume(0);
  vid.hide();
});
imageMode(p5.CENTER);

draw = function () {
  vid.loadPixels();
  for (let i = 0; i < vid.pixels.length; i += 4) {
    if (vid.pixels[i] > 125) {
      vid.pixels[i] = 255;
      vid.pixels[i + 1] = 255;
    }
  }
  vid.updatePixels();

  translate(
    width * (0.5 + 0.4 * cos(frameCount * 0.01)),
    height * (0.5 + 0.4 * sin(frameCount * 0.01))
  );
  image(vid, 0, 0, vid.width / 2, vid.height / 2);
};
