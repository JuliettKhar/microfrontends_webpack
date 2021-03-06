const {merge} = require('webpack-merge')

const commonConfig = require('./webpack.common')
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8081/'
    },
    devServer: {
        port: 8081,
        historyApiFallback: true
    },
    plugins: [
        new ModuleFederation({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
    ]
}

module.exports = merge(commonConfig, devConfig)
