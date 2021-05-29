import { src, dest } from 'gulp';
import {
    argvMode,
    styleFileName,
    imageFolderName,
    styles
} from './config';
import { $, browser, notifyErr } from './helper';
const { production } = argvMode.env;
let { minifyCss } = argvMode;
const { pathPrefix } = argvMode.styles;
const styleFilesSources = [styles.entry, styles.components];
const replaceCssPathName = `../${imageFolderName}/`;

if (production) {
    minifyCss = true;
}

export default class Styles {
    static stylesRun() {
        return src(styleFilesSources, { base: process.cwd() })
            .pipe($.plumber(notifyErr()))
            .pipe($.newer(styles.dist))
            .pipe($.if(!minifyCss, $.sourcemaps.init()))
            .pipe($.importify(`${styleFileName}.scss`))
            .pipe($.sass({
                outputStyle: 'expanded'
            }).on('error', () => {
                return browser.notify('<strong>FAIL</strong> Sass');
            }))
            .pipe($.autoprefixer())
            .pipe($.replaceTask({
                patterns: [{
                    match: pathPrefix,
                    replacement: replaceCssPathName
                }],
                usePrefix: false
            }))
            .pipe($.concat(`${styleFileName}.css`))
            .pipe($.if(minifyCss, $.cssnano({
                autoprefixer: {
                    remove: false
                },
                discardUnused: false,
                reduceIdents: false,
                zindex: false
            })))
            .pipe($.if(!minifyCss, $.sourcemaps.write('./')))
            .pipe(dest(styles.dist));
    }
}
