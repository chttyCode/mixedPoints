const base = require('./webpack.base')
const { smart } = require('webpack-merge')
const path = require('path')
const { SkeletonPlugin } = require('../skeleton_plugin')

module.exports = env => {
  const baseconfig = base(env)
  console.log(process.cwd())
  const skeletonconfig = {
    context: process.cwd(),
    entry: "./src/skeleton.tsx",
    output: {
      filename: "skeleton.js",
      path: path.resolve(__dirname, "../skeleton")
    },
    plugins: [
      new SkeletonPlugin({
        webpackconfig: {
          entry: "./src/skeleton.tsx",
          output: {
            filename: "skeleton.js",
            path: path.resolve(__dirname, "../skeleton")
          },
        }
      })
    ]
  }
  return smart(baseconfig, skeletonconfig)
}