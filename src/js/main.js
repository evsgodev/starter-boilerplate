import 'normalize-css/normalize.css';
import ready from './fn/ready';
import imageReady from './fn/images-ready';
import { isTouchDevices } from './fn/detected';

class App {
    init() {
        if (isTouchDevices) document.querySelector('html').classList.add('is-touch');
        this.components();
        imageReady(document.querySelector('body'), () => {
            document.querySelector('body').classList.add('load');
        });
    }

    components() {}
}

ready(() => new App().init());
