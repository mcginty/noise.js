/**
* noise.js
* simple, speedy, moddy ambient noise generation.
*
* pink noise generation based off of http://sampo.kapsi.fi/PinkNoise/
*/
    var Noise = function() {
        var self = this;

        // states
        this.active = false;

        //TODO: move when separating lower-level audio libraries from specific synthesizers.

        this.dev = audioLib.Sink(
            function(buffers, channels) { self.generateBuffer(buffers, channels); },
            2 //Stereo
        );
        this.bufferSize = this.dev.bufferSize;
        this.sampleRate = this.dev.sampleRate;
        this.limiter = audioLib.Limiter(this.sampleRate);
        this.volume = 100;
        this.actualVolume = 100;

        this.sources = [];
    }

    Noise.prototype = {
        addSource : function(source) {
            console.log("Adding sound source \""+source().name+"\". Total: " + (this.sources.length+1));
            console.log(arguments);
            var self = this;
            //TODO: support infinite arguments, not some magic "3" number.
            this.sources.push(source(this.sampleRate, arguments[1], arguments[2], arguments[3]));
        },

        //TODO: make safer
        removeSource : function(source) {
            console.log("Removing source \""+source().name+"\".");
            this.sources.splice(this.sources.indexOf(source),1);
        },

        setVolume : function(volume) {
            this.volume = volume;
            this.actualVolume = (this.volume*this.volume*this.volume)/(1000000);
        },

        generateBuffer : function(buffer, chans) {
            for (var i=0; i<buffer.length; i+=chans) {
                for (var j=0; j<this.sources.length; j++) {
                    this.sources[j].generate();
                    for (var c=0; c<chans; c++) {
                        buffer[i+c] += this.sources[j].getMix(c);
                        buffer[i+c] *= this.actualVolume;
                    } // each channel
                } // each source
            } // each sample
        }

    };
