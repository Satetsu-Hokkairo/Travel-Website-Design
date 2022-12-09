// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// gulpプラグインを読み込みます
const { src, dest, series, parallel, watch } = require("gulp");
// Sassをコンパイルするプラグインを読み込みます
const sass = require("gulp-sass")(require("sass"));
const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg"); // 追加
const pngquant = require("imagemin-pngquant"); // 追加
const changed = require("gulp-changed");

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
/**
 * Sassファイルを監視し、変更があったらSassを変換します
 */
const watchSassFiles = () => watch("styles/*/_*.scss", compileSass);

// npx gulpというコマンドを実行した時、watchSassFilesが実行されるようにします
exports.default = watchSassFiles;
exports.imagemin = imagemin;