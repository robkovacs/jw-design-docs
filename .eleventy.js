const cleanCSS = require("clean-css");
const eleventyNavigation = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyNavigation);
	eleventyConfig.addWatchTarget("./src/assets/css/");
	
	eleventyConfig.addFilter("json", JSON.stringify);
	
	eleventyConfig.addFilter("cssmin", function (code) {
		return new cleanCSS({level: 2}).minify(code).styles;
	});

	eleventyConfig.addPassthroughCopy("src/assets/img");

	return {
		dir: {
		  input: "src",
		  output: "dist"
		}
	  }
};