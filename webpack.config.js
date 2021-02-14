const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => { //something wrong
    const config =  {
        splitChunks: {
            chunks: 'all'
        }
    }

    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return config;
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
      main: ['@babel/polyfill','./index.js'],
      analytics: './analytics.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
    port: 4200,
    open: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader' ,'css-loader']
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader',
                    'less-loader'
                  ]
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader','css-loader',
                    'sass-loader'
                  ]
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                loader: 'babel-loader'
            }
        ]
    }
}