var assert = require('assert');
var jsdom = require('jsdom');
var contents = '<!DOCTYPE html><div id="mainContent">Demo HTML</p>';
const { JSDOM } = jsdom;
const { window } = new JSDOM(contents,{}).window;
var localWindow=window;
var $ = jQuery = require('../scripts/jquery.js')(localWindow);
var ffRatingObj = require('../scripts/ffrating.js')(jQuery,localWindow);


describe('FFRating Library functions tests', function(){
    beforeEach(function () {
        // adding a textbox type element before each function in this test suite
        var inputTypeTextElem = localWindow.document.createElement("input");   // Create a <button> element
        inputTypeTextElem.type = "text";
        inputTypeTextElem.id = 'txtboxRating';
        localWindow.document.getElementById('mainContent').appendChild(inputTypeTextElem);
    });
    afterEach(function () {
        // restoring the html back to original content by removing the elements added in before each function
        $('#txtboxRating').remove();
    });
    describe('FFRating initialization and destory methods of NPS type rating', function(){
        it('Initializing NPS type rating element and then destory it', function(){
            var result= $('#txtboxRating').length;
            assert.equal(result, 1, 'should have textbox we added in beforeEach function');
            $('#txtboxRating').ffrating( {isStar:false});
            assert.equal($('.nps-rating-control').length, 1, 'should have 1 NPS control as we initialized a new one');
            $('#txtboxRating').ffrating('destroy');
            assert.equal($('.nps-rating-control').length, 0, 'should have 0 NPS control since we destroyed the one we initialized');
        });
    });
    describe('FFRating initialization and destory methods of Star type rating', function(){
        it('Initializing Star type rating element and then destory it', function(){
            var result= $('#txtboxRating').length;
            assert.equal(result, 1, 'should have textbox we added in beforeEach function');
            $('#txtboxRating').ffrating( {isStar:true});
            assert.equal($('.star-rating-control').length, 1, 'should have 1 NPS control as we initialized a new one');
            $('#txtboxRating').ffrating('destroy');
            assert.equal($('.star-rating-control').length, 0, 'should have 0 NPS control since we destroyed the one we initialized');
        });
    });
});
