// CONFIG
// To clean the modules that are not used in package.json but still installed : 'npm prune' in terminal.

// SOURCE OF FILES
var src                     =   './src',

// NAMES OF FILES
    fileCSS                 =   'global.css',
    fileJS                  =   'functions.js',

// DESTINATION OF FILES
    dest                    =   "./dist",

// Option for gulp-cssnano ( https://github.com/ben-eb/gulp-cssnano )
    browserSupported        = [ 'last 2 versions', 'safari >= 8', 'ie >= 9', 'ff >= 20', 'ios 6', 'android 4' ];

module.exports = {
    sass: {
        // Source of CSS files
        src: [
            src + '/scss/**/*.scss'
        ],

        deps: [
            './node_modules/bootstrap-sass/assets/stylesheets',
            './node_modules/typesettings',
            './node_modules/node-normalize-scss',
            './node_modules/breakpoint-sass/stylesheets',
            './node_modules/breakpoint-slicer/stylesheets',
            './node_modules/typi/scss',
        ],

        vendors: [
        ],


        // Source to watch
        srcWatch: src + '/scss/**',
        file: fileCSS,
        // Destination
        dest: dest + '/css'
    },

    javascript: {
        // Source to watch
        srcWatch : src + '/js/*.js',
        // Destination
        dest: dest + '/js',
        // Source of Javascript files
        sources: [
            {
                src: [
                    './node_modules/feature.js/feature.js'
                ],
                file: 'feature.js'
            },
            {
                src: [
                    // './node_modules/feature.js/feature.min.js',
                    // './node_modules/jquery-visibility/jquery-visibility.min.js',
                    './node_modules/svg4everybody/dist/svg4everybody.min.js',
                    './node_modules/jquery/dist/jquery.min.js',
                    './node_modules/wallop/js/Wallop.min.js',
                    src + '/js/app.js',
                    src + '/js/slider.js'
                    // src + '/js/form.js',
                    // src + '/js/page.js',
                    // src + '/js/home.js'
                ],
                file: fileJS
            }
        ]
    },

    minify: {
        src: dest + '/css/' + fileCSS,
        srcWatch : src + '/scss/**',
        dest: dest + '/css/min',
        supported: browserSupported,
    },

    svg: {
        src: 'img/svg/*.svg',
        srcWatch: 'img/svg/*.svg',
        dest: dest + '/svg',
    },
};
