var Stumpy = require('../../lib/stumpy.js');
var stumpy = Stumpy("Hello Charlie!");

console.log("----------------------------------------------------------");
console.log("-- Stumpy - Hello Charlie! --");
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
