var Stumpy = require('../../lib/stumpy.js');
var stumpy = Stumpy("Mr Stumpy  ");
var shadow1 = stumpy.shadow({"name": "My Shadow 1", "env": "dev"});
var shadow2 = stumpy.shadow({"name": "My Shadow 2"});

stumpy.log("----------------------------------------------------------");
stumpy.log("-- Stumpy - Shadow --");
stumpy.log("----------------------------------------------------------");

stumpy.log("Before Stumpy Group");
stumpy.group();
    stumpy.log("My Group 1");

    stumpy.log("My Test", "in My Group", 1);

    shadow1.group("My Shadow 1 Group");
        shadow1.log("My Shadow 1 Test", "in Shadow 1 Group", 1);
        stumpy.log("My Test", "in Shadow 1 Group", 1);

    shadow2.group("My Shadow 2 Group");
        shadow2.log("My Shadow 2 Test 1", "in Shadow 2 Group", 1);
        stumpy.log("My Test", "in Shadow 2 Group", 1);
        
    shadow1.groupEnd("My Shadow 1 Group");

    shadow2.log("My Shadow 2 Test 2", "in Shadow 2 Group", 1);
    shadow2.groupEnd("My Shadow 2 Group");

    shadow1.log("My Shadow 1 Test", "in My Group", 1);
    shadow2.log("My Shadow 2 Test", "in My Group", 1);

stumpy.groupEnd();

stumpy.log( "My Test", { after: "group", a: [1,2,3,4,5,6,7,8,9,0] } );
