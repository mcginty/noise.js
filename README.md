noise.js will cure cancer
=========================
A super simple platform for creating walls of ambient synthesized noise.

how i use
=========
```javascript
var noise = new Noise();

// white, pink, or brown
noise.addSource(audioLib.Noise, "brown");

// 200Hz left ear, 210Hz right ear
noise.addSource(audioLib.Binaural, 200, 10);

// sinusoidal A440
noise.addSource(audioLib.Oscillator, 440);

// 1 to 100, noise.js takes care of the logarithmic volume calculations
noise.setVolume(75);

noise.removeSource(audioLib.Binaural);
```
That's it! Sound should be spewing out of your overpriced stupid looking Beats Audio Headphones in Web Audio API-supported browsers.

+ White/Pink/Brown noise
+ Binaural beats
	
LICENSE
=======
Simplicity at its finest:

	DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	Version 2, December 2004

	Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

	Everyone is permitted to copy and distribute verbatim or modified
	copies of this license document, and changing it is allowed as long
	as the name is changed.

    DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

    0. You just DO WHAT THE FUCK YOU WANT TO.