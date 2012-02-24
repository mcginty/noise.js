/**
 * Creates a new Binaural Beat noiseJS module.
 * See: http://en.wikipedia.org/wiki/Binaural_beats
*/

audioLib.Binaural = audioLib.generators("BinauralTone", function (sampleRate, freq, spread)
{
    var self          = this;
    self.frequency    = isNaN(freq)   ? 440 : freq;
    self.spread       = isNaN(spread) ? 10  : spread;
    self.sampleRate   = sampleRate;
},
{
    sampleRate:  44100,
    frequency:   440,
    spread:      10,
    phaseOffset: 0,
    pulseWidth:  0.5,
    fm:          0,
    phase:       [0,0],
    _p:          [0,0],

    generate: function(){
        var self = this,
            f    = [+self.frequency,+self.frequency+self.spread],
            pw   = self.pulseWidth,
            p    = self.phase;
        f[0] += f[0] * self.fm;
        f[1] += f[1] * self.fm;
        self.phase[0]    = (p[0] + f[0] / self.sampleRate / 2) % 1;
        self.phase[1]    = (p[1] + f[1] / self.sampleRate / 2) % 1;
        p[0]        = (self.phase[0] + self.phaseOffset) % 1;
        p[1]        = (self.phase[1] + self.phaseOffset) % 1;
        self._p[0]        = p[0] < pw ? p[0] / pw : (p[0]-pw) / (1-pw);
        self._p[1]        = p[1] < pw ? p[1] / pw : (p[1]-pw) / (1-pw);
    },

    getMix: function(channelNumber){
        return Math.sin(this._p[channelNumber] * Math.PI*2);
    }
});
