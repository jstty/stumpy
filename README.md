# Stumpy - The Kickass Logger!
[![Build Status](https://secure.travis-ci.org/jstty/stumpy.png)](http://travis-ci.org/jstty/stumpy) [![Dependency Status](https://david-dm.org/jstty/stumpy.png?theme=shields.io)](https://david-dm.org/jstty/stumpy) [![devDependency Status](https://david-dm.org/jstty/stumpy/dev-status.png?theme=shields.io)](https://david-dm.org/jstty/stumpy#info=devDependencies) [![NPM](https://nodei.co/npm/stumpy.png)](https://nodei.co/npm/stumpy/)

## Features
* Highly configurable
* Module based Log Names
    * Different module can be given a name to make it easier to find the culprit
* Buffered Output
    * Allows you to ship the logs off to the local sawmill or whittle a cat out of them
* Customizable Log Format
    * Standard output across all parts of your application
* Schemas Based on Environments
* NodeJs Only (sorry browser people)
  * Groups (pretty trees O^O)
  * Colors (double rainbows!)
  * Optional All Logs Synchronise
    * Warning: current version errors are sent to stdout NOT stderr
    * Future version will fix this
  * All Logs with Trace Information

## NPM
```sh
$ npm install stumpy
```

## Bower
```sh
$ bower install stumpy
```

## Usage

### Hello Charlie!
```js
var stumpy = Stumpy();

stumpy.log("test");
stumpy.info("test: %s", "string");
stumpy.warn("test: %d", 123);
stumpy.error("test error: %d", 123);
```

### Buffered Output
```js
var stumpy = Stumpy("basic", {
    showTrace: true,
    buffer: {
        size: 8,
        showTrace: true
    }
});

console.log("----------------------------------------------------------");
console.log("-- Stumpy - Buffered Output --");
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
```

### Custom Format
```js
var stumpy = Stumpy("basic", {
    display: true,
    formatFunc: function(options, log) {
        var out = [];
        var a = 0;

        // add time
        var td = moment().format('YYYY-MM-DD HH:mm:ssZ');

        // if first arg is string add time to it to support % replacement
        if(typeof log.args[0] === "string") {
            out.push( "["+td+"] "+options.name+" - " + log.args[0] );
            a++;
        } else {
            out.push("["+td+"] "+options.name+" - ");
        }

        // add args
        for(; a < log.args.length; a++) {
            // if show time, and first item
            out.push( log.args[a] );
        }

        return out;
    }
	,buffer: {
		size: 8,
        showTrace: true,
        formatFunc: function(options, log) {
            var out = [];
            var a = 0;

            // add time
            var td = moment(log.date).format('h:mm:ss a');

            // if first arg is string add time to it to support % replacement
            if(typeof log.args[0] === "string") {
                out.push( td + " - " + log.args[0] );
                a++;
            } else {
                out.push(td + " - ");
            }

            // add args
            for(; a < log.args.length; a++) {
                // if show time, and first item
                out.push( log.args[a] );
            }

            // show trace
            if(log.trace) {
                out.push("-> " + log.trace );
            }

            return out;
        }
	}
});

console.log("----------------------------------------------------------");
console.log("-- Stumpy - Custom Format --");
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
dump = dump.join("\n");
console.log(dump);

console.log("----------------------------------------------------------");
console.log("-- Pretty Printing Buffered Output --");
console.log("----------------------------------------------------------");
stumpy.printBuffer();

console.log("----------------------------------------------------------");
console.log("-- Dumping Raw Buffered Output --");
console.log("----------------------------------------------------------");
var rawdump = stumpy.getRawBuffer();
console.log(rawdump);
```

## Tests

### Mocha
```sh
$ npm test
```

### Karma
```sh
$ npm run-script test-browser
```
