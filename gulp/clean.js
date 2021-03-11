import { developer, production } from './config';
import { $ } from './helper';

export default class Clean {
    static cleanDev() {
        return $.del([
            `${developer}/**/*`
        ]);
    }

    static cleanBuild() {
        return $.del([
            `./*.zip`,
            `${developer}/**/*`,
            `${production}/**/*`
        ]);
    }
}
