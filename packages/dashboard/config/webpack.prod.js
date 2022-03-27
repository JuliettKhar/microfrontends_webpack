const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/dashboard/latest/'
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

module.exports = merge(commonConfig, prodConfig)
