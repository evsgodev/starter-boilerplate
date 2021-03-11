import { src, dest } from 'gulp';
import { webpackConfig } from '../webpack.config';
import * as config from './config';
import { $, notifyErr } from './helper';
const { entry } = config.webpackPath;

export default class Scripts {
    static jsRun() {
        const entryPaths = [];

        Object.entries(entry).forEach(([, value]) => entryPaths.push(value));

        return src(entryPaths)
            .pipe($.plumber(notifyErr()))
            .pipe($.webpackStream(webpackConfig))
            .pipe(dest(webpackConfig.output.path));
    }
}
