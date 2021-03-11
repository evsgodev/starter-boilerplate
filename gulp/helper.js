import plugins from 'gulp-load-plugins';
import { loadPlugins } from './config';

const $ = plugins(loadPlugins);
const browser = $.browserSync.create();

const reload = done => {
    browser.reload();
    done();
};

const notifyErr = title => {
    return $.notify.onError(err => {
        return {
            title: title,
            message: err.message
        };
    });
};

export {
    $,
    browser,
    reload,
    notifyErr
};
