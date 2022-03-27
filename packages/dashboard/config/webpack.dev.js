const {merge} = require('webpack-merge')

const commonConfig = require('./webpack.common')
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8084/'
    },
    devServer: {
        port: 8084,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [
        new ModuleFederation({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
        }),
    ]
}

module.exports = merge(commonConfig, devConfig)
