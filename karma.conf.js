module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai'],
    files: [
        'test.js'
    ],
    preprocessors: {
      'test.js': [ 'webpack', 'sourcemap' ]
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=stage-0' }
        ]
      }
    },

    webpackServer: {
      noInfo: true
    }

  })
}
