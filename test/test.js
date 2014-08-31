if (typeof window === 'undefined') {
    var Stumpy   = require('../index.js');
    var chai   = require('chai');
}

var expect = chai.expect;

var stumpy = Stumpy("basic", {
    display: false,
    buffer:  { size: 2 }
});

// ----------------------
describe("Buffer", function() {

    describe("Basic", function() {
        it( "Log", function() {
            stumpy.log("test1");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("test1");
            stumpy.clearBuffer();
        });

        it( "Info", function() {
            stumpy.info("test2");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("test2");
            stumpy.clearBuffer();
        });

        it( "Warn", function() {
            stumpy.warn("test3");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("test3");
            stumpy.clearBuffer();
        });

        it( "Error", function() {
            stumpy.error("test4");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("test4");
            stumpy.clearBuffer();
        });
    });

    // -------------------------------------
    describe("Print", function() {
        it( "Log - Int", function() {
            stumpy.log("Log - Int %d", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Log - Int 123");
            stumpy.clearBuffer();
        });
        it( "Log - Float", function() {
            stumpy.log("Log - Float %f", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Log - Float 1.23");
            stumpy.clearBuffer();
        });
        it( "Log - String", function() {
            stumpy.log("Log - String %s", "test");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Log - String test");
            stumpy.clearBuffer();
        });
        it( "Log - Object", function() {
            stumpy.log("Log - Object %s", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Log - Object {"test":123}');
            stumpy.clearBuffer();
        });
        // -------------------------------------
        it( "Info - Int", function() {
            stumpy.info("Info - Int %d", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Info - Int 123");
            stumpy.clearBuffer();
        });
        it( "Info - Float", function() {
            stumpy.info("Info - Float %f", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Info - Float 1.23");
            stumpy.clearBuffer();
        });
        it( "Info - String", function() {
            stumpy.info("Info - String %s", "test");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Info - String test");
            stumpy.clearBuffer();
        });
        it( "Info - Object", function() {
            stumpy.info("Info - Object %s", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Info - Object {"test":123}');
            stumpy.clearBuffer();
        });
        // -------------------------------------
        it( "Warn - Int", function() {
            stumpy.warn("Warn - Int %d", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Warn - Int 123");
            stumpy.clearBuffer();
        });
        it( "Warn - Float", function() {
            stumpy.warn("Warn - Float %f", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Warn - Float 1.23");
            stumpy.clearBuffer();
        });
        it( "Warn - String", function() {
            stumpy.warn("Warn - String %s", "test");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Warn - String test");
            stumpy.clearBuffer();
        });
        it( "Warn - Object", function() {
            stumpy.warn("Warn - Object %s", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Warn - Object {"test":123}');
            stumpy.clearBuffer();
        });
        // -------------------------------------
        it( "Error - Int", function() {
            stumpy.error("Error - Int %d", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Error - Int 123");
            stumpy.clearBuffer();
        });
        it( "Error - Float", function() {
            stumpy.error("Error - Float %f", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Error - Float 1.23");
            stumpy.clearBuffer();
        });
        it( "Error - String", function() {
            stumpy.error("Error - String %s", "test");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Error - String test");
            stumpy.clearBuffer();
        });
        it( "Error - Object", function() {
            stumpy.error("Error - Object %s", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Error - Object {"test":123}');
            stumpy.clearBuffer();
        });
    });

    // -------------------------------------
    describe("Multi Arguments", function() {
        it( "Log - String,Int", function() {
            stumpy.log("Log", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Log 123");
            stumpy.clearBuffer();
        });
        it( "Log - String,Float", function() {
            stumpy.log("Log", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Log 1.23");
            stumpy.clearBuffer();
        });
        it( "Log - String,Object", function() {
            stumpy.log("Log", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Log {"test":123}');
            stumpy.clearBuffer();
        });
        it( "Log - String,String,Int", function() {
            stumpy.log("Log", "String", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Log String 123");
            stumpy.clearBuffer();
        });
        it( "Log - String,Float,String", function() {
            stumpy.log("Log", 1.23, "String");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Log 1.23 String");
            stumpy.clearBuffer();
        });
        it( "Log - String,Int,Object", function() {
            stumpy.log("Log", 123, {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Log 123 {"test":123}');
            stumpy.clearBuffer();
        });
        // -------------------------------------
        it( "Info - String,Int", function() {
            stumpy.info("Info", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Info 123");
            stumpy.clearBuffer();
        });
        it( "Info - String,Float", function() {
            stumpy.info("Info", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Info 1.23");
            stumpy.clearBuffer();
        });
        it( "Info - String,Object", function() {
            stumpy.info("Info", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Info {"test":123}');
            stumpy.clearBuffer();
        });
        it( "Info - String,String,Int", function() {
            stumpy.info("Info", "String", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Info String 123");
            stumpy.clearBuffer();
        });
        it( "Info - String,Float,String", function() {
            stumpy.info("Info", 1.23, "String");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Info 1.23 String");
            stumpy.clearBuffer();
        });
        it( "Info - String,Int,Object", function() {
            stumpy.info("Info", 123, {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Info 123 {"test":123}');
            stumpy.clearBuffer();
        });
        // -------------------------------------
        it( "Warn - String,Int", function() {
            stumpy.warn("Warn", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Warn 123");
            stumpy.clearBuffer();
        });
        it( "Warn - String,Float", function() {
            stumpy.warn("Warn", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Warn 1.23");
            stumpy.clearBuffer();
        });
        it( "Warn - String,Object", function() {
            stumpy.warn("Warn", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Warn {"test":123}');
            stumpy.clearBuffer();
        });
        it( "Warn - String,String,Int", function() {
            stumpy.warn("Warn", "String", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Warn String 123");
            stumpy.clearBuffer();
        });
        it( "Warn - String,Float,String", function() {
            stumpy.warn("Warn", 1.23, "String");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Warn 1.23 String");
            stumpy.clearBuffer();
        });
        it( "Warn - String,Int,Object", function() {
            stumpy.warn("Warn", 123, {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Warn 123 {"test":123}');
            stumpy.clearBuffer();
        });
        // -------------------------------------
        it( "Error - String,Int", function() {
            stumpy.error("Error", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Error 123");
            stumpy.clearBuffer();
        });
        it( "Error - String,Float", function() {
            stumpy.error("Error", 1.23);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Error 1.23");
            stumpy.clearBuffer();
        });
        it( "Error - String,Object", function() {
            stumpy.error("Error", {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Error {"test":123}');
            stumpy.clearBuffer();
        });
        it( "Error - String,String,Int", function() {
            stumpy.error("Error", "String", 123);
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Error String 123");
            stumpy.clearBuffer();
        });
        it( "Error - String,Float,String", function() {
            stumpy.error("Error", 1.23, "String");
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal("Error 1.23 String");
            stumpy.clearBuffer();
        });
        it( "Error - String,Int,Object", function() {
            stumpy.error("Error", 123, {test:123});
            var dump = stumpy.getBuffer();
            expect( dump[0] ).is.equal('Error 123 {"test":123}');
            stumpy.clearBuffer();
        });
    });
});
