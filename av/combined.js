//SAMPLES
beat = Sampler('http://127.0.0.1:8080/tape/beat.mp3', { loops: true })
birds = Sampler('http://127.0.0.1:8080/birds.mp3', { loops: true })
bubbles = Sampler('http://127.0.0.1:8080/bubbles.mp3', { loops: true })

moans = [];
ambiences = [];
for (i = 0; i < 9; i++) {
    moans[i] = "http://127.0.0.1:8080/moans/moan" + i + ".mp3"
    ambiences[i] = Sampler("http://127.0.0.1:8080/hdri/" + i + ".wav", {loops: true, gain: 0})
}
moan =  Sampler({
    files: moans,
    gain: .5
})

choir1 = Sampler("http://127.0.0.1:8080/choir1.mp3")
choir2 = Sampler("http://127.0.0.1:8080/choir2.mp3")
choir3 = Sampler("http://127.0.0.1:8080/choir3.mp3")
drone = Sampler('http://127.0.0.1:8080/drone1.mp3', {loops: true, gain: 1.5})
spacetime = Sampler("http://127.0.0.1:8080/spacetime.mp3", { loops: true });
losing1 = Sampler('http://127.0.0.1:8080/losing.mp3', { loops: true, gain: 1.5})
losing2 = Sampler('http://127.0.0.1:8080/losing2.mp3', { loops: true, gain: 2})
technosexual = Sampler('http://127.0.0.1:8080/technosexual/technosexual.mp3', { gain: 2 })
productive = Sampler('http://127.0.0.1:8080/technosexual/productive.mp3', { loops: true, gain: 2 })
sex = Sampler('http://127.0.0.1:8080/technosexual/moans.mp3', { loops: true, gain: 1 })
rave = Sampler('http://127.0.0.1:8080/technosexual/rave2.mp3')
k = Sampler('http://127.0.0.1:8080/technosexual/kick1.mp3')
acid = Sampler('http://127.0.0.1:8080/acid2.mp3', {gain: 2})
relax = Sampler('http://127.0.0.1:8080/relax1.mp3', { loops: true, gain: 2 })
loop92 = Sampler('http://127.0.0.1:8080/metatron/92.wav')
loop93 = Sampler('http://127.0.0.1:8080/metatron/93.mp3')
loop108 = Sampler('http://127.0.0.1:8080/metatron/108.wav')
amnesia = Sampler('http://127.0.0.1:8080/metatron/amnesia.mp3', { loops: true })

// the long ones
teardrops = Sampler("http://127.0.0.1:8080/teardrops.mp3", { loudness: 0.1 });
ginsberg = Sampler('http://127.0.0.1:8080/ginsberg.mp3', { gain: 10 })
heaven = Sampler('http://127.0.0.1:8080/heaven.mp3', {gain: 2})
changes = Sampler('http://127.0.0.1:8080/changes.mp3', { gain: 2})


//EFFECTS

//IMAGES

//FUNCTIONS

//VIDEOS

//SKETCHES