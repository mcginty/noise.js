/**
* noise.js
* simple, speedy, moddy ambient noise generation.
*/
var Noise = function() {
    var self = this;
    /*
     * Device initialization and information
     */

    // for details on sinks, see: https://github.com/jussi-kalliokoski/sink.js
    self.dev = audioLib.Sink(
        function(buffers, channels) { self.generateBuffer(buffers, channels); },
        2 //Stereo
    );
    this.bufferSize = this.dev.bufferSize;
    this.sampleRate = this.dev.sampleRate;

    this.lfo = {
        oscillator: audioLib.Oscillator(this.sampleRate, 0),
        amplitude : 0,
    }
    /*
     * State values
     */
    this.volume = 100;       // linear      scale
    this.actualVolume = 100; // logarithmic scale
                             // see: http://www.dr-lex.be/info-stuff/volumecontrols.html

    this.sources = [];       // current sources of generated audio
}

Noise.prototype = {
    /*
     * add an audioLib generator function to the output.
     * to make your own, see: https://github.com/jussi-kalliokoski/audiolib.js/blob/master/specs/generators.md
     */
    addSource : function(source) {
        console.log('Adding sound source "'+source().name+'".');

        var args = Array.prototype.slice.call(arguments);
        args[0] = this.sampleRate; // remove first argument (source) from the arguments list.

        source = { 
            volume : 100, //TODO: support volume control at source add
            func   : source.apply(this, args)
        };
        this.sources.push(source);
        return source;
    },

    //TODO: make safer
    removeSource : function(source) {
        console.log("Removing source \""+source.func.name+"\".");
        this.sources.splice(this.sources.indexOf(source),1);
    },

    /*
     * setVolume sets human-readable volume and approximate logarithmic volume
     * 0 <= volume <= 100
     *
     * log-volume is approximated with x^3 for medium-SPL outputs.
     * note that if you're a badass and want to output at massive dBs, might want to modify this.
     */
    setVolume : function(volume) {
        // set volume, 0 < volume < 100
        this.volume       = (volume > 100 ? 100 : volume) < 0 ? 0 : volume;
        this.actualVolume = (this.volume*this.volume*this.volume)/(1000000);
    },

    setVolumeLFO : function(freq, amplitude) {
        this.lfo = {
            oscillator: audioLib.Oscillator(this.sampleRate, freq),
            amplitude : amplitude,
        };
    },

    /*
     * generateBuffer is the "master mix" creator for the output.
     *
     * For each source (see: addSource/removeSource): get its mix,
     * apply related volume controls, then add it to the sample.
     * Finally, apply master volume multiplier and declare job well done.
     */
    generateBuffer : function(buffer, chans) {
        var osc = this.lfo.oscillator;
        osc.generate();
        this.setVolume(this.volume + osc.getMix()*this.lfo.amplitude);
        for (var i=0; i<buffer.length; i+=chans) {
            for (var j=0; j<this.sources.length; j++) {
                this.sources[j].func.generate();
                for (var c=0; c<chans; c++) {
                    buffer[i+c] += this.sources[j].func.getMix(c);
                    //TODO: add per-source volume control.
                } // each channel
            } // each source
            // Master volume multiplier
            for (var c=0; c<chans; c++) {
                buffer[i+c] *= this.actualVolume;
            }
        } // each sample
    }
};
