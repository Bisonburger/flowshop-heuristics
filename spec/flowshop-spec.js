/**
 * Jasmine based tests for flowshop module
 * 
 * @license ISC    
 * @copyright 2017, BISONWORKS, LLC
 */
var Flowshop = new (require('../flowshop.js'))(),
    JOBS;
/* global expect */

describe('flowshop', function() {
    
    describe( '#createRandomOrder', function(){

        describe( 'for 2 jobs', function(){
            JOBS = 2;
            it( 'should create an array of length 2', function(){
                expect(Flowshop.createRandomOrder(JOBS).length).toEqual(JOBS);    
            });  
        });


        describe( 'for 0 jobs', function(){
            JOBS = 0;
            it( 'should create an empty array', function(){
                expect(Flowshop.createRandomOrder(JOBS).length).toEqual(0);    
            });  
        });
    });
});
