var gulp            = require("gulp");
var gulpLoadPlugins = require("gulp-load-plugins");
var browserSync     = require("browser-sync").create();
var plugins         = gulpLoadPlugins();
var reload          = browserSync.reload;

var resJS   = ["./client/src/js/**/*.module.js", "./client/src/js/**/*.js"];
var resSASS = "./client/src/styles/";
var resHTML = ["./client/src/js/templates/**/*.html"];

var bowerDir = "./bower_components/";

var buildJS   = "./client/public/js/";
var buildCSS  = "./client/public/css/";
var buildHTML = "./client/public/views";




gulp.task("js", function(){
  return gulp.src(resJS)
         // .pipe(plugins.uglify())
         .pipe(plugins.concat("main.min.js"))
         .pipe(gulp.dest(buildJS))
         .pipe(plugins.notify({message: "JS TASK DONE"}))
         .pipe(reload({ stream: true }));
});




gulp.task("templates", function() {
  return gulp
          .src(resHTML)
          .pipe(gulp.dest(buildHTML))
          .pipe(reload({ stream: true }));
});




gulp.task("js-vendors", function(){
  var vendors = [
      bowerDir+"jquery/dist/jquery.min.js",
      bowerDir+"bootstrap/dist/js/bootstrap.min.js",
      bowerDir+"angular/angular.js",
      bowerDir+"angular-sanitize/angular-sanitize.js",
      bowerDir+"angular-ui-router/release/angular-ui-router.js",
      bowerDir+"direction-aware-hover-effect/js/jquery.hoverdir.js",
      bowerDir+"ng-youtube-embed/build/ng-youtube-embed.min.js",
      bowerDir+"angular-touch/angular-touch.min.js",  
      bowerDir+"jquery-easings/jquery.easing.1.3.js"
  ];

  return gulp.src(vendors)
  .pipe(plugins.uglify())
  .pipe(plugins.concat("vendors.min.js"))
  .pipe(gulp.dest(buildJS))
  .pipe(plugins.notify({message: "JS-Vendors task - DONE"}))
  .pipe(reload({ stream: true }));
});




gulp.task("css-vendors", function(){
  var vendors = [
    bowerDir+"bootstrap/dist/css/bootstrap.min.css"
  ];

  return gulp.src(vendors)
        .pipe(plugins.concat("vendors.min.css"))
        .pipe(gulp.dest(buildCSS))
        .pipe(plugins.notify({message: "TASK CSS VENDORS done"}))
        .pipe(reload({ stream: true }));
});




gulp.task("sass", function(){
  return gulp.src(resSASS+"main.scss")
        .pipe(plugins.sass({outputStyle: 'compressed'}).on("error", plugins.sass.logError))
        .pipe(plugins.autoprefixer(
          {
            browsers : [
              'last 2 version',
              'safari 5',
              'ie 8',
              'ie 9',
              'ie 10',
              'ie 11',
              'opera 12.1',
              'ios 6',
              'android 4'
            ]
          }))
        .pipe(plugins.concat("main.min.css"))
        .pipe(gulp.dest(buildCSS))
        .pipe(plugins.notify({message:"SASS task - DONE"}))
        .pipe(reload({ stream: true }));
});




gulp.task("browser-sync", function ()
{
  var files = [
    buildJS+"*.js",
    buildCSS+"*.css",
    "client/public/img/*.png",
    "client/public/img/*.jpg",
    "client/public/*.html"
  ];

  browserSync.init(files,
  {
    server: {
      baseDir: "./client/public/"
    }
  });
});


gulp.task("watch", function ()
{
  gulp.watch(resJS, ["js"]);
  gulp.watch(resSASS+"*.scss", ["sass"]);
  gulp.watch(resHTML, ["templates"]);
});


gulp.task("default", ["browser-sync", "css-vendors", "js-vendors", "js", "templates", "sass", "watch"]);
