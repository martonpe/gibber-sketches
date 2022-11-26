use("p5");

Theory.mode = "chromatic";

class Rect {
  static counter = Array();
  constructor(size = 100) {
    this.s = Synth("square.bass", {
      attack: 1/2,
      decay: 1/2,
      waveform: "saw",
    });
    this.color = [rndi(255), rndi(255), rndi(255)];
    this.pos = { x: rndi(width), y: rndi(height) };
    this.size = 5 * size;
    Rect.counter.push(this);
  }
  draw() {
    fill(...this.color);
    rect(this.pos.x, this.pos.y, this.s.out(5 * this.size));
  }
  static draw() {
    Rect.counter.forEach((r) => {
      r.s.attack = cc[32] / 2;
      r.draw();
    });
  }
  static set attack(newAttack){
    Rect.counter.forEach((r) => {
      r.s.attack = newAttack
    })
  }
  static set size(newSize){
    Rect.counter.forEach((r) => {
      r.s.size = newSize
    })
  }
}

eval(Rect.toString() + ";window.Rect=Rect");


r = [...new Array(30)].map(() => new Rect());

Rect.attack = 0;
Rect.size = 100;

for (i = 0; i < 3; i++) {
  r[i].s.note.seq(rndi(5, 20), Rndf(1, 4), 1);
}

notebook = loadImage("http://127.0.0.1:8080/notebook.jpg");
win95 = loadImage("http://127.0.0.1:8080/win95.webp");

for (i = 0; i < 10; i++) {
  r[i].s.stop();
}

rectMode(CENTER);
imageMode(CENTER);

draw = function () {
  background(0);
  //image(notebook,width/2, height/2,width,height)
  Rect.draw();
};
