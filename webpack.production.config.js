var webpack = require("webpack");
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const isDebug = process.env.NODE_ENV === 'development';
const publicPath = path.resolve(__dirname,"..");
module.exports = {
    devtool:'',
    mode:isDebug? 'development':'production',
    entry:{
        "index": "./src/index.js"
    },
    output: {
        filename: '[name]_bundle.js',
        chunkFilename: '[name].bundle.js',
        path:path.resolve(__dirname, "dist")
    },
    module:{
        rules:[
            {
                test:/(\.jsx|\.js)$/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:[
                            "stage-0", "react","env"
                        ],
                        "plugins": ["transform-object-rest-spread","transform-decorators-legacy","transform-class-properties",["import", { libraryName: "antd-mobile", style: "css" }]]
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer'),
                                require('postcss-import')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: './assets/[name].[ext]'
                        }
                    }
                ] 
            }
        ]
    },
    resolve:{
        alias: {
            moment$: 'moment/moment.js'
          }
    },
    plugins:[
        new webpack.BannerPlugin("yhyh copyRight"),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: false,
                    warnings:false
                },
                beautify:true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new es3ifyPlugin()
    ]
}