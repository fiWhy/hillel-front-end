const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const manifestOptions = require('./manifest');
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
            dashboard: path.resolve(__dirname, './src/pages/dashboard/script.js')
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
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets'
                    }

                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: 'head',
                minify: true,
                inlineSource: '.(js|css)$',
                template: path.resolve(__dirname, './src/pages/introduction/tpl.ejs'),
                filename: 'introduction.html',
                chunks: chunks.concat([
                    'introduction'
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
            })
        ]
    }

    if (env.production) {
        config.devtool = 'false';
        config.plugins.push(new HtmlWebpackInlineSourcePlugin());
        config.plugins.push(new WebpackPwaManifest(Object.assign({},
            manifestOptions, {
                filename: 'manifest.json',
                inject: true,
                publicPath: null,
                includeDirectory: true
            }
        )));
    }

    return config;
}