var test = require('ava')
var pretty = require('..')

test('humanize feet to mile', function (t) {
  t.is(pretty(15000).humanize(), '2.84mi')
})

test('humanize square feet to mile', function (t) {
  t.is(pretty(27880000).input('ft2').humanize(), '1mi2')
})

test('humanize feet to ft', function (t) {
  t.is(pretty(1.5).humanize(), '1.5ft')
})

test('humanize ft to inch', function (t) {
  t.is(pretty(0.5).humanize(), '6in')
})

test('input: humanize in', function (t) {
  t.is(pretty(120).input('in').humanize(), '10ft')
})

test('input: humanize in', function (t) {
  t.is(pretty(6).input('in').humanize(), '6in')
})

test('input: humanize square in', function (t) {
  t.is(pretty(144).input('in2').humanize(), '1ft2')
})

test('input: humanize square in', function (t) {
  t.is(pretty(100).input('in2').humanize(), '100in2')
})

test('input: humanize decimal in', function (t) {
  t.is(pretty(0.4).input('in').humanize(), '0.4in')
})

test('input: humanize zero', function (t) {
  t.is(pretty(0).input('in').humanize(), '0in')
})
