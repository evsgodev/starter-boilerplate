import { src, dest, parallel } from 'gulp';
import * as config from './config';
import { $ } from './helper';
const { EMAILS_BUILD } = config.argvMode;

export default class Copy {
    static tasks = () => parallel(
        Copy.emailsCopy,
        Copy.scriptsCopy,
        Copy.filesCopy,
        Copy.assetsCopy
    )

    static emailsCopy(done) {
        if (EMAILS_BUILD) {
            return src(`${config.email.src}/assets/**/*`)
                .pipe(dest(config.email.dist));
        }

        return done();
    }

    static scriptsCopy() {
        return src(`${config.scriptsPath.src}/**/*`)
            .pipe($.newer(config.scriptsPath.dist))
            .pipe($.debug({ title: 'scripts' }))
            .pipe(dest(config.scriptsPath.dist));
    }

    static filesCopy() {
        return src(config.filesPath.src)
            .pipe($.newer(config.filesPath.dist))
            .pipe($.debug('files'))
            .pipe(dest(config.filesPath.dist));
    }

    static assetsCopy() {
        return src([
            `${config.sourceFolder}/assets/**/*`,
            `!${config.sourceFolder}/assets/misc/**`
        ])
            .pipe($.newer(config.assets))
            .pipe($.debug({ title: 'assets' }))
            .pipe(dest(config.assets));
    }

    static copyBuild() {
        return src(`${config.developer}/**/*`)
            .pipe(dest(config.production));
    }
}
