ts = Sampler('http://127.0.0.1:8080/loosing.mp3', { loops: true })
r = Reverb({ wet2: 0.1 }).bus().connect();
dl = Delay({ time: 3 / 8 }).bus().connect(r);
ds = Delay({ time: 1 / 100, feedback: 0.9 }).connect(r);
ts.connect(dl, .3).connect(r, .6)

ts.trigger(1)

rectMode(CENTER)

bacground(0)
fill(0,200,0)
draw = function () {
  
  
  
  
  
};

s0.initScreen();
src(s0).scale(.8).scroll(0,0,0.01,()=>-0.01+ts.out(.01)).out();

canvas.style.display = 'none'

//TODO: put it on webgl later
//TODO: high pitched sine and white background