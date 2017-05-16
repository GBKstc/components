/**
 * Created by Administrator on 2017/5/7.
 */
var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, 'app/app.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	module:{
		loaders:[
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react'],
					plugins: [
						["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
					]
				}
			}
		],
	}
};