const CleanCSS = require("clean-css");
module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter("cssmin", function (code) {
		return new CleanCSS({level: 2}).minify(code).styles;
	});
};