const path = require('path');

module.exports = {
    name: 'Hillel Classes',
    short_name: 'Classes',
    description: 'Application for students of Hillel Classes',
    background_color: '#ffffff',

    icons: [{
        src: path.resolve(__dirname, './src/images/octopus.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
    }]
}