var test = require('ava')
var pretty = require('..')

test('humanize feet to yards', function (t) {
  t.is(pretty(1500).humanize(), '500yd')
})

test('humanize feet to mile', function (t) {
  t.is(pretty(15000).humanize(), '2.84mi')
})

test('humanize yards to yd', function (t) {
  t.is(pretty(15).humanize(), '5yd')
})

test('humanize feet to ft', function (t) {
  t.is(pretty(1.5).humanize(), '1.5ft')
})

test('humanize ft to inch', function (t) {
  t.is(pretty(.5).humanize(), '6in')
})

test('input: humanize in', function (t) {
  t.is(pretty(120).input('in').humanize(), '10ft')
})

test('input: humanize in', function (t) {
  t.is(pretty(6).input('in').humanize(), '6in')
})

console.log(pretty(1500).input('in').yd())
