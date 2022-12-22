verb  = Reverb({roomSize: .2} ).bus()
rLong  = Reverb().bus()
delay = Delay( '1/3' ).bus().connect( rLong, .5 )
 
background(0)
perc = FM( 'perc')
  .spread(.975)
perc.connect( delay, .5 )
perc.note.seq( sine( btof(7),7,7 )       , 1/8,  2 )
perc.pan = lfo('square',btof(2),1,0)

beat = Sampler('http://127.0.0.1:8080/tape/beat.mp3', { loops: true })
beat.rate.seq([1, 1/79, 1/64, 15].rnd(), [1/4,1/6].rnd())
beat.connect(verb, .9)
beat.connect(rLong, .9)
beat.note(.8)

birds = Sampler('http://127.0.0.1:8080/birds.mp3', { loops: true })
birds.note(.2)

bubbles = Sampler('http://127.0.0.1:8080/bubbles.mp3', { loops: true })
bubbles.note(.6)
bubbles.connect(verb, 1)

ginsberg = Sampler('http://127.0.0.1:8080/ginsberg.mp3', { gain: 10 })
ginsberg.note(1)
ginsberg.connect(verb, .8)
ginsberg.gain = 10

dS = Delay({time:1/32, feedback: .9, })
ginsberg.fx.add(dS)
dS.time.seq([1/2, 1/4, 1/64, 1/128, 1/8, 1/1000], 2)

bass = Synth('bleep', {attack: 1/4, decay: 1/2, gain: 1}).note.seq( [-17], 1/2 )
bass.gain = 1
bass.stop()

beat.rate.seq([1, 10, 79, 1/79, 64, 15].rnd(), [1/4,1/6].rnd())

siren = FM('brass')
siren.note.seq( [10,20], 1/4, 0, 1/8 )
siren.fadeout()
siren.gain = .5
 
//TODO: bring in some visual element with siren
