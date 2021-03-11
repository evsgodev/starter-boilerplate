import { task, series, parallel } from 'gulp';
import HTML from './gulp/html/html';
import Styles from './gulp/css-compile';
import Scripts from './gulp/js-compile';
import IMAGES from './gulp/images/images';
import Copy from './gulp/copy';
import serveWatch from './gulp/watch';
import Clean from './gulp/clean';
import zip from './gulp/zip';

task('default', series(
    Clean.cleanDev,
    Copy.tasks(),
    IMAGES.tasks(),
    parallel(
        HTML.tasks(),
        Styles.stylesRun,
        Scripts.jsRun
    ),
    serveWatch
));

task('build', series(
    Clean.cleanBuild,
    Copy.tasks(),
    IMAGES.tasks(),
    parallel(
        HTML.tasks(),
        Styles.stylesRun,
        Scripts.jsRun
    ),
    Copy.copyBuild,
    zip
));
