import { parallel, series } from 'gulp';
import { reload } from '../helper';
import Data from './data';
import HTMLPreproc from './html-preproc';

export default class HTML {
    static tasks() {
        return series(
            Data.dataRun,
            parallel(
                HTMLPreproc.htmlCompile,
                HTMLPreproc.emailsCompile
            )
        );
    }

    static templates() {
        return series(HTMLPreproc.htmlCompile, reload);
    }

    static data() {
        return series(Data.dataRun, reload);
    }

    static emails() {
        return series(HTMLPreproc.emailsCompile, reload);
    }
}
