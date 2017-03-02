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

for (var i = 0; i < OPTIONS; jobOrder[i++] = FlowShop.createRandomOrder(JOBS) );

var MAX_TRIALS = 30,
    best = { 
        makespan: Infinity,
        trial: 0,
        order: []
    },
    eAnt = new EigenAnt(jobOrder.map(function(p) {return FlowShop.makespan(p,SCHEDULE);}));

for(var trial = 1; trial <= MAX_TRIALS; trial++) {
    eAnt.initialize();
    var bestIdx = eAnt.run(200);
    if (FlowShop.makespan(jobOrder[bestIdx],SCHEDULE) < best.makespan) {
        best.makespan = FlowShop.makespan(jobOrder[bestIdx],SCHEDULE);
        best.trial = trial;
        best.order = jobOrder[bestIdx];
    }
}
console.log(`\nBest order was ${best.order} with a makespan of ${best.makespan} obtained on trial #${best.trial}\n`);

console.log( FlowShop.buildSchedule(best.order, SCHEDULE) );
