module.exports = function (eleventyConfig){
/* Allows 11ty to recognize files outside of index.md | Must specifiy each file/folder you want read*/
eleventyConfig.addPassthroughCopy("_src/_includes/");
eleventyConfig.addPassthroughCopy("./_src/css/"); // passing in css folder
eleventyConfig.addPassthroughCopy("./_src/images/"); // passing in img folder


return{
        dir: {
            input: "_src",
            output: "_site"
        },
      };
};
