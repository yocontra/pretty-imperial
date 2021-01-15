var test = require('ava');
var pretty = require('..');
test('default 1 foot to ft', function (t) {
  t.is(pretty().ft(), '1ft');
});

// inch conversions
test('inch to ft', function (t) {
  t.is(pretty(1).input('in').ft(), '0.08333336ft');
});
test('inch to mile', function (t) {
  t.is(pretty(1500).input('in').mi(), '0.02367425757576mi');
});

// square inch conversions
test('square inch to square ft', function (t) {
  t.is(pretty(1).input('in2').ft2(), '0.00694444ft2');
});
test('square inch to square mile', function (t) {
  t.is(pretty(100000).input('in2').mi2(), '0.00002490970628mi2');
});

// foot conversions
test('foot to ft', function (t) {
  t.is(pretty(12).ft(), '12ft');
});
test('feet to inch', function (t) {
  t.is(pretty(1).in(), '12in');
});
test('foot to mi', function (t) {
  t.is(pretty(7000).mi(), '1.325758mi');
});

// square foot conversions
test('square ft to square inch', function (t) {
  t.is(pretty(1).input('ft2').in2(), '144in2');
});
test('square ft to square miles', function (t) {
  t.is(pretty(10000).input('ft2').mi2(), '0.00035870000000000005mi2');
});

// mile conversions
test('miles to inches', function (t) {
  t.is(pretty(1).input('mi').in(), '63360in');
});
test('miles to feet', function (t) {
  t.is(pretty(1).input('mi').ft(), '5280ft');
});

// square mile conversions
test('square miles to square inches', function (t) {
  t.is(pretty(1).input('mi2').in2(), '4014720000in2');
});
test('square miles to square feet', function (t) {
  t.is(pretty(1).input('mi2').ft2(), '27880000ft2');
});

// invalid conversions
test('converting from length to area throws error', function (t) {
  const error = t.throws(() => pretty(1).input('ft').mi2());
  t.is(
    error.message,
    'Invalid conversion. You are trying to convert a length measurement to an area measurement.'
  );
});
test('converting from area to length throws error', function (t) {
  const error = t.throws(() => pretty(1).input('mi2').ft());
  t.is(
    error.message,
    'Invalid conversion. You are trying to convert an area measurement to a length measurement.'
  );
});
