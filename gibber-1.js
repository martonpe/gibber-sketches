Clock.bpm = 160;

b = Monosynth("short.dry");
b.note.seq((patt = [-20, -20, -20, -20, -21]), 1 / 8);
b.cutoff = 0.1;
b.Q = 0.01;
b.attack = 0;
b.loudness.seq([1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], 1 / 8);
b.fadein();
b.gain = 1;

patt.transpose(2);
patt.transpose(-2);

b.fadeout();

Theory.tuning = "slendro";

s = Synth("bleep");
s.loudness.seq((sp = [1, 0.05, 0.05, 0.05, 0.05, 0.2, 0.1, 0.1]), 1 / 16);
s.note.seq([0, 2, 4, 5, 8], 1 / 16);
s.cutoff = 0.2;
s.decay = 1 / 16;
s.gain = 0.3;
s.fx.add(Reverb({ mix: 0.5, damping: 2 }));

s.fx[0].damping = 2;

s.fadeout();

p = Freesound(632026);
p.trigger(0);
p.loudness.seq([1, 0.1, 0.1, 0.1], 1 / 4);
p.trigger.seq(0, 2);
p.pan.seq([0, 1, 0, 1, 0], 2);
p.rate.seq((pp = [0.2, 0.102, 0.4]), 1 / 8);
p.spread = 8;
p.attack = 1 / 4;
r = Reverb("space");
p.fx.add(r);
d = Delay({ time: 1 / 24, feedback: 0.8 });
p.fx.add(d);
p.gain.seq(sine(0.01, 0.5, 2), 4);
p.fadein();

p.fx[1].time = 1 / 24;
p.fx[1].feedback = 0.8;

pp.transpose(-0.1);

p.stop();

hh = Hat();
hh.tune.seq((hhp = [0.7, 0.705].rnd()), 1 / 8);
hh.gain.seq([0.2, 0.2, 0.2, 0.2, 0.4, 0.2].rnd(), 1 / 16);
hh.trigger.seq(1, 1 / 16);
hh.fx.add(Reverb({ damping: 2, wet2: 0.5 }));
hh.gain = 0.1;

hh.fx[0].wet2 = 1;
hh.fx.add(Delay({ time: 1 / 128, feedback: 0.1 }));

hh.fx[1].time = 1 / 128;
hh.fx[1].feedback = 0.9;

hhp.transpose(-0.01);

hh.stop();
