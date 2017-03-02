/**
 * Jasmine based tests for eigen-ant heurisitic
 * 
 * @license ISC    
 * @copyright 2017, BISONWORKS, LLC
 */
var EigenAnt = require('../eigen-ant.js'), eac;
/* global expect */

describe('eigen-ant', function() {

    describe('#intialize', function() {

        describe('with alpha/beta', function() {
            it('should initialize', function() {
                eac = new EigenAnt([1, 1], 0.5, 1);
                expect(eac.alpha).toEqual(0.5);
                expect(eac.beta).toEqual(1);
                expect(eac.paths).toEqual(2);
                expect(eac.pathProb).toEqual([0.5, 0.5]);
            });
        });

        describe('without alpha/beta', function() {
            it('should initialize', function() {
                eac = new EigenAnt([1, 1, 1, 1]);
                expect(eac.alpha).toEqual(0.5);
                expect(eac.beta).toEqual(1);
                expect(eac.paths).toEqual(4);
                expect(eac.pathProb).toEqual([0.25, 0.25, 0.25, 0.25]);
            });
        });
    });

    describe('#run', function() {

        describe('for large differences in path length', function() {
            it('should find the shortest path', function() {
                eac = new EigenAnt([1, 100, 50]);
                expect(eac.run(10)).toEqual(0);
            });
        });

        describe('for small differences in path length', function() {
            it('should find the shortest path', function() {
                eac = new EigenAnt([3, 2, 1]);
                expect(eac.run(10)).toEqual(2);
            });
        });
    });
});
