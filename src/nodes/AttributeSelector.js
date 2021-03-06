var optimization = require('../optimization');


/**
 * @constructor
 * @param {string} ident
 * @param {string} comparison
 * @param {string} value
 */
function AttributeSelector(ident, comparison, value) {
    this.ident = ident;
    this.comparison = comparison;
    this.value = value;
}

/**
 * @return {string}
 */
AttributeSelector.prototype.toString = function toString() {
    // TODO: Handle quoting/unquoting
    if (this.value) {
        var value = this.value;
        if (value.asString) {
            value = value.asString(true);
        }
        return '[' + this.ident + this.comparison + value + ']';
    } else {
        return '[' + this.ident + ']';
    }
};

/**
 * @return {string}
 */
AttributeSelector.prototype.pretty = function pretty() {
    return this.toString();
};

/**
 * @param {object} kw
 * @return {AttributeSelector}
 */
AttributeSelector.prototype.optimize = function optimize(kw) {
    // OPT: Lowercase attribute names.
    this.ident = optimization.try_(this.ident, kw);
    this.value = optimization.try_(this.value, kw);

    if (!this.ident) {
        return null;
    }

    return this;
};

module.exports = AttributeSelector;
