const cleanCSS = require("clean-css");
const htmlmin = require("html-minifier");
const eleventyNavigation = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(eleventyNavigation);
	eleventyConfig.addWatchTarget("./src/assets/css/");
	eleventyConfig.addWatchTarget("./src/assets/js/");
	
	eleventyConfig.addFilter("json", JSON.stringify);

	eleventyConfig.addFilter("cssmin", function (code) {
		return new cleanCSS({level: 2}).minify(code).styles;
	});

	eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
		if (outputPath.endsWith(".html")) {
		  return htmlmin.minify(content, {
			collapseWhitespace: true,
			removeComments: true,  
			useShortDoctype: true,
		  });
		}
	
		return content;
	  });

	eleventyConfig.addPassthroughCopy("src/assets/img");
	eleventyConfig.addPassthroughCopy("src/assets/js");

	return {
		dir: {
		  input: "src",
		  output: "dist"
		}
	}
};