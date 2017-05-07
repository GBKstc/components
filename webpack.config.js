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
	}
};