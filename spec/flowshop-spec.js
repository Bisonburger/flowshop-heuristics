/**
 * Jasmine based tests for flowshop module
 * 
 * @license ISC    
 * @copyright 2017, BISONWORKS, LLC
 */
var Flowshop = new (require('../flowshop.js'))(),
    JOBS;
/* global expect */

describe('flowshop', () => {
    
    describe( '#createRandomOrder', () => {

        describe( 'for 2 jobs', () => {
            JOBS = 2;
            it( 'should create an array of length 2', () => expect(Flowshop.createRandomOrder(JOBS).length).toEqual(JOBS) );  
        });

        describe( 'for 0 jobs', () => {
            JOBS = 0;
            it( 'should create an empty array', () => expect(Flowshop.createRandomOrder(JOBS).length).toEqual(0) );  
        });
    });
    
    describe( '#makespan', () => { 
        
        describe('for empty ordering', () => {
            it( 'should return 0', () => {
                var mksp = Flowshop.makespan([], [ [1, 1], [2,2] ]);
                expect( mksp ).toEqual(0);
            });                
        });

        describe('for undefined ordering', () => {
            it( 'should return 0', () => {
                var mksp = Flowshop.makespan(undefined, [ [1, 1], [2,2] ]);
                expect( mksp ).toEqual(0);
            });                
        });

        describe('for empty schedule', () => {
            it( 'should return 0', () => {
                var mksp = Flowshop.makespan([0,1], [] );
                expect( mksp ).toEqual(0);
            });                
        });

        describe('for undefined schedule', () => {
            it( 'should return 0', () => {
                var mksp = Flowshop.makespan([0,1], undefined );
                expect( mksp ).toEqual(0);
            });                
        });

        
        describe('for simple schedule', () => {
            it( 'should calculate a makespan', () => {
                var mksp = Flowshop.makespan( [0,1], [ [1, 1], [2, 2]] );    
                expect( mksp ).toEqual(5);
            });
        } );

        describe('for partial order', () => {
            it( 'should calculate a makespan', () => {
                var mksp = Flowshop.makespan( [2,0], [ [1, 1, 2], [1, 2, 3]] );    
                expect( mksp ).toEqual(6);
            });
        } );

    });
    
    
    describe( '#unusedJobs', function(){
        describe( 'for empty joblist', function(){
            it( 'should return the full list of jobs', function(){
                var list = Flowshop.unusedJobs( [], 10 );   
                expect( list ).toEqual([0,1,2,3,4,5,6,7,8,9]);
            });  
        });            
        describe( 'for undefined joblist', function(){
            it( 'should return the full list of jobs', function(){
                var list = Flowshop.unusedJobs( undefined, 10 );   
                expect( list ).toEqual([0,1,2,3,4,5,6,7,8,9]);
            });  
        });            
        describe( 'for full joblist', function(){
            it( 'should return an empty list', function(){
                var list = Flowshop.unusedJobs( [0,1,2,3], 4 );   
                expect( list ).toEqual([]);
            });  
        });            
        describe( 'for partial joblist', function(){
            it( 'should return missing jobs', function(){
                var list = Flowshop.unusedJobs( [0,2,4], 5 );   
                expect( list ).toEqual([1,3]);
            });  
        });            


    });

    
});
