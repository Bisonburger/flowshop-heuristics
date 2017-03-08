/**
 * develop a flowshop probem solution using Eigen Ant heuristic
 * 
 * @license ISC
 */
var FlowShop = new (require("./flowshop.js"))(),
    Taillard = require("./taillard.js"),
    
    N = 50,
    alpha = 0.5,
    beta = 1,
    SCHEDULE = Taillard.t02,
    JOBS = 20,
    d = [],
    pheromoneConcentration = [],
    pdf = [];

    // create N empty paths
    var path = [];
    for(var i=0;i<N;i++){
        path[i] = [];
        d[i] = 1 / FlowShop.makespan( [], SCHEDULE );
        pheromoneConcentration[i] = 1 / N;
        pdf[i] = 1 / N;
    }
    
    var sumConcentration = function(){
        return pheromoneConcentration.reduce( (a, v) => a + v, 0);
    };
    
    
    // while we dont have any paths of the proper length
    var pathIdx;
    var countAtLength = 0;

    while( countAtLength < 1 ){
        
        // PICK a random path based on CDF
        var cdf = pdf.map( (path, i) => pdf.slice(0, i + 1).reduce( (a, v) => a + v, 0) );
        var r = Math.random();
        //console.log( `pdf = ${pdf}; cdf = ${cdf}; r = ${r}`);
        var selected = cdf.findIndex((prob) => r <= prob );

        //console.log( `selected path ${selected} with order = ${order} and a makespan of ${FlowShop.makespan(order,SCHEDULE)}`);
        
        

        //  add a new node to the path
        if( path[selected].length < JOBS ){
            var unused = FlowShop.unusedJobs(path[selected],JOBS);
            var ru = ~~(Math.random()*unused.length);
            path[selected].push( unused[ru] );
        }
        
        for(var idx = 0; idx<N; idx++ ){
            d[idx] = FlowShop.makespan( path[idx], SCHEDULE );
        }

        var sum = d.reduce( (a,v) => a + v, 0);        
        for(idx = 0; idx<N; idx++ ){
            d[idx] = 1 / (d[idx] / sum);
        }

        
        
        //  update the path's pheromone concentration
        pheromoneConcentration[selected] = (1-alpha) * pheromoneConcentration[selected] + (beta * d[selected] * pdf[selected]);
        

        // update the path selection pdf 
        
        
        //console.log( `pheromoneConcentration = ${pheromoneConcentration}`);
        for (var i = 0; i < N; i++) 
            pdf[i] = pheromoneConcentration[i] / sumConcentration();
            
        pathIdx = path.find( (p) => p.length === JOBS );
        countAtLength = path.reduce( (a,v) => a + (v.length===JOBS)?1:0, 0);
        
        //console.log( `path 0 length = ${path[0].length} path 1 length = ${path[1].length}; cal = ${countAtLength}`);
    }
    
console.log( `path = ${pathIdx}; mksp = ${FlowShop.makespan(pathIdx,SCHEDULE)}` );   

//for( var pIdx = 0; pIdx < N; pIdx++ )
//    console.log( `path ${pIdx} length = ${path[pIdx].length}`);
    


