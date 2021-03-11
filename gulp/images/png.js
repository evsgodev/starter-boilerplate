import { src, dest } from 'gulp';
import * as config from '../config';
import { $ } from '../helper';
const { PNG_SPRITE } = config.argvMode;

const pngSprite = done => {
    if (PNG_SPRITE) {
        src(`${config.imagesPath.spriteSrc}/**/*.png`)
            .pipe($.spritesmith({
                imgName: 'sprite.png',
                retinaSrcFilter: `${config.imagesPath.spriteSrc}/**/*@2x.png`,
                retinaImgName: 'sprite@2x.png',
                retinaImgPath: `${config.imagesPath.dist}/content`,
                cssName: '_sprite.scss',
                algorithm: 'top-down',
                padding: 2
            }))
            .pipe($.debug({ title: 'sprites' }))
            .pipe(
                $.if(/[.]png$/, dest(`${config.imagesPath.dist}/content`))
            )
            .pipe(
                $.if(/[.]scss$/, dest(config.imagesPath.spriteStylesDist))
            );
    }

    return done();
};

export default pngSprite;
