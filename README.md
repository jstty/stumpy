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

## Even a Cat can do it
```js
var stumpy = Stumpy();

stumpy.log("look for prey");
stumpy.info("sleep %f hours", 8.62);
stumpy.warn("kill %d mice in a day", 26);
stumpy.error("miss target");
```

## Stumpy(options)

The first argument can be either an `options` object or a `name` string followed by an `options` object.
The all options have defaults.

* `name` - String used to when displaying a log. Default: `""`.
* `env` - String used to determine schema to use. which Default: `"dev"`.
* `replaceConsole` - Boolean to enable/disable replace the `console` global object with Stumpy. Default: `false`.
* `getTrace` - Boolean to enable/disable capture the trace info for each log. Default: `false`.
* `showTrace` - Boolean to enable/disable display of the trace info on each log. If this is set to `true`, `getTrace` will be set to `true`. Default: `false`.
* `showDateTime` - Boolean to enable/disable display of the date and time on each log. Default: `false` if Broweser, `true` if NodeJS.
* `showLogId` - Boolean to enable/disable display of the log id. The Id's are unique for each log per session, when the browser/server restarts the Id is reset. Default: `false`.
* `showLogType` - Boolean to enable/disable display of the log type ('log', 'warn', 'error', 'info', 'trace', 'group', or 'groupEnd'). Default: `false`.
* `syncLogs` - Boolean to enable/disable display of the synchronous logs. Warning: current version errors are sent to stdout NOT stderr. Default: `false`.
* `display` - Boolean or Object. If set to `true`, all display options are set to true. The Object is a key:value map of all the logging types. Default: `{ log: true,  info: true,  warn:  true, error: true, trace: true, group:  true, groupEnd:  true }`
* `formatFunc` - The function used to format the logs when `getBuffer` is called. If you wish to get the unformatted buffer use `getRawBuffer`. Default: `null`.
* `colors` - See [Colors](#colors-options) Options
* `group` - See [Group](#group-options) Options
* `buffer` - See [Buffer](#buffer-options) Options
* `schema` - See [Schema](#schema-options) Options


## Functions

* `log(...)` - Add/display a log. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/console.log" target="_blank">console.log</a> Options
* `warn(...)` - Add/display a warning. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/console.warn" target="_blank">console.warn</a> Options
* `error(...)` - Add/display a error. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/console.error" target="_blank">console.error</a> Options
* `info(...)` - Add/display a info. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/console.info" target="_blank">console.info</a> Options
* `trace(...)` - Add/display a trace. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/console.trace" target="_blank">console.trace</a> Options
* `group([name])` - Add/display a group. Optional `name` (default: `group`).
* `groupEnd()` - Add/display a groupEnd. No parameters.
* `clearBuffer()` - Clears the in memory buffer.
* `getBuffer()` - Returns an Array of Strings after running each log thought the `buffer.formatFunc`.
* `getRawBuffer()` - Returns the raw buffer (Array of Objects) with all the captured data.
* `printBuffer()` - Prints each log in the buffer using the `formatFunc`.

## Colors Options

See [Cli-Color](https://github.com/medikoo/cli-color#colors) for color values
The all options have defaults.

* `log` - String or Cli-Color Object. Default: `"whiteBright"`
* `info` - String or Cli-Color Object. Default: `"blue"`
* `warn` - String or Cli-Color Object. Default: `"yellow"`
* `error` - String or Cli-Color Object. Default: `"red"`
* `trace` - String or Cli-Color Object. Default: `"magenta"`
* `group` - String or Cli-Color Object. Default: `"green"`
* `groupEnd` - String or Cli-Color Object. Default: `"green"`


## Group Options

Used to generate the Group Trees for NodeJS
The all options have defaults.

* `autoIndent` - Boolean value enabling/disabling Group Trees. Default: `true`
* `indent` - Object containing the string parts used to the Group Tree for NodeJS


## Buffer Options

Used to configure the buffer.
The all options have defaults.

* `size` - Integer size of the log buffer. A `0` size will disable the buffer. When the limit is reached and a new log is add stumpy will remove the oldest log. Default: `0`.
* `formatFunc` - The function used to format the logs when `getBuffer` is called. If you wish to get the unformatted buffer use `getRawBuffer`. Default: `null`.
* `getTrace` - Boolean to enable/disable capture of trace info on each log. Default: `false`.
* `showTrace` - Boolean to enable/disable show trace info on each log. `getTrace` will be set to true if this is set to true. Default: `false`.
* `deepCopy` - Boolean to enable/disable deep copy of objects stored in the buffer. The default is false to consume less memory, however objects are referenced so they could change from the original log. Default: `false`.


## Schema Options

Used to configure the environment schemas. This is an object of environments, default: `dev`,`stage`, and `prod`.
When an `env` string is set, all keys in the matching schema key are applied over all other options in the base options.
The all options have defaults.

* `dev` - An Object for the `dev` environment. Default: `display: { log: true,  info: true,  warn:  true, error: true, trace: true, group:  true, groupEnd:  true }`.
* `stage` - An Object for the `stage` environment. Default: `display: { log: false, info: false, warn:  true, error: true, trace: true, group:  true, groupEnd:  true }`.
* `prod` - An Object for the `prod` environment. Default: `display: { log: false, info: false, warn: false, error: true, trace: true, group: false, groupEnd: false }`.



## Examples

[Browser - Hello Charlie](https://github.com/jstty/stumpy/blob/master/examples/browser/hellocharlie.html)

[Browser - Basic](https://github.com/jstty/stumpy/blob/master/examples/browser/basic.html)

[NodeJS - Hello Charlie](https://github.com/jstty/stumpy/blob/master/examples/node/hellocharlie.js)

[NodeJS - Basic](https://github.com/jstty/stumpy/blob/master/examples/node/basic.js)



## License

MIT: what else?

[Full license go go go! &raquo;](LICENSE)


## Blah blah blah... Tests

### Mocha
```sh
$ npm test
```

### Karma
```sh
$ npm run-script test-browser
```
