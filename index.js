/**
 * develop a flowshop probem solution using Eigen Ant heuristic
 * 
 * @license ISC
 */
var FlowShop = new (require("./flowshop.js"))(),
    EigenAnt = require("./eigen-ant.js"),
    Taillard = require("./taillard.js"),
    
    OPTIONS = 200,
    jobOrder = [],
    SCHEDULE = Taillard.t02,
    JOBS = SCHEDULE[0].length;

// Initialize a set of random ant paths
for (var i = 0; i < OPTIONS; jobOrder[i++] = FlowShop.createRandomOrder(JOBS) );


// define a mutate function that will replace the 'worst' path every 5 trials
var replaceWorst = function(pathProb,path,pheromoneConcentration,tripIdx) {
    if( tripIdx % 5 === 0 ){
        // replace the worst one with a random path
        var worst = pathProb.reduce( (a, v) => Math.min(a, v), Infinity);
        var idx = pathProb.findIndex( (f) => f === worst );
        jobOrder[idx] = FlowShop.createRandomOrder(JOBS);
        path[idx] = FlowShop.makespan(jobOrder[idx],SCHEDULE);
        pheromoneConcentration[idx] = 1 / JOBS;
    }
    return path;
};


var MAX_TRIALS = 30,
    best = { 
        makespan: Infinity,
        trial: 0,
        order: []
    },
    eAntOptions = { 
        pathLengths: jobOrder.map( (p) => FlowShop.makespan(p,SCHEDULE) ) 
    },
    eAnt = new EigenAnt( eAntOptions );

for(var trial = 1; trial <= MAX_TRIALS; trial++) {
    eAnt.initialize();
    var bestIdx = eAnt.run(200,replaceWorst);
    if (FlowShop.makespan(jobOrder[bestIdx],SCHEDULE) < best.makespan) {
        best.makespan = FlowShop.makespan(jobOrder[bestIdx],SCHEDULE);
        best.trial = trial;
        best.order = jobOrder[bestIdx];
    }
}
console.log(`\nBest order was ${best.order} with a makespan of ${best.makespan} obtained on trial #${best.trial}\n`);
