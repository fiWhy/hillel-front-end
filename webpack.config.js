const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const _ = require('lodash');

module.exports = (env) => {
    const config = {
        devtool: 'eval-cheap-module-source-map',
        mode: env.production ? 'production' : 'development',
        entry: {
            app: path.resolve(__dirname, './src/index.js'),
            styles: path.resolve(__dirname, './src/styles.scss'),
            introduction: path.resolve(__dirname, './src/pages/introduction/script.js'),
            dashboard: path.resolve(__dirname, './src/pages/dashboard/script.js')
        },
        output: {
            path: path.resolve(__dirname, './dist')
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
                chunks: [
                    'app',
                    'styles',
                    'introduction'
                ]
            }),
            new HtmlWebpackPlugin({
                inject: 'head',
                minify: true,
                inlineSource: '.(js|css)$',
                template: path.resolve(__dirname, './src/pages/dashboard/tpl.ejs'),
                filename: 'dashboard.html',
                chunks: [
                    'app',
                    'styles',
                    'dashboard'
                ]
            })
        ]
    }

    if (env.production) {
        config.devtool = 'false';
        config.plugins.push(new HtmlWebpackInlineSourcePlugin());
    }

    return config;
}