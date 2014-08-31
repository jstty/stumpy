var Stumpy   = require('../../lib/stumpy.js');

var stumpy = Stumpy("basic", {
    showTrace: true,
    showLogId: true,
    showLogType: true,
    syncLogs: true, // warning: this will not write logs to stderr
    buffer: {
        size: 8,
        showTrace: true
    }
});

console.log("----------------------------------------------------------");
console.log("-- Stumpy - Basic --");
console.log("----------------------------------------------------------");
stumpy.log("test");
stumpy.info("test: %s", "string");
stumpy.warn("test: %d", 123);
stumpy.error("test error: %d", 123);
stumpy.trace("test trace: %s", "string");

stumpy.log("before group");

stumpy.group();
    stumpy.log("test group log", "Group", 1);
    stumpy.warn("test group warn", { obj: "Group1" } );
    stumpy.error("test group error: %d", 123);

    stumpy.group("test group 2");
        stumpy.log("test", "Group", 2);
        stumpy.warn("test", { obj: "Group2" } );
    stumpy.groupEnd();

stumpy.groupEnd();

stumpy.log( { after: "group", a: [1,2,3,4,5,6,7,8,9,0] } );

console.log("----------------------------------------------------------");
console.log("-- Dumping Buffered Output --");
console.log("----------------------------------------------------------");
var dump = stumpy.getBuffer();
console.log( dump.join("\n") );

console.log("----------------------------------------------------------");
console.log("-- Pretty Printing Buffered Output --");
console.log("----------------------------------------------------------");
stumpy.printBuffer();

console.log("----------------------------------------------------------");
console.log("-- Dumping Raw Buffered Output --");
console.log("----------------------------------------------------------");
var rawdump = stumpy.getRawBuffer();
console.log( rawdump );