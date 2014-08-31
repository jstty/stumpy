var Stumpy = require('../../lib/stumpy.js');
Stumpy("World Domination", {
    replaceConsole: true,
    syncLogs: true
});

console.log("----------------------------------------------------------");
console.log("-- Stumpy - Hello Charlie! --");
console.log("----------------------------------------------------------");
console.log("test");
console.info("test: %s", "string");
console.warn("test: %d", 123);
console.error("test error: %d", 123);
console.trace("test trace: %s", "string");

console.log("before group");

console.group();
    console.log("test group log", "Group", 1);
    console.warn("test group warn", { obj: "Group1" } );
    console.error("test group error: %d", 123);

    console.group("test group 2");
        console.log("test", "Group", 2);
    console.warn("test", { obj: "Group2" } );
console.groupEnd();

console.groupEnd();

console.log( { after: "group", a: [1,2,3,4,5,6,7,8,9,0] } );

