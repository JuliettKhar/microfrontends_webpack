const {merge} = require('webpack-merge')

const commonConfig = require('./webpack.common')
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8083/'
    },
    devServer: {
        port: 8083,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederation({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './AuthApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
    ]
}

module.exports = merge(commonConfig, devConfig)
