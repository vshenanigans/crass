var grammar = require('./grammar');
var objects = require('./objects');

exports.parse = function parse(data) {
    var parser = new grammar.Parser();
    parser.lexer.options.ranges = true;
    parser.yy = objects;

    return parser.parse(data + '');
};

exports.objects = objects;
