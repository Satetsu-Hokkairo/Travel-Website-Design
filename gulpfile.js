// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// gulpプラグインを読み込みます
const { src, dest, series, parallel, watch, tree } = require("gulp");
// Sassをコンパイルするプラグインを読み込みます
const sass = require("gulp-sass")(require("sass"));
const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg"); // 追加
const pngquant = require("imagemin-pngquant"); // 追加
const changed = require("gulp-changed");
const browserSync = require("browser-sync");
/**
 * Sassをコンパイルするタスクです
 */
const compileSass = () =>
  // style.scssファイルを取得
  src("styles/*.scss")
    // Sassのコンパイルを実行
    .pipe(
      // コンパイル後のCSSを展開
      sass({
        outputStyle: "compressed",
      })
    )
    // cssフォルダー以下に保存
    .pipe(dest("styles/css"));
function imagemin(done) {
  src("images/**")
    .pipe(changed("images/"))
    .pipe(
      imageMin([
        pngquant({
          // 追加
          quality: [0.6, 0.7],
          speed: 1,
        }),
        mozjpeg({ quality: 65 }), // 追加
        imageMin.svgo(),
        imageMin.optipng(),
        imageMin.gifsicle({ optimizationLevel: 3 }),
      ])
    )
    .pipe(dest("images/image/"));
  done();
}
function startAppServer(done) {
  browserSync.init({
    server: {
      baseDir: "./"                   // browser-syncが基準とするディレクトリを指定する
    },
    startPath: "./index.html",      // 開きたいパスを指定する
    notify: false,                    // ブラウザ更新時に出てくる通知を非表示にする
    open: "external",                 // ローカルIPアドレスでサーバを立ち上げる
  });

  done();
}

function browserSyncReload(done) {
	browserSync.reload();

	done();
}

function watchTask(done) {
	watch(["./styles/**/*.scss"], series(browserSyncReload));    //	監視対象とするパスはお好みで
	watch(["./scripts/**/*.js"], series(browserSyncReload));    //	監視対象とするパスはお好みで
	watch(["./scripts/*.js"], series(browserSyncReload));    //	監視対象とするパスはお好みで
	watch(["./index.html"], series(browserSyncReload));    //	監視対象とするパスはお好みで
}

/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */
const watchSassFiles = () => watch("styles/**/*.scss", compileSass);
const serve = series(parallel(watchSassFiles, series(startAppServer, browserSyncReload, watchTask)));

// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = watchSassFiles;
exports.imagemin = imagemin;
exports.serve = serve;