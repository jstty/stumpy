// test sprintf, if not exist then set a default
if(typeof sprintf === 'undefined') {
    var sprintf = null;
}

(function(sprintf){
'use strict';

var Console = null;
var defaultFormatFunc = null;
var defaultFormat = null;
var clc = null;
var util = null;
var stackTrace = null;
var isBrowser  = true;

/*
 * Unify browser and nodejs
 */
if(typeof(window) === 'undefined') {
    util       = require('util');
    stackTrace = require('stack-trace');
    clc        = require('cli-color');
    // not browser
    isBrowser = false;
    Console = console;

    try {
        sprintf = require('sprintf-js').sprintf;
    } catch(err) {
        // this is ok, do nothing
    }

    // TODO: add format string
    defaultFormat          = "[:date]{name} :name - {/name}{group}:group{/group}:args{trace} (:trace){/trace}";
    defaultFormatFunc      = serverFormatFunc;
    module.exports         = Stumpy;
} else {
    if(hasConsole()) {
        Console = console;
    } else {
        // console does not exist so fill in stubs
        // console stubs
        Console = {};
        Console['log']      = function(){};
        Console['warn']     = function(){};
        Console['error']    = function(){};
        Console['info']     = function(){};
        Console['trace']    = function(){};
        Console['group']    = function(){};
        Console['groupEnd'] = function(){};
    }

    defaultFormat          = "{name} :name - {/name}:args{trace} (:trace){/trace}";
    defaultFormatFunc      = browserFormatFunc;
    window.Stumpy            = Stumpy;
}
/* -------------------------- */

/*
 * Stumpy class
 */
function Stumpy(opts, opts2) {
    if(!(this instanceof Stumpy)) {
        return new Stumpy(opts, opts2);
    }

    // --------------------------------
    this._options = {
        name:           "",
        env:            "dev",
        replaceConsole: false,
        getTrace:       false,
        showTrace:      false,
        showDateTime:   (isBrowser) ? false : true, // if browser then don't show date time
        showLogId:      false,
        showLogType:    false,
        syncLogs:       false, // warning: this will not write logs to stderr
        display:        {},
        format:         defaultFormat, // TODO
        formatFunc:     defaultFormatFunc,
        colors: {
            log:      "whiteBright",
            info:     "blue",
            warn:     "yellow",
            error:    "red",
            trace:    "magenta",
            group:    "green",
            groupEnd: "green"
        },
        group :{
            autoIndent: true,
            indent: {
                line:  "  |",
                inner: "  |",
                start: "+->",
                split: "  |",
                end:   "<-+",
                join:  "  |"
            }
        },
        buffer:  { size:       0,
                   formatFunc: null,
                   getTrace:   false,
                   showTrace:  false,
                   deepCopy:   false
        },
        schema: {
            "dev" : {
                // show all
                display: { log: true,  info: true,  warn:  true, error: true, trace: true, group:  true, groupEnd:  true }
            },
            "stage": {
                display: { log: false, info: false, warn:  true, error: true, trace: true, group:  true, groupEnd:  true }
            },
            "prod": {
                display: { log: false, info: false, warn: false, error: true, trace: true, group: false, groupEnd: false }
            }
        }
    };

    this._buffer = [];
    this._groups = [];
    this._id = 0;

    this._consoleFunc = {};
    this._addLogType('log');
    this._addLogType('warn');
    this._addLogType('error');
    this._addLogType('info');
    this._addLogType('trace');
    this._addLogType('group');
    this._addLogType('groupEnd');

    // --------------------------------
    // process options
    if(opts) {

        if(isString(opts)){
            // if not opts2 then make it an object
            if(!opts2) {
                opts2 = {};
            }

            // take name and add it to options
            opts2.name = opts;
            // replace opts with opts2
            opts = opts2;
        }

        if(isObject(opts)){

            // browser is always syncLogs
            if(isBrowser) {
                this._options.syncLogs = true;
            }

            if(opts.hasOwnProperty('name')) {
                this._options.name = opts.name || this._options.name;
            }

            if(opts.hasOwnProperty('env')) {
                if(isString(opts.env)) {
                    this._applyEnv(opts.env);
                }
            }

            if(opts.hasOwnProperty('getTrace')) {
                if(typeof opts.getTrace === 'boolean') {
                    this._options.getTrace = opts.getTrace;
                }
            }

            if(opts.hasOwnProperty('showTrace')) {
                if(typeof opts.showTrace === 'boolean') {
                    this._options.showTrace = opts.showTrace;

                    // if you want to show trace you must get it
                    if(!this._options.getTrace){
                        this._options.getTrace = true;
                    }
                }
            }

            if(opts.hasOwnProperty('showDateTime')) {
                if(typeof opts.showDateTime === 'boolean') {
                    this._options.showDateTime = opts.showDateTime || this._options.showDateTime;
                }
            }


            if(opts.hasOwnProperty('showLogId')) {
                if(typeof opts.showLogId === 'boolean') {
                    this._options.showLogId = opts.showLogId;
                }
            }

            if(opts.hasOwnProperty('showLogType')) {
                if(typeof opts.showLogType === 'boolean') {
                    this._options.showLogType = opts.showLogType;
                }
            }

            if(opts.hasOwnProperty('syncLogs')) {
                if(typeof opts.syncLogs === 'boolean') {
                    this._options.syncLogs = opts.syncLogs;
                }
            }

            if(opts.hasOwnProperty('replaceConsole')) {
                this._options.replaceConsole = opts.replaceConsole;
                if(hasConsole()) {
                    try {
                        console = this;
                    } catch (err) {
                        // error is ok
                        console.log("Stumpy Could not overwrite global console - err:", err);
                    }
                }
            }

            // if schema
            // apply schema data onto options schema
            if(opts.hasOwnProperty('schema')) {
                this._options.schema = mergeObj(this._options.schema, opts.schema);
            }

            if(opts.hasOwnProperty('formatFunc')) {
                this._options.formatFunc = opts.formatFunc;
            }

            if(opts.hasOwnProperty('display')) {
                if(typeof opts.display === 'boolean') {
                    for(var d in this._options.display) {
                        this._options.display[d] = opts.display;
                    }
                }
                else if(typeof opts.display === 'object') {
                    this._options.display = mergeObj(this._options.display, opts.display);
                }
            }

            if(opts.hasOwnProperty('group')) {
                if(typeof opts.group === 'object') {
                    this._options.group = mergeObj(this._options.group, opts.group);
                }
            }

            if(opts.hasOwnProperty('buffer')) {
                if(typeof opts.buffer === 'boolean') {
                    if(!opts.buffer) opts.buffer.size = 0;
                }
                else if(typeof opts.buffer === 'number') {
                    this._options.buffer.size = opts.buffer;
                }
                else if(typeof opts.buffer === 'object') {
                    this._options.buffer = mergeObj(this._options.buffer, opts.buffer);
                }

                // if you want to show trace you must get it
                if( this._options.buffer.showTrace &&
                    !this._options.buffer.getTrace){
                    this._options.buffer.getTrace = true;
                }
            }
        }
    }
};

Stumpy.prototype._applyEnv = function(env) {
    // if valid env
    if(this._options.schema.hasOwnProperty(env)) {
        this._options.env = env;
        this._options = mergeObj(this._options, this._options.schema[env]);
    }
};

Stumpy.prototype._addLogType = function(type) {
    // copy console of the log type for apply (later)
    if( Console &&
        Console[type]) {
        this._consoleFunc[type] = Console[type];
    } else {
        // add group/groupEnd support for platforms that do not support it (eg. Node)
        this._consoleFunc[type] = function(){
            if(this._consoleFunc['log']) {
                this._consoleFunc['log'].apply(Console, arguments);
            }
        }.bind(this);
    }

    // add display options for new type
    this._options.display[type] = true;

    // add log type to Logger prototype
    Stumpy.prototype[type] = function Logger(){
        this._id++;
        var log = {
            id:    this._id,
            date:  new Date(),
            type:  type,
            args:  Array.prototype.slice.call(arguments, 0),
            stackTrace: null
        };

        // if display log type, use console of that log type
        if(this._options.display[type]){
            var out = log.args;

            if(this._options.getTrace || log.type === 'trace') {
                log.stackTrace = this._getTrace();
            }

            //
            if( type === 'group') {
                if(log.args.length < 1) {
                    log.args.push('group');
                }

                this._groups.push(log.args[0]);
            }
            log.groups = deepCopy(this._groups);

            // remove last group
            if( type === 'groupEnd') {
                var groupName = this._groups.pop();
                // set args to last groupName
                log.args = [ groupName ];
            }

            if(this._options.formatFunc) {
                out = this._options.formatFunc.apply(this._options.formatFunc, [this._options, log]);
            }

            // rows must be array, turn into array
            if(isString(out)) {
                out = [out];
            }

            this._consoleWrapper(type, out);
        }

        // add log to buffer it buffer not exist
        if(this._options.buffer.size > 0) {
            // buffer over max
            if(this._buffer.length >= this._options.buffer.size) {
                this._buffer.shift();
            }

            if( !log.stackTrace &&
                (this._options.buffer.getTrace || log.type === 'trace')) {
                log.stackTrace = this._getTrace();
            }

            // if deep copy args
            //  prevent passing in object from changing
            if(this._options.buffer.deepCopy) {
                log.args = deepCopy( log.args );
            }

            // don't add group to buffer
            if(type != 'group' &&
               type != 'groupEnd' ) {
                this._buffer.push(log);
            }
        }
    };
};

Stumpy.prototype.clear = function() {
    this._buffer = [];
};

Stumpy.prototype.getRawBuffer = function() {
    return this._buffer;
};

Stumpy.prototype.getBuffer = function() {
    return this._dump(false);
};

// display all buffered messages
Stumpy.prototype.printBuffer = function() {
    return this._dump(true);
}

Stumpy.prototype._dump = function(display) {
    var out = [];

    if( Console &&
        this._buffer.length == 0) {
        this._consoleFunc['log'].call(Console, "Empty buffer");
        return out;
    }

    for(var b in this._buffer) {
        var log = this._buffer[b];
        if(log.type != null) {
            var row = log.args;

            if( this._options.buffer.formatFunc) {
                row = this._options.buffer.formatFunc.apply(this._options.buffer.formatFunc, [this._options, log]);
            }

            // rows must be array, turn into array
            if(isString(row)) {
                row = [row];
            }

            if(display) {
                var outDisplay = [];
                if( this._options.formatFunc) {
                    outDisplay = this._options.formatFunc.apply(this._options.formatFunc, [this._options, log]);
                }

                this._consoleWrapper(log.type, outDisplay);
            }

            // convert all object to strings
            for(var a = 0; a < row.length; a++) {
                if(typeof row[a] === 'object') {
                    row[a] = JSON.stringify(row[a]);
                }
            }

            row = argsToString(row);
            out.push(row);
        }
    }

    return out;
};

Stumpy.prototype._getTrace = function(depth){
    if(stackTrace) {
        var stack = stackTrace.get();
        if(!depth) { depth = 2; }
        var traceItem = stack[depth];
        var filename  = traceItem.getFileName();
        var linenum   = traceItem.getLineNumber();
        var colnum    = traceItem.getColumnNumber();
        var traceOut  = filename+":"+linenum+":"+colnum;

        //console.log("traceOut:", traceOut);
        return { trace: traceOut, stack: stack };
    } else {
        try{
            trigger.error = 1/0;
        } catch (e) {
            var stack = e.stack.toString();
            var traceOut = stack.split("\n");
            traceOut = traceOut.pop(); // get item
            traceOut = traceOut.replace("at", ""); // remove at verb
            traceOut = traceOut.replace(/^\s+|\s+$/g, ''); // remove whitespace

            return { trace: traceOut, stack: stack };
        }
    }
};

// adds color if ! browser
Stumpy.prototype._consoleWrapper = function(type, args){
    if( Console &&
        !isBrowser &&
        this._options.colors[type] &&
        clc )
    {
        var color = null;
        if( isString(this._options.colors[type]) ) {
            color = clc[ this._options.colors[type] ];
        }

        args = argsToString(args);
        if(color) {
            args = color(args);
        }

        if(isString(args)) {
            args = [args];
        }

        // if error
        // process.stderr.write(error(args + '\n'));

        // warn is a warning not an error, treat as such
        if(type === 'warn') {
            type = 'log';
        }

        // always do log if syncLogs
        if( this._options.syncLogs &&
            ( type === 'trace' ||
              type === 'error' )
            ) {
            // TODO: make fully sync using temp buffer, this will not write logs to stderr
            this._consoleFunc['log'].apply(Console, args);
        } else {
            this._consoleFunc[type].apply(Console, args);
        }
    } else {
        this._consoleFunc[type].apply(Console, args);
    }
};


/*
 * Utility functions
 */
function browserFormatFunc(options, log) {
    var out = [];
    var a = 0;

    // add name first
    if(options.name) {
        if( isString(log.args[0]) ) {
            out.push( options.name + ' - ' + log.args[0] );
            a++;
        }
    }

    // add args
    for(; a < log.args.length; a++) {
        // if show time, and first item
        out.push( log.args[a] );
    }

    // show trace
    if(options.showTrace) {
        out.push("-> " + log.stackTrace.trace );
    }

    return out;
}

// "[:date] :name - :group :args (:trace)"
function serverFormatFunc(options, log){
    var firstArg = "";
    var indentStr = "";
    var out = [];
    var a = 0;

    if(options.showDateTime) {
        // add time
        var td = getDateString( log.date );
        firstArg += "["+td+"]";
    }
    if(options.showLogId) {
        firstArg += ' #' + padLeft(log.id, 5) + ' ';
    }
    if(options.showLogType) {
        firstArg += padLeft(log.type, 8, ' ');
    }

    // add time and name
    if(options.name) {
        firstArg += ' ' + options.name+ ' -';
    }

    if( options.group.autoIndent ){
        // split

        if(log.groups.length) {
            if (log.type === 'group' ||
                log.type === 'groupEnd') {
                log.args[0] = '('+log.args[0]+')'
            }

            for(var i = 0; i < log.groups.length-1; i++) {
                // last indent and starting a group
                if( (i+1 == log.groups.length-1) &&
                    (log.type === 'group') ) {
                    indentStr += options.group.indent.split;
                }
                else if( (i+1 == log.groups.length-1) &&
                         (log.type === 'groupEnd') ) {
                    indentStr += options.group.indent.join;
                } else {
                    indentStr += options.group.indent.inner;
                }
            }

            if (log.type === 'group') {
                indentStr += options.group.indent.start;
            }
            else if (log.type === 'groupEnd') {
                indentStr += options.group.indent.end;
            } else {
                indentStr += options.group.indent.line;
            }

            firstArg += ' ' + indentStr;
        }
    }

    // if first arg is string then add to first arg
    if( isString(log.args[0]) ) {
        firstArg += ' ' + log.args[0];
        a++;
    }

    if(firstArg.length) {
        out.push(firstArg);
    }

    // add args
    for(; a < log.args.length; a++) {
        // if show time, and first item
        out.push( log.args[a] );
    }

    // show trace
    if( options.showTrace &&
        log.type !== 'trace') {
        out.push("-> " + log.stackTrace.trace);
    }
    else if( log.type === 'trace') {
        out.push( "-> " + log.stackTrace.stack.join('\n') );
    }

    return out;
}

function hasConsole(){
    if(typeof console === 'undefined') {
        return false;
    } else {
        return true;
    }
}

function isObject(obj) {
    return (Object.prototype.toString.call(obj)  === '[object Object]');
}

function isString(str) {
    return (Object.prototype.toString.call(str)  === '[object String]');
}

function mergeObj(desc, src){
    var ndesc = {};
    if ((desc instanceof Object)) {
        ndesc = deepCopy(desc);
    }

    for(var i in src) {
        if (  src[i] &&
             (src[i] instanceof Object) &&
            !(typeof src[i] === "function") ) {
            ndesc[i] = mergeObj(ndesc[i], src[i]);
        } else {
            ndesc[i] = src[i];
        }
    }

    return ndesc;
}

function deepCopy(obj) {
    var objCopy = obj;
    if (  obj &&
         (obj instanceof Object) &&
        !(typeof obj === "function") ) {
            objCopy = (obj instanceof Array) ? [] : {};

            for(var o in obj) {
                objCopy[o] = deepCopy( obj[o] );
            }
    }
    return objCopy;
};

// 100, 6,'+'    -> +++100
// 123, 5        -> 00123
// 5555, 2       -> 5555
// 'joe', 6, '^' -> ^^^joe
function padLeft(item, padding, padChar) {
    padding = padding || 10;
    var size = padding - String(item).length + 1;

    if(size) {
        // create an array with length of padding minus item
        var a = new Array(size);
        // create string of padding chars (length of array) join to item
        return a.join(padChar || '0') + item;
    }
}

// 'YYYY-MM-DD HH:mm:ss.msZ'
function getDateString(date){
    function pad(number) {
        if ( number < 10 ) {
            return '0' + number;
        }
        return number;
    }

    return date.getUTCFullYear() +
        '-' + pad( date.getUTCMonth() + 1 ) +
        '-' + pad( date.getUTCDate() ) +
        ' ' + pad( date.getUTCHours() ) +
        ':' + pad( date.getUTCMinutes() ) +
        ':' + pad( date.getUTCSeconds() ) +
        '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) +
        'Z';
}

function argsToString(args) {
    // if util lib exists AND
    // if first item in row is a string AND
    // if first item contains %
    if( isString(args[0]) &&
        (args[0].indexOf("%") !== -1) ) {
        if(sprintf) {
            // then user sprintf to process string like console.log would
            args = sprintf.apply(sprintf, args);
        }
        else if(util)
        {
            // util.format uses %d not %f
            args[0] = args[0].replace("%f", "%d");
            args = util.format.apply(this, args);
        }
    } else {
        // convert all objects to strings
        for(var i = 0; i < args.length; i++) {
            if( isObject(args[i]) ) {
                args[i] = JSON.stringify(args[i]);
            }
        }

        args = args.join(' ');
    }

    return args;
}

})(sprintf);
