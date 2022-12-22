Clock.bpm = 140

loop92 = Sampler('http://127.0.0.1:8080/metatron/92.wav')
loop93 = Sampler('http://127.0.0.1:8080/metatron/93.mp3')
loop108 = Sampler('http://127.0.0.1:8080/metatron/108.wav')
amnesia = Sampler('http://127.0.0.1:8080/metatron/amnesia.mp3', { loops: true })

loop92.note.seq(1, 4, 0)
loop92.fadeout()
loop92.note.seq(1, 5/6, 1)
loop92.note.seq(1, 3/6, 2)
loop93.note.seq(1, 4)

loop108.fadeout()
amnesia.gain.fade(0,1,4)

amnesia.gain = 0
loop108.note.seq(1, 4)
loop108.stop()
amnesia.note(1)

background(0)
pixelDensity(1) // fixes retina display offset
setAttributes('antialias', true) // toggle depending on display / performance
tex = createGraphics(width, height)
tex.background(0)
webgl = createGraphics(width, height, WEBGL)
theShader = webgl.createShader(vertShader, fragShader)
words = ['EXTASY', 'DREAM', 'ETERNITY']
wordNo = 0
images = [];
for (i = 0; i < 9; i++) {
  images[i] = loadImage("http://127.0.0.1:8080/geni" + i + ".png");
}
tex.imageMode(CENTER)

draw = function() {
  if(frameCount%200 == 0){
    wordNo = rndi(2)
  }
  sound = (loop108.out() + loop92.out() + loop93.out() + amnesia.out()) * 2
  
  if(frameCount%10 == 0){
	// draw on 'tex', which is passed into shader
	tex.noFill()
	tex.stroke(255)
	let y = random(tex.height)
	tex.image(images[rndi(8)],random(width), random(height), 550, 550)
	// text
	tex.fill(255)
	tex.textSize(tex.width / 5)
	tex.textAlign(CENTER, CENTER)
	tex.text(words[wordNo], tex.width / 2, tex.height / 2)
	}  
  
	// pass required uniforms to our shader (don't change)
	theShader.setUniform("resolution", [width, height])
	theShader.setUniform('tInput', tex)
	theShader.setUniform("max_distort", abs(sin(frameCount * .001) * 5))
	theShader.setUniform("iMouse", [0.5 + sin(frameCount * .01) * .3, .5 + cos(frameCount * .1) * map(sound, 0, .2, 0, 1)])
	theShader.setUniform("num_iter", 12)
	theShader.setUniform("focalDistance", 42.0)
	theShader.setUniform("aperture", 12.0)
 
	// set + display shader
	webgl.shader(theShader) // apply shader
	webgl.rect(0, 0, width, height) // display shader
  
  image(webgl,width/2,height/2)
}

/* SHADER DEFINITIONS */
vertShader = `
	attribute vec3 aPosition;
	attribute vec2 aTexCoord;
	
	varying vec2 vTexCoord;
	
	void main() {
	  vTexCoord = aTexCoord;
	
	  vec4 positionVec4 = vec4(aPosition, 1.0);
	  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
	
	  gl_Position = positionVec4;
	}
`
fragShader = `
	#ifdef GL_ES
	precision mediump float;
	#endif
	
	uniform sampler2D tInput;
	uniform vec2 resolution;
	uniform float max_distort;
	uniform vec2 iMouse;
	
	vec2 barrelDistortion(vec2 coord, float amt) {
		vec2 cc = coord - iMouse;
		float dist = dot(cc, cc);
		return coord + cc * dist * amt;
	}
	
	float sat( float t )
	{
		return clamp( t, 0.0, 1.0 );
	}
	
	float linterp( float t ) {
		return sat( 1.0 - abs( 2.0*t - 1.0 ) );
	}
	
	float remap( float t, float a, float b ) {
		return sat( (t - a) / (b - a) );
	}
	
	vec4 spectrum_offset( float t ) {
		vec4 ret;
		float lo = step(t,0.5);
		float hi = 1.0-lo;
		float w = linterp( remap( t, 1.0/6.0, 5.0/6.0 ) );
		ret = vec4(lo,1.0,hi, 1.) * vec4(1.0-w, w, 1.0-w, 1.);
	
		return pow( ret, vec4(1.0/2.2) );
	}
	
	const int num_iter = 37;
	
	void main()
	{	
		vec2 uv=(gl_FragCoord.xy/resolution.xy*1.0)+.0;
		uv.y = 1.0 - uv.y;
		
		float reci_num_iter_f = 1.0 / float(num_iter);
		vec4 sumcol = vec4(0.0);
		vec4 sumw = vec4(0.0);	
		for ( int i=0; i<num_iter;++i )
		{
			float t = float(i) * reci_num_iter_f;
			vec4 w = spectrum_offset( t );
			sumw += w;
			sumcol += w * texture2D( tInput, barrelDistortion(uv, .16 * max_distort*t ) );
		}
			
		gl_FragColor = sumcol / sumw;
	}
`