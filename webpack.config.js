const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const _ = require('lodash');

module.exports = (env) => {
    const chunks = [
        'app',
        'styles',
    ];

    if (!env.production) {
        chunks.push('sw-register');
    }

    const config = {
        devtool: 'eval-cheap-module-source-map',
        mode: env.production ? 'production' : 'development',
        entry: {
            'sw-register': path.resolve(__dirname, './src/sw-register.js'),
            sw: path.resolve(__dirname, './src/sw.js'),
            app: path.resolve(__dirname, './src/index.js'),
            styles: path.resolve(__dirname, './src/styles.scss'),
            introduction: path.resolve(__dirname, './src/pages/introduction/script.js'),
            types: path.resolve(__dirname, './src/pages/types/script.js'),
            dashboard: path.resolve(__dirname, './src/pages/dashboard/script.js'),
            git: path.resolve(__dirname, './src/pages/git/script.js')
        },
        output: {
            path: path.resolve(__dirname, './dist')
        },
        devServer: {
            publicPath: 'http://localhost:4201'
        },
        module: {
            rules: [{
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.ejs$/,
                    use: 'ejs-loader'
                },
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: path.resolve(__dirname, './node_modules')
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'url-loader'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: 'head',
                minify: true,
                inlineSource: '.(js|css)$',
                template: path.resolve(__dirname, './src/pages/introduction/tpl.ejs'),
                filename: '01.introduction.html',
                chunks: chunks.concat([
                    'introduction'
                ])
            }),
            new HtmlWebpackPlugin({
                inject: 'head',
                minify: true,
                inlineSource: '.(js|css)$',
                template: path.resolve(__dirname, './src/pages/types/tpl.ejs'),
                filename: '02.types.html',
                chunks: chunks.concat([
                    'types'
                ])
            }),
            new HtmlWebpackPlugin({
                inject: 'head',
                minify: true,
                inlineSource: '.(js|css)$',
                template: path.resolve(__dirname, './src/pages/dashboard/tpl.ejs'),
                filename: 'dashboard.html',
                chunks: chunks.concat([
                    'dashboard'
                ])
            }),
            new HtmlWebpackPlugin({
                inject: 'head',
                minify: true,
                inlineSource: '.(js|css)$',
                template: path.resolve(__dirname, './src/pages/git/tpl.ejs'),
                filename: '04.git.html',
                chunks: chunks.concat([
                    'dashboard'
                ])
            })
        ]
    }

    if (env.production) {
        config.devtool = 'false';
        config.plugins.push(new HtmlWebpackInlineSourcePlugin());
    }

    return config;
}