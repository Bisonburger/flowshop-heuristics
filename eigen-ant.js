/**
 * Eigen Ant problem setup
 * 
 * @module EigenAnt
 * @license ISC
 */
 
/**
 * construct an EigenAnt setup
 */
var EigenAnt = function( options ) {
    
    this.path = options? options.pathLengths : [],
    this.totalTrips = [],
    this.pheromoneConcentration = [],
    this.pathProb = [],
    this.d = [],
    this.alpha = (options && options.alpha) || 0.5,
    this.beta = (options && options.beta) || 1;

    this.initialize();

    /**
     * sum the pheromone concentrations
     */
    this.sumConcentration = function() {
        return this.pheromoneConcentration.reduce( (a, v) => a + v, 0);
    };

    /**
     * sum the total trips taken
     */
    this.sumTotalTrips = function() {
        return this.totalTrips.reduce((ac, v) => ac + v, 0);
    };

    /**
     * probabalisitically select a path
     */
    this.selectPath = function() {
        var me = this; // preserve this...
        var cdf = this.pathProb.map( (path, i) => me.pathProb.slice(0, i + 1).reduce( (a, v) => a + v, 0) );

        var p = Math.random();
        return cdf.findIndex((prob) => p < prob );
    };
};

/**
 * initialize the EginAnt setup
 */
EigenAnt.prototype.initialize = function() {
    for (var i = 0; i < this.path.length; i++) {
        this.totalTrips[i] = 0;
        this.pheromoneConcentration[i] = (1 / this.path.length);
        this.pathProb[i] = (1 / this.path.length);
        this.d[i] = (1 / this.path[i]);
    }
};



/**
 * run a set of walks for the EigenAnt setup
 */
EigenAnt.prototype.run = function(max,mutatePaths) {
    if (!max) max = 100;
    while (this.sumTotalTrips() < max) {
        var selected = this.selectPath();
        if (selected === -1) break; // handle errors with generating random #
        this.totalTrips[selected] += 1;
        if (isNaN(this.pheromoneConcentration[selected])) break; // handle over/under-run errors
        this.pheromoneConcentration[selected] = (1 - this.alpha) * this.pheromoneConcentration[selected] + (this.beta * this.d[selected] * this.pathProb[selected]);

        if( mutatePaths )
            this.path = mutatePaths( this.pathProb, this.path, this.pheromoneConcentration, this.sumTotalTrips() );
    
        for (var i = 0; i < this.path.length; i++) {
            if( !this.pheromoneConcentration[i] ) this.pheromoneConcentration[i] = 1 / this.path.length;
            this.pathProb[i] = this.pheromoneConcentration[i] / this.sumConcentration();
        }
    }
    var smallest = this.pathProb.reduce((a, v) => Math.max(a, v), -Infinity);
    return this.pathProb.findIndex((f) => f === smallest);
};

module.exports = EigenAnt;
