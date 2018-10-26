const path = require("path");
const webpack = require("webpack");
const isDebug = process.env.NODE_ENV === 'development'
const publicPath = path.resolve(__dirname, "..");
console.log(path.join(__dirname, "dist"));
module.exports = {
    mode: isDebug ? 'development' : 'production',
    devtool: 'eval-source-map',
    entry: {
        "index": "./src/index.js"
    },
    output: {
        filename: '[name]_bundle.js',
        path:path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        historyApiFallback: true,
        inline: true,
        port: '9003'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "stage-0", "react", "env"
                        ],
                        "plugins": ["transform-object-rest-spread", "transform-decorators-legacy", "transform-class-properties",["import", { libraryName: "antd-mobile", style: "css" }]]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
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
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("yhyh copyRight"),
        // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/
        // )
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
}