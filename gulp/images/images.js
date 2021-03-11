import { parallel, series } from 'gulp';
import imagesOptimize from './compression';
import pngSprite from './png';
import svgSprite from './svg';

export default class IMAGES {
    static tasks = () => series(
        imagesOptimize,
        parallel(
            pngSprite,
            svgSprite
        )
    );
}

export {
    imagesOptimize,
    pngSprite,
    svgSprite
};
