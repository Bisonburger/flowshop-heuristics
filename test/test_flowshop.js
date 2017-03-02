/**
 * Mocha based tests for the What's On service
 * 
 * @license ISC    
 * @copyright 2017, BISONWORKS, LLC
 */
var chai = require('chai'),
    expect = chai.expect,
    Flowshop = new (require('../flowshop.js'))(),
    JOBS;

beforeEach(
    function(){
        chai.config.includeStack = true;
    });

describe('flowshop', function() {
    
    describe( '#createRandomOrder', function(){
        context( 'for 2 jobs', function(){
            JOBS = 2;
            it( 'should return a randomize array of 0 and 1', function(){
                var order = Flowshop.createRandomOrder(JOBS);
                return expect( (order.length === JOBS) ).to.equal(true);
            });  
        });
        context( 'for 0 jobs', function(){
            JOBS = 0;
            it( 'create an empty array', function(){
                return expect(Flowshop.createRandomOrder(JOBS).length).to.equal(0);    
            });  
        });
    });
});
