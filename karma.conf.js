const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [{
      pattern: './tests/*.ts'
    }],
    preprocessors: {
      '**/*.ts': 'karma-typescript'
    },
    webpack: {
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.tsx?$/,
            exclude: [/\/node_modules\//],
            use: ['awesome-typescript-loader', 'source-map-loader']
          },
          !isProd
            ? {
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [/\/node_modules\//],
                query: {
                  esModules: true
                }
              }
            : null,
          { test: /\.html$/, loader: 'html-loader' },
          { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
        ].filter(Boolean)
      },
      resolve: {
        extensions: ['.ts', '.js']
      },
    },
    reporters: ['spec', 'coverage-istanbul'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcov', 'text-summary'],
      dir: './tests/coverage', // coverage results needs to be saved under coverage/
      fixWebpackSourcePaths: true,
      query: {
        esModules: true
      }
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  });
};
