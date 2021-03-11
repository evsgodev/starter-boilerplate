import { watch, series } from 'gulp';
import path from 'path';
import * as config from './config';
import { $, browser, reload } from './helper';
import HTML from './html/html';
import Styles from './css-compile';
import Scripts from './js-compile';
import * as Images from './images/images';
import Copy from './copy';
const { SERVER_INDEX_PAGE, PNG_SPRITE } = config.argvMode;
const { developer, watchPath } = config;

const deleteEventFile = (filePath, resolve, src = config.sourceFolder) => {
    const sourcesFiles = path.relative(path.resolve(src), filePath);
    const destFiles = path.resolve(resolve, sourcesFiles);
    $.del.sync(destFiles);
};

const serveWatch = () => {
    browser.init({
        server: {
            baseDir: `./${developer}`,
            index: SERVER_INDEX_PAGE
        },
        watchOptions: {
            ignoreInitial: true
        },
        open: true,
        port: 8080,
        tunnel: false,
        online: false,
        notify: true,
        logConnections: true,
        ui: false
    });

    watch(watchPath.templates, { delay: 0 }, HTML.templates())
        .on('all', (event, file) => {
            if (event === 'unlink') {
                global.emittyPugChangedFile = undefined;
            } else {
                global.emittyPugChangedFile = file;
            }
        });

    watch(watchPath.data, HTML.data());
    watch(watchPath.email, HTML.emails());
    watch(watchPath.css, series(Styles.stylesRun, reload));
    watch(watchPath.js.src, series(Scripts.jsRun, reload));

    watch(watchPath.js.vendor, series(Copy.scriptsCopy, reload))
        .on('unlink', event => deleteEventFile(event, config.assets));

    watch(watchPath.assets, series(Copy.assetsCopy, reload))
        .on('unlink', event => deleteEventFile(event, config.developer));

    watch(watchPath.files, series(Copy.filesCopy, reload))
        .on('unlink', event => deleteEventFile(event, config.developer, `${config.sourceFolder}/assets/misc`));

    if (PNG_SPRITE) {
        watch(watchPath.sprite, series(Images.pngSprite, reload));
    }

    watch(watchPath.svg, series(Images.svgSprite, reload));
};

export default serveWatch;
