'use strict';

function prettify (value, shouldPrettify) {
  if (!shouldPrettify) return value
  var rounded = +(Math.round(value + 'e+2')  + 'e-2')
  var parts = rounded.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

var modifiers = {
	mi: 0.000189394,
	ft: 1,
	in: 12
}

var types = {
  mi: 5280,
  ft: 1,
  in: 0.08333336
}

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
  return prettify((this.value * this.type) * modifiers.mi, this.prettify) + 'mi'
}

Pretty.prototype.ft = function () {
  return prettify((this.value * this.type) * modifiers.ft, this.prettify) + 'ft'
}

Pretty.prototype.in = function () {
  return prettify((this.value * this.type) * modifiers.in, this.prettify) + 'in'
}

Pretty.prototype.humanize = function () {
  var value = this.type * this.value
  this.prettify = true
  if (value >= 5280) return this.mi()
  if (value >= 1) return this.ft()
  return this.in()
}

module.exports = Pretty
