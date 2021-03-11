import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { argvMode, webpackPath } from './gulp/config';
const { production } = argvMode.env;

const webpackConfig = {
    mode: production ? 'production' : 'development',
    devtool: production ? false : 'source-map',
    entry: webpackPath.entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }, {
                        loader: 'eslint-loader'
                    }
                ]
            }, {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, './src/components/'),
                    path.resolve(__dirname, './src/styles/')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: true,
                                sourceMap: false
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename(getPath) {
                return getPath('../css/[name].css');
            },
            allChunks: true
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    test: /node_modules/,
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    output: {
        path: path.resolve(__dirname, webpackPath.output),
        publicPath: webpackPath.output,
        filename: '[name].js'
    },
    resolve: {
        alias: {
            jquery: 'jquery/src/jquery'
        }
    }
};

export {
    webpackConfig
};
