var assert = require("assert");

var crass = require('../crass');

var filler = 'x:y';
var parseString = function(data) {
    return crass.parse(data).toString();
};
var parseCompare = function(data, expected) {
	data = data.replace(/\$\$/g, filler);
	expected = expected.replace(/\$\$/g, filler);
    return parseString(data) === expected;
};
var parity = function(data) {
	data = data.replace(/\$\$/g, filler);
	assert.equal(parseString(data), data);
}


describe('Lowercase', function() {
    it('descriptors', function() {
        parseCompare('b{FOO:bar}', 'b{foo:bar}');
    });
    it('element names', function() {
        parseCompare('B{foo:bar}', 'b{foo:bar}');
    });
    it('hex values', function() {
        parseCompare('b{foo:#ABCDEF}', 'b{foo:#abcdef}');
    });
    it('short hex values', function() {
        parseCompare('b{foo:#ABC}', 'b{foo:#abc}');
    });
    it('pseudo classes', function() {
        parseCompare('b:FOO{x:y}', 'b:foo{x:y}');
    });
    it('pseudo elements', function() {
        parseCompare('b::FOO{x:y}', 'b::foo{x:y}');
    });
    it('pseudo functions', function() {
        parseCompare('b:FOO(bar){x:y}', 'b:foo(bar){x:y}');
    });
    it('attributes', function() {
        parseCompare('b[FOO]{x:y}', 'b[foo]{x:y}');
        parseCompare('b[FOO=bar]{x:y}', 'b[foo=bar]{x:y}');
    });
    it('dimensions', function() {
        parseCompare('b{x:4EM}', 'b{x:4em}');
    });
    it('functions', function() {
        parseCompare('b{x:FOO(bar)}', 'b{x:foo(bar)}');
    });
});

describe('Sort', function() {
    it('selector lists', function() {
        parseCompare('b,a,d,c{$$}', 'a,b,c,d{$$}');
    });
});