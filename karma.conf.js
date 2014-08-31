// Karma configuration

module.exports = function(config) {
    config.set({
        files: [
            './lib/stumpy.js',
            'test/*.js'
        ],

        frameworks: ['mocha','chai'],
        client: {
            mocha: {
                ui: 'bdd'
            }
        },
        plugins: [
            // these plugins will be require() by Karma
             'karma-mocha'
            ,'karma-chai'
            ,'karma-chrome-launcher'
            ,'karma-phantomjs-launcher'
        ],
        browsers: [
            //'Chrome',
            'PhantomJS'
        ]
    });
};
