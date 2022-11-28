capture = createCapture(VIDEO);
capture.hide();

draw = function () {
  image(capture, 0, 0, width, height);
};

s0.init({ src: canvas });
src(s0).out();
src(s0).scale(0.1).kaleid().out(o0);

canvas.style.display = "none";
