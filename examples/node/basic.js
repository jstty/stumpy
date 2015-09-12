var Stumpy = require('../../lib/stumpy.js');
var stumpy = Stumpy({
    replaceConsole: false
});

console.log("This is from the console");
//$ This is from the console
stumpy.log("This is from stumpy console");
//$ [2015-09-12 00:39:21.387Z] This is from stumpy console
