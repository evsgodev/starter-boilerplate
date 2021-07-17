import 'normalize-css/normalize.css';
import ready from './fn/ready';
import imageReady from './fn/images-ready';
import { isTouchDevices } from './fn/detected';

class App {
    static init() {
        if (isTouchDevices) {
            document.querySelector('html').classList.add('is-touch');
        }

        imageReady(document.querySelector('body'), () => {
            document.querySelector('body').classList.add('load');
        });
    }
}

ready(() => {
    App.init();
});
