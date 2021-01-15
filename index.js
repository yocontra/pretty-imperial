'use strict';

function prettify (value, shouldPrettify) {
  if (!shouldPrettify) return value
  var rounded = +(Math.round(value + 'e+2')  + 'e-2')
  var parts = rounded.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * Utility for checking conversion validity
 * Errors if a length measurement is trying to convert to an area measurement
 * and vice versa
 * @param {string} fromCategoryType the incoming category type i.e. length or area
 * @param {string} toCategoryType the outbound category type i.e. length or area
 */
function isValidConversion (fromCategoryType, toCategoryType) {
  if (fromCategoryType !== toCategoryType) {
    var errorSnippet =
      fromCategoryType === 'area'
        ? 'an area measurement to a length measurement'
        : 'a length measurement to an area measurement';
    throw new Error(
      `Invalid conversion. You are trying to convert ${errorSnippet}.`
    );
  }
}

var modifiers = {
  mi: 0.000189394,
  mi2: 0.00000003587,
  ft: 1,
  ft2: 1,
  in: 12,
  in2: 144,
};

var types = {
  mi: {
    name: 'mi',
    value: 5280,
    category: 'length',
  },
  mi2: {
    name: 'mi2',
    value: 27880000,
    category: 'area',
  },
  ft: {
    name: 'ft',
    value: 1,
    category: 'length',
  },
  ft2: {
    name: 'ft2',
    value: 1,
    category: 'area',
  },
  in: {
    name: 'in',
    value: 0.08333336,
    category: 'length',
  },
  in2: {
    name: 'in2',
    value: 0.00694444,
    category: 'area',
  },
};

function Pretty (value) {
  if (!(this instanceof Pretty)) {
    return new Pretty(value)
  }
  this.value = value === 0 ? 0 : value || 1
  this.type = types.ft
}

Pretty.prototype.input = function (type) {
  if (!type in types) {
    throw new Error('type ' + type + ' is not valid')
  }
  this.type = types[type]
  return this
}

Pretty.prototype.mi = function () {
  isValidConversion(this.type.category, 'length');
  return prettify(this.value * this.type.value * modifiers.mi, this.prettify) + 'mi';
};

Pretty.prototype.mi2 = function () {
  isValidConversion(this.type.category, 'area');
  return prettify(this.value * this.type.value * modifiers.mi2, this.prettify) + 'mi2';
};

Pretty.prototype.ft = function () {
  isValidConversion(this.type.category, 'length');
  return prettify(this.value * this.type.value * modifiers.ft, this.prettify) + 'ft';
};

Pretty.prototype.ft2 = function () {
  isValidConversion(this.type.category, 'area');
  return prettify(this.value * this.type.value * modifiers.ft2, this.prettify) + 'ft2';
};

Pretty.prototype.in = function () {
  isValidConversion(this.type.category, 'length');
  return prettify(this.value * this.type.value * modifiers.in, this.prettify) + 'in';
};

Pretty.prototype.in2 = function () {
  isValidConversion(this.type.category, 'area');
  return prettify(this.value * this.type.value * modifiers.in2, this.prettify) + 'in2';
};

Pretty.prototype.humanize = function () {
  var value = this.type.value * this.value;
  var category = this.type.category;
  this.prettify = true;

  if (category === 'area') {
    if (value >= 27880000) return this.mi2();
    // necessary hack because of in2 to 1 ft2 conversion coming in just under 1
    if (value >= 0.999) return this.ft2();
    return this.in2();
  }
  if (value >= 5280) return this.mi();
  if (value >= 1) return this.ft();
  return this.in();
};

module.exports = Pretty
