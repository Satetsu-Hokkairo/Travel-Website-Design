// import imagemin from 'imagemin'
// import imageminMozjpeg from 'imagemin-mozjpeg'
// import imageminPngquant from 'imagemin-pngquant'

// const ImgImagemin = function imagemin(done) {
//     src("./images/**")
//       .pipe(
//         imageMin([
//           pngquant({                // 追加
//             quality: [0.6, 0.7],
//             speed: 1,
//           }),
//           mozjpeg({ quality: 65 }), // 追加
//           imageMin.svgo(),
//           imageMin.optipng(),
//           imageMin.gifsicle({ optimizationLevel: 3 }),
//        ])
//       )
//       .pipe(dest("./dist/image/"));
//     done();
// }

// export default(done) => {
//   ImgImagemin();
//   done();
// }
//----------------------------------------------------------------------
//  モード
//----------------------------------------------------------------------
"use strict";

//----------------------------------------------------------------------
//  モジュール読み込み
//----------------------------------------------------------------------
const gulp = require("gulp");
const { src, dest, series, parallel, watch } = require("gulp");

const imageMin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");    // 追加
const pngquant = require("imagemin-pngquant");  // 追加
const changed = require("gulp-changed"); 

//----------------------------------------------------------------------
//  関数定義
//----------------------------------------------------------------------
function imagemin(done) {
  src("./images/**")
    .pipe(changed("./images/"))
    .pipe(
      imageMin([
        pngquant({                // 追加
          quality: [0.6, 0.7],
          speed: 1,
        }),
        mozjpeg({ quality: 65 }), // 追加
        imageMin.svgo(),
        imageMin.optipng(),
        imageMin.gifsicle({ optimizationLevel: 3 }),
     ])
    )
    .pipe(dest("./images/image/"));
  done();
}

//----------------------------------------------------------------------
//  タスク定義
//----------------------------------------------------------------------
exports.imagemin = imagemin;
