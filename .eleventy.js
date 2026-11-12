const esbuild = require("esbuild");
module.exports = function (eleventyConfig){
/* Allows 11ty to recognize files outside of index.md | Must specifiy each file/folder you want read*/
eleventyConfig.addPassthroughCopy("./_src/threed-images/");
eleventyConfig.addPassthroughCopy("_src/_includes/");
eleventyConfig.addPassthroughCopy("./_src/css/"); // passing in css folder
eleventyConfig.addPassthroughCopy("./_src/img/"); // passing in img folder
eleventyConfig.addPassthroughCopy({
    "node_modules/@11ty/is-land/is-land.js": "js/is-land.js",
    "node_modules/petite-vue/dist/petite-vue.es.js": "js/petite-vue.js",
    "_src/gallery.js": "js/gallery.js"
})

// Bundle three.js before every 11ty build
eleventyConfig.on("eleventy.before", async () => {
   await esbuild.build({
        entryPoints: ["_src/threeScene.js"],
        bundle: true,
        minify: true,
        format: "esm",
        outdir: "_site/js",
        sourcemap: true,
    });
});

 return{
        dir: {
            input: "_src",
            output: "_site"
        },
      };
};
