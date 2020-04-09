var test = require('ava')
var pretty = require('..')
test('default 1 foot to ft', function (t) {
  t.is(pretty().ft(), '1ft')
})

test('inch to ft', function (t) {
  t.is(pretty(1).input('in').ft(), '0.08333336ft')
})
test('foot to mi', function (t) {
  t.is(pretty(7000).mi(), '1.325758mi')
})

test('foot to ft', function (t) {
  t.is(pretty(12).ft(), '12ft')
})

test('feet to inch', function (t) {
  t.is(pretty(150).in(), '1800in')
})

test('input: in to mi', function (t) {
  t.is(pretty(1500).input('in').mi(), '0.02367425757576mi')
})
