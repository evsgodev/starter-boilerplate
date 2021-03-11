import { env } from '../user.config';

export const argvMode = Object.assign({}, env, {
    env: {
        production: process.env.NODE_ENV === 'production'
    },
    templateCache: true,
    minifyCss: false
});

export const {
    sourceFolder,
    developer,
    assets,
    FOLDER_BUILD: production,
    styleFileName,
    imageFolderName
} = argvMode;

export const loadPlugins = {
    pattern: ['gulp-*', 'gulp.*', 'browser-*', 'imagemin-*', 'main-*', 'run-*', 'require-*', 'stream-*', 'event-*', 'browser-sync', 'postcss-*', 'webpack', 'webpack-*', 'autoprefixer', 'del'],
    replaceString: /^gulp(-|\.)/,
    lazy: true,
    camelize: true
};

const templateDataFileName = '__snapshot-data-components__.json';

const getTemplateExt = () => {
    switch (argvMode.templatePreproc) {
        case 'pug':
            return 'pug';
        case 'nunjucks':
            return '{njk,html}';
        default:
            break;
    }

    return 'pug';
};

const template = {
    src: [
        `${sourceFolder}/pages/**/[^_]*.${getTemplateExt()}`,
        `!${sourceFolder}/**/{components,templates}/**/*.${getTemplateExt()}`
    ],
    dataFileName: templateDataFileName,
    dataFiles: [
        `${sourceFolder}/components/**/*.json`,
        `!${sourceFolder}/components/**/${templateDataFileName}`
    ],
    distComponents: `${sourceFolder}/components/`,
    render: [`${sourceFolder}/pages`, `${sourceFolder}/components`],
    dist: `${developer}/`
};

const email = {
    src: `${sourceFolder}/emails`,
    filesSrc: `${sourceFolder}/emails/[^_]*.html`,
    dist: `${assets}/emails/`
};

const styles = {
    entry: `${sourceFolder}/styles/${styleFileName}.scss`,
    components: `${sourceFolder}/components/**/*.scss`,
    dist: `${assets}/css/`
};

const webpackPath = {
    entry: {
        main: `./${sourceFolder}/js/main.js`
    },
    output: `${assets}/js/`
};

const scriptsPath = {
    src: `${sourceFolder}/js/vendor`,
    dist: `${assets}/js/vendor/`
};

const imagesPath = {
    src: `${sourceFolder}/assets/${imageFolderName}`,
    spriteSrc: `${sourceFolder}/assets/${imageFolderName}/content/icons`,
    spriteStylesDist: `${sourceFolder}/styles/include/plugins`,
    svgSrc: `${sourceFolder}/assets/${imageFolderName}/icons`,
    dist: `${assets}/${imageFolderName}/`
};

const filesPath = {
    src: `${sourceFolder}/assets/misc/**/*`,
    dist: `${developer}/`
};

const watchPath = {
    templates: [
        `${sourceFolder}/**/[^_]*.${getTemplateExt()}`
    ],
    data: [
        `${sourceFolder}/components/**/*.json`,
        `!${sourceFolder}/components/**/${templateDataFileName}`
    ],
    email: `${sourceFolder}/emails/*.html`,
    css: `${sourceFolder}/{styles,components}/**/*.scss`,
    js: {
        src: [
            `${sourceFolder}/**/*.js`,
            `!${sourceFolder}/js/vendor/**`
        ],
        vendor: `${scriptsPath.src}/**/*.js`
    },
    sprite: `${imagesPath.src}/content/icons/**/*.png`,
    svg: `${imagesPath.src}/icons/**/*.svg`,
    assets: `${sourceFolder}/assets/**/*.*`,
    files: `${sourceFolder}/assets/misc/**/*`
};

export {
    template,
    email,
    styles,
    webpackPath,
    scriptsPath,
    imagesPath,
    filesPath,
    watchPath
};
