const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: ["webpack/hot/poll?100", './index.ts'],
    watch: true,
    target: "node",
    externals: [
        nodeExternals({
            allowlist: ["webpack/hot/poll?100"]
        })
    ],
    mode: "development",
    resolve: {
        extensions: ['.ts', ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` extension will be handled by `ts-loader`
            {test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/}
        ]
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
};
