/**
 * Flowshop problem setup
 * 
 * @module Flowshop
 * @license ISC
 */
 
/**
 * constructor for the Flowshop setup.
 */
var Flowshop = function Flowshop() {
};

/**
 * compute the makespan for a given order of jobs and schedule
 * 
 * @param {Array} order - array of job orders; order[0] is the first job, order[1] the second, ...
 *  expectation is that jobs are listed only once for the ordered array (but there is no check)
 * @param {Array} schedule - array of run times for the jobs on the machines; array is [mcn][job] 
 *  (i.e. s[0][2] is the run time for the 3rd job on the first machine - arrays are 0 based)
 * @return {Number} makespan of the schedule given the order of jobs
 */
Flowshop.prototype.makespan = function(order,SCHEDULE) {
    var job, mcn, JOBS = order? order.length : 0, MACHINES = SCHEDULE === undefined? 0 : SCHEDULE.length;
    
    var finishTimes = [];
    for (job = 0; job < JOBS; job++) {
        finishTimes[job] = [];
    }

    // order the columns of the original processingTimes by the new processing order
    for (job = 0; job < JOBS; job++) {
        for (mcn = 0; mcn < MACHINES; mcn++){
            finishTimes[job][mcn] = SCHEDULE[mcn][(order[job])];
        }
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
    return JOBS>0 && MACHINES >0? finishTimes[JOBS - 1][MACHINES - 1] : 0;
};

/**
 * compute the finishing times for a given a order of jobs and schedule
 * 
 * @param {Array} order - array of job orders; order[0] is the first job, order[1] the second, ...
 *  expectation is that jobs are listed only once for the ordered array (but there is no check)
 * @param {Array} schedule - array of run times for the jobs on the machines; array is [mcn][job] 
 *  (i.e. s[0][2] is the run time for the 3rd job on the first machine )
 * @return {Array} ending times of the schedule given the order of jobs; array of [job][mcn]
 *  (i.e f[0][2] is the finish time for the first job run on the 3rd machine - arrays are 0 based)
 */
Flowshop.prototype.finishTimes = function(order,SCHEDULE){
    var job, mcn, JOBS = order.length, MACHINES = SCHEDULE.length;
    
    var finishTimes = [];
    for (job = 0; job < JOBS; job++) {
        finishTimes[job] = [];
    }

    // order the columns of the original processingTimes by the new processing order
    for (job = 0; job < JOBS; job++) {
        for (mcn = 0; mcn < MACHINES; mcn++){
            finishTimes[job][mcn] = SCHEDULE[mcn][(order[job])];
        }
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
    return finishTimes;    
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

/**
 * Given a specific subset of jobs as an order, returns the subset of jobs
 * that are not part of the order.  Note that order.length + return.length will
 * equal JOBS (assuming that order does not contain values >= JOBS )
 * 
 * @param {Array} order subset of jobs so far (may be empty or undefined)
 * @param {Number} JOBS maximum number of jobs
 * @return {Array} array of jobs not in the order
 */
Flowshop.prototype.unusedJobs = function( order, JOBS ){
    var unused = [], i;
    for( i=0;i<JOBS; i++) 
        if( !order || order.indexOf(i) === -1) unused.push(i);
    return unused;
};

module.exports = Flowshop;
