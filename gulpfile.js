// Must install

// npm install gulp -g
// npm install gulp --save-dev
// npm install gulp-node-inspector --save-dev
// npm install gulp-nodemon --save-dev
// npm install browser-sync --save-dev
// npm install gulp-if yargs --save-dev
// npm install gulp-ng-annotate --save-dev

// *** option 1 install all gulp plugins in one npm install

//npm install gulp-load-plugins --save-dev

//*** option 2 install gulp plugins separate

// npm install jshint gulp-jshint --save-dev
// npm install gulp-jscs --save-dev
// npm install jshint-stylish --save-dev
// npm install gulp-print --save-dev

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
// var nodeInspector = require('gulp-node-inspector');
var $ = require('gulp-load-plugins')({lazy: true});
var args = require('yargs').argv;
var config = require('./gulp.config')();
var browserSync = require('browser-sync').create();
var port = process.env.Port ||config.defaultPort;

// browserSync.init({
//     injectChanges: true,
//     server: config.server
// });
//
// gulp.task('browser-sync', function() {
//     browserSync.init(['./server/public/scripts/**.*', './server/public/styles/**.*'], {
//         server: {
//             baseDir: "./server/app.js"
//         }
//     });
// });

gulp.task('default', ['debugger','watch'], function(){

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': true
        },
        watch:[config.server]
    };
    return $.nodemon(nodeOptions)
        .on('restart', function(ev) {
            log('*** nodemon restarted');
            log('*** file changes on restart:\n' + ev);
            setTimeout(function() {
                browserSync.notify('reloading now ... ');
                browserSync.reload({stream: false});
            }, config.BrowserReloadDelay);
        })
        .on('start', function() {
            log('*** nodemon started');
            // startBrowserSync();
        })
        .on('crash', function() {
            log('** * nodemon crashed: some script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exit cleanly');
        })
});

// gulp.task('debug', function() {
//
//     gulp.src([])
//         .pipe(nodeInspector({
//             debugPort: 5858,
//             webHost: '0.0.0.0',
//             webPort: 8080,
//             saveLiveEdit: false,
//             preload: true,
//             inject: true,
//             hidden: [],
//             stackTraceLimit: 50,
//             sslKey: '',
//             sslCert: ''
//         }));
// });

gulp.task('debugger', function() {
    log('Analyzing source with JShint and JSCS');
    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('serverfile', function() {
    gulp.src(['./server/*.js', './server/routes/*.js'])
});

gulp.task('jsfile', function() {
    gulp.src('./server/public/scripts/*.js')
});

gulp.task('cssfile', function() {
    gulp.src('./server/public/styles/*.css')
});

gulp.task('htmlfile', function() {
    gulp.src(
        ['./server/public/views/partials/*.html',
        './server/public/views/*.html']
    )
});

gulp.task('watch', function() {
    gulp.watch(['./server/*.js', './server/routes/*.js'], ['serverfile'], function(done) {
        browserSync.reload();
        done();
    });
    gulp.watch('./server/public/scripts/*.js', ['jsfile'], function(done) {
        browserSync.reload();
        done();
    });
    gulp.watch('./server/public/styles/*.css', ['cssfile'], function(done) {
        browserSync.reload();
        done();
    });
    gulp.watch(['./server/public/views/partials/*.html',
        './server/public/views/*.html'], ['htmlfile'], function(done) {
        browserSync.reload();
        done();
    });
});

function startBrowserSync () {
    if(browserSync.active) {
        log('*** Starting browser sync on port ' + port);
        var options = {
            proxy: 'locationhost' + port,
            port: 3000,
            files: [config.client + '/**/*.*'],
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFilesChanges: true,
            logLevel: debug,
            logPrefix: 'gulp-pattern',
            notify: true,
            reloadDelay: 0
        }
        browserSync(options);

    }
}

function log(msg) {
    if(typeof(msg) === 'object') {
        for (var item in msg) {
            if(msg.hasOwnProperty(item)){
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

