const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common')
const ModuleFederation = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port : 8082,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederation({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: packageJson.dependencies
        }),
    ]
}

module.exports = merge(commonConfig, devConfig)