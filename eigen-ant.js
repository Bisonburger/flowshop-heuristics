/**
 * Eigen Ant problem setup
 * 
 * @module EigenAnt
 * @license ISC
 */
 
//const events = require('events');

/**
 * construct an EigenAnt setup
 */
var EigenAnt = function(pathLengths, alpha, beta) {
    //this.eventEmitter = new events.EventEmitter(); 
    this.paths = pathLengths.length,
        this.path = pathLengths,
        this.totalTrips = [],
        this.pheromoneConcentration = [],
        this.pathProb = [],
        this.d = [],
        this.alpha = (alpha || 0.5),
        this.beta = (beta || 1);

    this.initialize();

    /**
     * sum the pheromone concentrations
     */
    this.sumConcentration = function() {
        return this.pheromoneConcentration.reduce(function(a, v) {
            return a + v;
        }, 0);
    };

    /**
     * sum the total trips taken
     */
    this.sumTotalTrips = function() {
        return this.totalTrips.reduce(function(ac, v) {
            return ac + v;
        }, 0);
    };

    /**
     * probabalisitically select a path
     */
    this.selectPath = function() {
        var me = this;
        var cpf = this.pathProb.map(function(path, i) {
            return me.pathProb.slice(0, i + 1).reduce(function(a, v) {
                return a + v;
            }, 0);
        });

        var p = Math.random();
        return cpf.findIndex(function(prob) {
            return p < prob;
        });
    };
};

/**
 * initialize the EginAnt setup
 */
EigenAnt.prototype.initialize = function() {
    for (var i = 0; i < this.paths; i++) {
        this.totalTrips[i] = 0;
        this.pheromoneConcentration[i] = (1 / this.paths);
        this.pathProb[i] = (1 / this.paths);
        this.d[i] = (1 / this.path[i]);
    }
};



/*
EigenAnt.prototype.replaceWorst = function(initialConcentration) {
    // replace the worst one with a random path
    var worst = this.pathProb.reduce(function(a, v) {
        return Math.min(a, v);
    }, Infinity);
    var idx = this.pathProb.findIndex(function(f) {
        return f === worst;
    });
    this.path[idx] = this.fnNewLength();
    this.pheromoneConcentration[idx] = initialConcentration;
};
*/

/**
 * run a set of walks for the EginAnt setup
 */
EigenAnt.prototype.run = function(max) {
    if (!max) max = 100;
    while (this.sumTotalTrips() < max) {
        var selected = this.selectPath();
        if (selected === -1) break; // handle errors with generating random #
        this.totalTrips[selected] += 1;
        if (isNaN(this.pheromoneConcentration[selected])) break; // handle underrun errors
        this.pheromoneConcentration[selected] = (1 - this.alpha) * this.pheromoneConcentration[selected] + (this.beta * this.d[selected] * this.pathProb[selected]);

        // TODO emit an event here...
        //this.eventEmitter.emit( 'ant-walk', this.pathProb );

        //replaceWorst(sumConcentration() / paths);

        for (var i = 0; i < this.paths; i++) {
            this.pathProb[i] = this.pheromoneConcentration[i] / this.sumConcentration();
        }
    }
    var smallest = this.pathProb.reduce(function(a, v) {
        return Math.max(a, v);
    }, -Infinity);
    return this.pathProb.findIndex(function(f) {
        return f === smallest;
    });
};

module.exports = EigenAnt;
