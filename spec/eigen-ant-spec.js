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
                var options = {
                    pathLengths: [1,1],
                    alpha: 0.5,
                    beta: 1
                };
                eac = new EigenAnt( options );
                expect(eac.alpha).toEqual(0.5);
                expect(eac.beta).toEqual(1);
                expect(eac.pathProb).toEqual([0.5, 0.5]);
            });
        });

        describe('without alpha/beta', function() {
            it('should initialize', function() {
                var options = {
                    pathLengths: [1,1,1,1]
                };
                eac = new EigenAnt(options);
                expect(eac.alpha).toEqual(0.5);
                expect(eac.beta).toEqual(1);
                expect(eac.pathProb).toEqual([0.25, 0.25, 0.25, 0.25]);
            });
        });
    });

    describe('#run', function() {

        describe('for large differences in path length', function() {
            it('should find the shortest path', function() {
                var options = {
                    pathLengths: [1, 100, 50]
                };
                eac = new EigenAnt(options);
                expect(eac.run(10)).toEqual(0);
            });
        });

        describe('for small differences in path length', function() {
            it('should find the shortest path', function() {
                var options = {
                    pathLengths: [3, 2, 1]
                };
                eac = new EigenAnt(options);
                expect(eac.run(10)).toEqual(2);
            });
        });
    });
});
