sound = Sampler({
  files:[
    'http://127.0.0.1:8080/technosexual/technosexual.mp3'
    'http://127.0.0.1:8080/technosexual/desire.mp3'
    'http://127.0.0.1:8080/technosexual/capitalism.mp3'
    'http://127.0.0.1:8080/technosexual/economic.mp3'
  ],
  loops: true
}
ts = Sampler('http://127.0.0.1:8080/technosexual/technosexual.mp3', { loops: true })
capital = Sampler('http://127.0.0.1:8080/technosexual/capitalism.mp3', { loops: true })
desire = Sampler('http://127.0.0.1:8080/technosexual/desire.mp3', { loops: true })
e = Sampler('http://127.0.0.1:8080/technosexual/economic.mp3', { loops: true })
r = Reverb({ wet2: 0.1 }).bus().connect();
dl = Delay({ time: 3 / 8 }).bus().connect(r);
ds = Delay({ time: 1 / 100, feedback: 0.9 }).connect(r);
ts.connect(dl, 0.4).connect(r, .9)
capital.connect(dl, 0.4).connect(r, .9)
desire.connect(dl, 0.4).connect(r, .9)
e.connect(dl, 0.4).connect(r, .9)
sound.connect(dl, 0.4).connect(r, .9)
 
sound.pick.seq( Rndi(0,3) )
sound.trigger(1)

sound.rate = lfo('square', 400, .3, .8)
sound.rate = .7


removeVideos()
vid = createVideo("http://127.0.0.1:8080/technosexual/vid0.mp4",() => {
  vid.loop()
  vid.hide()
  vid.volume(0)
});

webgl = createGraphics(width, height, WEBGL);
webgl.noStroke()

draw = function(){
  webgl.clear()
  webgl.texture(vid)
  webgl.box(width/2,height/2)
  
  webgl.translate(-2,2,-20)
  
  webgl.rotateX(0.005)
  webgl.rotateZ(0.01);
  
  image(webgl, 0, 0);
}
//TODO: find technosexual videos
