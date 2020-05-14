let webpack = require("webpack");
let path = require('path');
let MFS = require("memory-fs");
var requireFromString = require("require-from-string");
let mfs = new MFS();
class SkeletonPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let { webpackConfig } = this.options;
    compiler.hooks.compilation.tap("SkeletonPlugin", compilation => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        "SkeletonPlugin",
        (htmlPluginData, callback) => {
          let outputPath = path.join(webpackConfig.output.path,webpackConfig.output.filename);
          let childCompiler = webpack(webpackConfig);
          childCompiler.outputFileSystem = mfs;
          childCompiler.run((err, stats) => {
            let skeleton= mfs.readFileSync(outputPath, "utf8");
            let skeletonHtml = requireFromString(skeleton);
            if (skeletonHtml.default) {
              skeletonHtml = skeletonHtml.default;
            }
            htmlPluginData.html=htmlPluginData.html.replace(`<div id="root"></div>`,`<div id="root">${skeletonHtml}</div>`);
            callback(null, htmlPluginData);
          });
        }
      );
    });
  }
}
module.exports = SkeletonPlugin;