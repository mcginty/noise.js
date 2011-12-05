/**
* noise.js
* simple, speedy, moddy ambient noise generation.
*
* pink noise generation based off of http://sampo.kapsi.fi/PinkNoise/
*/
var noise = noise || {};
(function(window, document, undefined) {
    noise.ColorNoise = function() {
        var self = this;

        // states
        this.active = false;

        // default values
        this.alpha = 1;
        this.poles = 5;

        // private variables
        this.multipliers = [];
        this.values = [];
    };

    noise.ColorNoise.prototype = {
        initialize : function(options) {
            var self = this;
            if (options) {
                if ("alpha" in options) {
                    this.alpha = options.alpha;
                }

                if ("poles" in options) {
                    this.poles = options.poles;
                }
            }

            this.values = new Array(this.poles);
            for (var i=0; i<this.poles; i++) {
                this.values[i] = 0;
            }

            var a = 1.0;
            for (var i=0; i<this.poles; i++) {
                a = (i - this.alpha/2) * a / (i+1);
                this.multipliers[i] = a;
            }

            // Fill in the history with random values
            for (var i=0; i<5*this.poles; i++) {
                this.nextValue();
            }

            context = new webkitAudioContext();
            var node = context.createJavaScriptNode(16384, 0, 1);
            node.onaudioprocess = function(event) {self.gen(event)};
            gain = context.createGainNode();
            gain.gain.value = 0.5;
            node.connect(gain);
            gain.connect(context.destination);

            this.context = context;
            this.gain = gain;
        },

        nextValue : function() {

            // TODO: add option for gaussian distribution
            var x = Math.random() - 0.5;

            for (var i=0; i < this.poles; i++) {
                x -= this.multipliers[i] * this.values[i];
            }

            // Delete the last value
            for (var i=this.poles-1; i>0; i--) {
                this.values[i] = this.values[i-1];
            }

            // Insert x into beginning of array
            this.values[0] = x;
            return x;
        },

        gen : function(evt) {
            var buffer = evt.outputBuffer;

            for (var i=0; i<buffer.numberOfChannels; i++) {
                var buf = evt.outputBuffer.getChannelData(i);
                for (var j=0; j<buf.length; j++) {
                    buf[j] = this.nextValue();
                }
            }
        }

    };
})(this,this.document);
