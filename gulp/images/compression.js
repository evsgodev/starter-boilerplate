import { src, dest } from 'gulp';
import * as config from '../config';
import { $ } from '../helper';
const { OPTIMIZE_IMAGES, PNG_OPTIMIZE } = config.argvMode;

const imagesOptimize = done => {
    if (OPTIMIZE_IMAGES) {
        src(`${config.imagesPath.src}/**/*.*`)
            .pipe($.newer(config.imagesPath.dist))
            .pipe($.debug({ title: 'images' }))
            .pipe($.imagemin([
                $.imagemin.gifsicle({
                    interlaced: true
                }),
                $.imagemin.jpegtran({
                    progressive: true
                }),
                $.imageminJpegoptim({
                    max: 80
                })
            ]))
            .pipe($.if(PNG_OPTIMIZE, $.imagemin([
                $.imagemin.optipng({
                    optimizationLevel: 5
                })
            ])))
            .pipe($.if(/[.]svg$/, $.svgmin(() => {
                return {
                    js2svg: {
                        pretty: true,
                        indent: '\t'
                    },
                    plugins: [
                        {
                            cleanupIDs: false
                        }, {
                            removeViewBox: false
                        }, {
                            convertPathData: false
                        }, {
                            mergePaths: false
                        }
                    ]
                };
            })))
            .pipe(dest(config.imagesPath.dist));
    }

    return done();
};

export default imagesOptimize;
