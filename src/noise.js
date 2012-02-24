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
        this.dev = audioLib.Sink(
            function(buffers, channels) { self.generateBuffer(buffers, channels); },
            2 //Stereo
        );
        this.bufferSize = this.dev.bufferSize;
        this.sampleRate = this.dev.sampleRate;

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
        addSource : function(source, opts) {
            console.log("addSource called.");
            console.log("Adding sound source \""+source().name+"\". Total: " + (this.sources.length+1));
            console.log(arguments);
            var self = this;
                opts = {
                    sampleRate: this.sampleRate
                };
            }
            else {
                opts['sampleRate'] = this.sampleRate;
            }

            console.log(opts);
            this.sources.push({
                volume: 100,
                func: source(opts)
            });
        },

        //TODO: make safer
        removeSource : function(source) {
            console.log("Removing source \""+source().name+"\".");
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
            this.volume = (volume > 100 ? 100 : volume) < 0 ? 0 : volume;
            this.actualVolume = (this.volume*this.volume*this.volume)/(1000000);
        },

        /*
         * generateBuffer is the "master mix" creator for the output.
         *
         * For each source (see: addSource/removeSource): get its mix,
         * apply related volume controls, then add it to the sample.
         * Finally, apply master volume multiplier and declare job well done.
         */
        generateBuffer : function(buffer, chans) {
            for (var i=0; i<buffer.length; i+=chans) {
                for (var j=0; j<this.sources.length; j++) {
                    this.sources[j].generate();
                    for (var c=0; c<chans; c++) {
                        buffer[i+c] += this.sources[j].getMix(c);
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
