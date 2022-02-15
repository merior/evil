const { src, dest, series, watch } = require('gulp');
const gulp = require('gulp');
const browseSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');

// Static server
function bs() {
    serveSass();
    browseSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("./html").on('change', browseSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./sass/**/*.scss", serveSass);
    watch("./js/*.js").on('change', browseSync.reload);
};

function serveSass() {
    return src("./sass/**/*.sass", "./sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
			cascade: false
		}))
        .pipe(dest("./css"))
        .pipe(browseSync.stream());
};

function buildCSS(done) {
    src('css/**/**.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('dest/css/'));
    done();
}

function buildCSS(done) {
    src(['js/**.js', '!js/**.min.js'])
        .pipe(minify({ext:{
                min:'.js'
            }
        }))
        .pipe(dest('dest/js/'));
    src('js/**.min.js').pipe(dest('dest/js/'));
    done();
}

function html(done) {
    src('**.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
    done();
}

function php(done) {
    src(['**.php'])
        .pipe(dest('dist/'));
    src('phpmailer/**/**')
        .pipe(dest('dist/phpmailer/'));
    done();
}

function fonts(done) {
    src('fonts/**/**')
        .pipe(dest('dist/fonts'));
    done();
}

function imagemin(done) {
    src('img/**/**')
        .pipe(tinypng({key: 'jSsN5dGVgypQXYzSCbtK3wP2bhbls80g'}))
        .pipe(dest('dist/img/'))
        src('img/**/*.svg')
        .pipe(tinypng({key: 'jSsN5dGVgypQXYzSCbtK3wP2bhbls80g'}))
        .pipe(dest('dist/img/'))
    done();
}

exports.serve = bs;
exports.build = series(buildCSS, buildJS, html, php, fonts, imagemin);