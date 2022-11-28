ts = Sampler('http://127.0.0.1:8080/technosexual.mp3', { loops: true })
r = Reverb({ wet2: 0.1 }).bus().connect();
dl = Delay({ time: 3 / 8 }).bus().connect(r);
ds = Delay({ time: 1 / 100, feedback: 0.9 }).connect(r);
ts.connect(dl, 0).connect(r, .1)

ts.trigger(1)
ts.rate = lfo('square', 400, .3, .8)

//TODO: find technosexual videos