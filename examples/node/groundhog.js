var Stumpy = require('../../lib/stumpy.js');
var stumpy = Stumpy("Mr Stumpy");
var shadow = stumpy.shadow("My Shadow");

stumpy.log("----------------------------------------------------------");
stumpy.log("-- Stumpy - Shadow --");
stumpy.log("----------------------------------------------------------");

stumpy.log("Before Stumpy Group");
stumpy.group();
    stumpy.log("My Group 1");

    stumpy.log("My Test", "in My Group", 1);

    shadow.group("My Shadow Group 1");
        shadow.log("My Shadow Test", "in Shadow Group", 1);
        stumpy.log("My Test", "in Shadow Group", 1);
    shadow.groupEnd("end test group 2");

    shadow.log("My Shadow Test", "in My Group", 1);

stumpy.groupEnd();

stumpy.log( "My Test", { after: "group", a: [1,2,3,4,5,6,7,8,9,0] } );
