const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

module.exports = (env) => {
    return {
        devtool: 'eval-cheap-module-source-map',
        mode: env ? env.NODE_ENV : 'production',
        entry: {
            app: path.resolve(__dirname, './src/index.js'),
            styles: path.resolve(__dirname, './src/styles.scss'),
            introduction: path.resolve(__dirname, './src/introduction/script.js')
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
                template: path.resolve(__dirname, './src/introduction/tpl.ejs'),
                filename: 'introduction.html',
                chunks: [
                    'app',
                    'styles',
                    'introduction'
                ]
            })
        ]
    }
}