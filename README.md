noise.js will kill you and cure cancer
======================================
A platform for creating walls of ambient synthesized noise.

how i use
=========
```javascript
var noise = new Noise();

// add an audioLib generator and any arguments for said generator.
// it will be initialized by noise.js and stored and cared for
// with utmost respect.
noise.addSource(audioLib.Noise, "brown");

// what's that? one noise not good enough for you?
// start a binaural beat generator at 200Hz with 10Hz spread
// (200Hz in left ear, 210Hz in right ear)
noise.addSource(audioLib.Binaural, 200, 10)

noise.setVolume(75); // pump that shit up
```
That's it! Sound should be spewing out of your overpriced stupid looking Beats Audio Headphones in Web Audio API-supported browsers.

+ White/Pink/Brown noise
+ Binaural beats

platform goals
--------------
Ambience can be abstracted to a noise that lasts infinitely long, and may or may not be procedurally generated.

`noise.js` should be a solid platform for this type of sound. Not only one of these sounds, but any number of them played at the same time. The only limit should be the CPU.

LICENSE
-------
	DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	Version 2, December 2004

	Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

	Everyone is permitted to copy and distribute verbatim or modified
	copies of this license document, and changing it is allowed as long
	as the name is changed.

    DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

    0. You just DO WHAT THE FUCK YOU WANT TO.