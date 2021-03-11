import { src, dest } from 'gulp';
import fs from 'fs';
import * as config from '../config';
import { $, browser, notifyErr } from '../helper';
import generateStaticPath from './helpers/generate-static-path';
import Data from './data';
const {
    EMAILS_BUILD,
    templatePreproc,
    templateLocals,
    prettify,
    htmlMinify
} = config.argvMode;
const { production } = config.argvMode.env;
const emitty = require('emitty').setup(config.sourceFolder, templatePreproc);
const patterns = [];
let { templateCache } = config.argvMode;

if (production) {
    templateCache = false;
}

if (templateLocals.symbolsInject) {
    patterns.push({
        match: '%symbols%',
        replacement: (() => fs.readFileSync(`${config.imagesPath.dist}/svg-symbols.svg`, 'utf8'))
    });
} else {
    patterns.push({
        match: '%symbols%',
        replacement: ''
    });
}

export default class HTMLPreproc {
    static htmlCompile() {
        if (!templateCache) {
            return HTMLPreproc.task();
        }

        return new Promise((resolve, reject) => {
            emitty.scan(global.emittyPugChangedFile)
                .then(HTMLPreproc.task(resolve, reject))
                .catch(event => console.log(event));
        });
    }

    static emailsCompile(cb) {
        if (EMAILS_BUILD) {
            src(config.email.filesSrc)
                .pipe($.plumber(notifyErr()))
                .pipe($.nunjucksRender({
                    path: config.email.src
                }))
                .pipe($.inlineCss({
                    preserveMediaQueries: true
                }))
                .pipe($.htmlPrettify(prettify))
                .pipe(dest(config.email.dist));
        }

        return cb();
    }

    static task(resolve, reject) {
        return src(config.template.src)
            .pipe($.plumber(notifyErr()))
            .pipe($.if(templateCache === true, emitty.filter(global.emittyPugChangedFile)))
            .pipe($.if(templateCache === true, $.debug()))
            .pipe($.data(Data.parser()))
            .pipe($.if(templatePreproc === 'pug',
                $.pug({
                    pretty: true,
                    locals: templateLocals
                }).on('error', () => browser.notify('<strong>FAIL</strong> Pug')),
                $.nunjucksRender({
                    path: config.template.render,
                    data: templateLocals
                }).on('error', () => browser.notify('<strong>FAIL</strong> Nunjucks'))))
            .pipe($.replaceTask({
                patterns: patterns,
                usePrefix: false
            }))
            .pipe(generateStaticPath())
            .pipe($.htmlPrettify(prettify))
            .pipe($.if(htmlMinify && !templateCache, $.htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: false,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeOptionalTags: true
            })))
            .pipe(dest(config.template.dist))
            .on('end', templateCache ? resolve : () => {})
            .on('error', templateCache ? reject : () => {});
    }
}
