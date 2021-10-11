# 搭建教程

## 安装

### 准备条件

- `Node.js` 最新版本

### 本地安装

- 安装 `webpack`

```shell
npm install --save-dev webpack
```

- 安装 `webpack-cli` 

```shell
npm install --save-dev webpack-cli
```

### 全局安装

- 可以全局安装，但一般项目都是本地安装

```shell
npm install --global webpack
npm install --global webpack-cli
```

## 起步

### webpack-cli 创建项目

- 初始化 `package.json` 文件

```shell
yarn init
```

- 安装包

```shell
yarn add webpack webpack-cli --dev
```

- 运行脚手架初始化项目 **[webpack-cli 配置说明地址](https://webpack.docschina.org/api/cli/)**

```shell
npx webpack-cli init

F:\study\code\font-test\webpack-test>npx webpack-cli init
? Which of the following JS solutions do you want to use? ES6
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Do you want to add PWA support? Yes
? Which of the following CSS solutions do you want to use? SASS
? Will you be using CSS styles along with SASS in your project? Yes
? Will you be using PostCSS in your project? Yes
? Do you want to extract CSS for every file? Yes
? Do you like to install prettier to format generated configuration? No
[webpack-cli] ℹ INFO  Initialising project...
 conflict package.json
? Overwrite package.json? overwrite
```

## 管理资源

### css 样式处理
- `style-loader`
- `css-loader`
- `postcss-loader`
- `sass-loader`

### 图片资源处理

```javascript
{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource'
}
```

### fonts 字体处理

`Asset Modules` 可以接收并加载任何文件，然后将其输出到构建目录。这就是说，我们可以将它们用于任何类型的文件，也包括字体。

```javascript
{
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource'
}
```

### 加载数据

类似于 `NodeJS`，`JSON` 支持实际上是内置的，也就是说 `import Data from './data.json'` 默认将正常运行。要导入 `CSV`、`TSV` 和 `XML`，你可以使用` csv-loader` 和 `xml-loader`。

```javascript
{
  test: /\.(csv|tsv)$/i,
  use: ['csv-loader']
},
{
  test: /\.xml$/i,
  use: ['xml-loader']
}
```

### 自定义 JSON 模块 parser

通过使用 自定义 `parser` 替代特定的 `webpack loader`，可以将任何 `toml`、`yaml` 或 `json5` 文件作为 `JSON` 模块导入。

```javascript
const toml = require('toml');
module.exports = {
  module: {
    rules: [
      {
        test: /\.toml/,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
    ],
  },
}
```

### 优势

这种配置方式会使你的代码更具备可移植性，无需依赖于含有全部资源的 /assets 目录，而是将资源与代码组合在一起使用。假如你想在另一个项目中使用 /my-component，只需将其复制或移动到 /components 目录下。

```
 |- /assets
 |– /components
 |  |– /my-component
 |  |  |– index.jsx
 |  |  |– index.css
 |  |  |– icon.svg
 |  |  |– img.png
```

## 管理输出

### 设置 HtmlWebpackPlugin

- HtmlWebpackPlugin 创建了一个全新的文件，所有的 bundle 会自动添加到 html 中
- [github 地址](https://github.com/jantimon/html-webpack-plugin)

### 清除 /dist 文件

```javascript
// webpack.config.js
output: {
  clean: true
}
```

## 开发环境

### source map 使用

- 为了更容易地追踪 error 和 warning，JavaScript 提供了 source maps 功能，可以将编译后的代码映射回原始源代码。**（不要用于生产环境）**

```javascript
// webpack.config.js
 module.exports = {
  devtool: 'inline-source-map',
 }
```

- [devtool 配置](https://webpack.docschina.org/configuration/devtool/)

### 开发工具

- watch mode (观察模式)

如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建。唯一的缺点是，为了看到修改后的实际效果，你需要刷新浏览器。

```json
{
  "scripts": {
    "watch": "webpack --watch"
   }
}
```


- webpack-dev-server

  - 提供一个基本的 web server，并且具有 live reloading(实时重新加载) 功能。
  - **Tip:** `webpack-dev-server` 会从 `output.path` 中定义的目录为服务提供 `bundle` 文件，即，文件将可以通过 `http://[devServer.host]:[devServer.port]/[output.publicPath]/[output.filename]` 进行访问。
  - [DevServer配置](https://webpack.docschina.org/configuration/dev-server/)
  - 模块热替换(hot module replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新所有类型的模块，而无需完全刷新。

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    hot: true
  }
}
```

- webpack-dev-middleware

webpack-dev-middleware 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。webpack-dev-server 在内部使用了它，然而它也可以作为一个单独的 package 来使用，以便根据需求进行更多自定义设置。

```javascript
// server.js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
)

// 将文件 serve 到 port 3000。
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
```

## 代码分离

### 入口起点

这是迄今为止最简单直观的分离代码的方式。但这种方式存在一些隐患：
- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

```javascript
// webpack.config.js
// for example
 module.exports = {
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
  },
   output: {
    filename: '[name].bundle.js'
   }
 }
```

### 防止重复

- SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
- [SplitChunksPlugin配置](https://webpack.docschina.org/plugins/split-chunks-plugin/)

```javascript
  module.exports = {
   optimization: {
     splitChunks: {
       chunks: 'all'
     }
   }
  }
```

### 动态导入

### 预获取/预加载模块(prefetch/preload module)

- 在声明 import 时，使用下面这些内置指令，可以让 `webpack` 输出 `"resource hint(资源提示)"`，来告知浏览器：
  + `prefetch`(预获取)：将来某些导航下可能需要的资源
  + `preload`(预加载)：当前导航下可能需要资源

- 与 `prefetch` 指令相比，`preload` 指令有许多不同之处：
  + `preload chunk` 会在父 `chunk` 加载时，以并行方式开始加载。`prefetch chunk` 会在父 `chunk` 加载结束后开始加载。
  + `preload chunk` 具有中等优先级，并立即下载。`prefetch chunk` 在浏览器闲置时下载。
  + `preload chunk` 会在父 `chunk` 中立即请求，用于当下时刻。`prefetch chunk` 会用于未来的某个时刻。
  + 浏览器支持程度不同。

```javascript
import(/* webpackPrefetch: true */ './path/to/LoginModal.js')
import(/* webpackPreload: true */ 'ChartingLibrary')
```

### bundle 分析(bundle analysis)

- 一旦开始分离代码，一件很有帮助的事情是，分析输出结果来检查模块在何处结束。

## 懒加载

- 懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。


## 缓存

浏览器使用一种名为 缓存 的技术。可以通过命中缓存，以降低网络流量，使网站加载速度更快，然而，如果我们在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很棘手。

### 输出文件的文件名(output filename)

通过替换 output.filename 中的 substitutions 设置，来定义输出文件的名称。[contenthash] substitution 将根据资源内容创建出唯一 hash。当资源内容发生变化时，[contenthash] 也会发生变化。

```javascript
  module.exports = {
    output: {
     filename: '[name].[contenthash].js',
    },
  };
```

### * 提取引导模板(extracting boilerplate)

- webpack 还提供了一个优化功能，可使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle

```javascript
  module.exports = {
     optimization: {
       runtimeChunk: 'single',
   },
  };
```

- 推荐将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中。因为通过实现以上步骤，利用 client 的长效缓存机制，命中缓存来消除请求，并减少向 server 获取资源，同时还能保证 client 代码和 server 代码版本一致。

```javascript
  module.exports = {
     optimization: {
       moduleIds: 'deterministic', // 因为每个 module.id 会默认地基于解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。可通过次配置修复。
       runtimeChunk: 'single',
       splitChunks: {
           cacheGroups: {
             vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: 'vendors',
               chunks: 'all',
             },
           },
     },
   },
  };
```

## 创建 library

除了打包应用程序，webpack 还可以用于打包 JavaScript library。

