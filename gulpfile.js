const { series, src, dest, watch } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const del = require("del");

function sass_css() {
  return src("./assets/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./assets/css"));
  //   .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))//Para trazer minificado
}

function concat_css() {
  return src(["assets/css/*.css", "!assets/css/style.css"])
    .pipe(concat("style.css"))
    .pipe(dest("./assets/css"));
}

function minify_css() {
  return src("assets/css/style.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist"));
}

function rename_css() {
  return src("dist/style.css")
    .pipe(rename("style.min.css"))
    .pipe(dest("dist", { overwrite: true }));
}

function compress_js() {
  return src("assets/js/*.js")
    .pipe(uglify())
    .pipe(dest("dist", { overwrite: true }));
}

function rename_js() {
  return src("dist/main.js")
    .pipe(rename("main.min.js"))
    .pipe(dest("dist", { overwrite: true }));
}

function delete_files() {
  return del(["dist/main.js", "dist/style.css"]).then(paths => {
    console.log("Deleted files and folders:\n", paths.join("\n"));
  });
}

function delete_js() {
  return del(["dist/main.js"]).then(paths => {
    console.log("Deleted files and folders:\n", paths.join("\n"));
  });
}

function delete_css() {
  return del(["dist/style.css"]).then(paths => {
    console.log("Deleted files and folders:\n", paths.join("\n"));
  });
}

exports.default = series(
  sass_css,
  concat_css,
  minify_css,
  rename_css,
  compress_js,
  rename_js,
  delete_files
);

watch(
  "./assets/sass/**/*.scss",
  series(sass_css, concat_css, minify_css, rename_css, delete_css)
);

watch("./assets/js/**/*.js", series(compress_js, rename_js, delete_js));
