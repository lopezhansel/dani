
// npm i -D gulp-autoprefixer babelify browserify vinyl-buffer gulp-cssmin gulp-concat gulp gulp-if gulp-util gulp-less gulp-plumber gulp-sourcemaps vinyl-source-stream gulp-uglify watchify gulp-nodemon webpack-stream browser-sync gulp-babel
var autoprefixer          = require('gulp-autoprefixer');
var babelify              = require('babelify');
var browserify            = require('browserify');
var buffer                = require('vinyl-buffer');
var cssmin                = require('gulp-cssmin');
var concat                = require('gulp-concat');
var gulp                  = require('gulp');
var gulpif                = require('gulp-if');
var gutil                 = require('gulp-util');
var less                  = require('gulp-less');
var plumber               = require('gulp-plumber');
var sourcemaps            = require('gulp-sourcemaps');
var source                = require('vinyl-source-stream');
var uglify                = require('gulp-uglify');
var watchify              = require('watchify');

var production = process.env.NODE_ENV === 'production';

gulp.task('concatJavascripts', function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/vivus/dist/vivus.js',
    'node_modules/semantic-ui/dist/semantic.js',
  ]).pipe(concat('regular-vendors.js'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

var dependencies = ['alt', 'react', 'react-dom', 'react-router','react-addons-css-transition-group'];
gulp.task('browserify-vendor', function() {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('browserify.vendor.bundle.js'))
    .pipe(buffer())
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});
gulp.task('browserify', ['browserify-vendor'], function() {
  return browserify({ entries: 'app/main.js', debug: true })
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/js'));
});
gulp.task('browserify-watch', ['browserify-vendor'], function() {
  var bundler = watchify(browserify({ entries: 'app/main.js', debug: true }, watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, { presets: ['es2015', 'react'] });
  bundler.on('update', rebundle);
  return rebundle();
  function rebundle() {
    var start = Date.now();
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js/'));
  }
});
gulp.task('less', function() {
  return gulp.src('app/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less().on('error', function(err){
        gutil.log(err);
        this.emit('end');
    }))
    .pipe(autoprefixer())
    .pipe(concat('main.css'))
    .pipe(gulpif(production, cssmin()))
    .pipe(gulp.dest('public/css'));
});
gulp.task('watch', function() {
  gulp.watch('app/stylesheets/**/*.less', ['less']);
});

gulp.task('default', ['less', 'concatJavascripts', 'browserify-watch', 'watch']);
gulp.task('build', ['less', 'concatJavascripts', 'browserify']);
gulp.task('styles', ['less','watch']);

// var wepbpackConfig        = require('./webpack.config');
// var nodemon               = require('gulp-nodemon');
// var markdown              = require('./config/markdownGulp');
// var webpack               = require('webpack-stream');  
// var browserSync           = require('browser-sync');
// var babel                 = require('gulp-babel');

// const paths = {
//   jsSrc       : './src/js/**/*.js',
//   jsBuildName : 'bundle.js',
//   jsBuild     : './public//js',
//   readme      : 'README.md',
//   mdView      : './public/views/odReadme.html'
// };
// gulp.task('browser-sync', ['nodemon'], () => {
//   browserSync.init(null, {
//         injectChanges: true,
//     proxy: {
//             target: "localhost:2000",
//             ws: true
//         },
//         files: ["./public/**/*.*"],
//         browser: "google chrome",
//         port: 2001,
//         reloadDelay: 500
//   });
// });
// gulp.task('nodemon', (cb) => {
//   var started = false;
//   return nodemon({
//     script: 'server.js',
//         ignore: ["public/**/*.*", '/gulpfile.js', "src/**/*.*"]
//   }).on('start',  () =>{
//     // to avoid nodemon being started multiple times
//     if (!started) {
//       cb();
//       started = true; 
//     } 
//   });
// }); 
// gulp.task('javascript',()=>{
//     console.log("javascript")
//     markdown(paths.readme, paths.mdView)
//     browserSync.reload()
//     return gulp.src(paths.jsSrc)
//         .pipe(plumber())
//         // .pipe(babel({presets: ['es2015'] })) // now transformed by webpack
//         .pipe(webpack(wepbpackConfig))
//         .pipe(gulp.dest(paths.jsBuild));
// });
// gulp.task('markdown',()=>{
//     console.log("markdown")
//     markdown(paths.readme, paths.mdView)
//     browserSync.reload()
// });
// gulp.task('watch', () => {
//   gulp.watch(paths.jsSrc, ['javascript']);
//   gulp.watch(paths.readme, ['markdown']);
// });

// gulp.task('default', [ 'vendor', 'browserify-watch','browser-sync','javascript','watch']);


