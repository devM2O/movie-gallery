const moment = require('moment');

// set up
// let start = 1600881161562; // some random moment in time (in ms)
// let end = Date.now(); // some random moment after start (in ms)

var start = moment(1600881161562);
  var end = moment(Date.now());
var duration = moment.duration(end.diff(start));

// execution
// let f = moment.utc(diff).format("HH:mm:ss.SSS");

var f = duration.asDays();

console.log(f);
