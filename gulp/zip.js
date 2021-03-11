import { src, dest } from 'gulp';
import * as config from './config';
import { $ } from './helper';
const { PROJECT_NAME, PROJECT_VERSION, BACKUP } = config.argvMode;

const zip = done => {
    const name = `${PROJECT_NAME}_${PROJECT_VERSION}`;
    const now = new Date();
    const year = now.getFullYear().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    if (BACKUP) {
        src(`${config.production}/**/*`)
            .pipe($.zip(`${name}_${year}-${month}-${day}_${hours}-${minutes}.zip`))
            .pipe(dest('./'));
    }

    return done();
};

export default zip;
