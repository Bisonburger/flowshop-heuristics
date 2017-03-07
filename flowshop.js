/**
 * Flowshop problem setup
 * 
 * @module Flowshop
 * @license ISC
 */
 
/**
 * constructor for the Flowshop setup.  Initializes the dataset to Taillard t01
 * with an ub of 1278 and a lb of 1232
 */
var Flowshop = function Flowshop() {
};

/**
 * compute the makespan given a order of jobs
 * 
 * @param {Array} order - array of job orders; order[0] is the first job, order[1] the second, ...
 *  expectation is that jobs are listed only once for the ordered array (but there is no check)
 * @return {Number} makespan of the schedule given the order of jobs
 */
Flowshop.prototype.makespan = function(order,SCHEDULE) {
    var job, mcn, JOBS = order.length, MACHINES = SCHEDULE.length;

    var finishTimes = [];
    for (job = 0; job < JOBS; job++) {
        finishTimes[job] = [];
    }

    // order the columns of the original processingTimes by the new processing order
    for (job = 0; job < JOBS; job++) {
        for (mcn = 0; mcn < MACHINES; mcn++)
            finishTimes[job][mcn] = SCHEDULE[mcn][order[job]];
    }
    // update finishing times
    // we use a simplification of Zhan's algorithm for a quicker computation of the makespan
    // See - Zhang, C, Sun, J, Zhu, X., & Yang, Q, (2008). 
    // An improved particle swarm optimization algorithm for flowshop scheduling problem. Information Processing Letters Vol 108, pp 204-209.

    for (job = 0; job < JOBS; job++) {
        for (mcn = 0; mcn < MACHINES; mcn++) {
            finishTimes[job][mcn] = (job == 0 && mcn == 0) ? finishTimes[0][0] :
                (job == 0 && mcn != 0) ? finishTimes[0][mcn - 1] + finishTimes[0][mcn] :
                (job != 0 && mcn == 0) ? finishTimes[job - 1][0] + finishTimes[job][0] :
                (finishTimes[job - 1][mcn] > finishTimes[job][mcn - 1]) ? finishTimes[job - 1][mcn] + finishTimes[job][mcn] :
                finishTimes[job][mcn - 1] + finishTimes[job][mcn];
        }
    }
    return finishTimes[JOBS - 1][MACHINES - 1];
};

/**
 * create a randomized order of jobs
 * 
 * @return {Array} array of jobs (0-JOBS) in a random order
 */
Flowshop.prototype.createRandomOrder = function(JOBS) {
    var order = [],
        jobs, rand = [];
    for (jobs = 0; jobs < JOBS; jobs++)
        order[jobs] = jobs;

    while (order.length > 0) {
        var idx = Math.floor(Math.random() * (JOBS - 1));
        if (idx >= order.length) idx = 0;
        rand.push(order.splice(idx, 1)[0]);
    }
    return rand;
};

module.exports = Flowshop;
