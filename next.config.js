const path = require('path')

module.exports = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            },
        },{
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        });

        return config;
    }
};

module.exports = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}
