module.exports = {
  presets: [
    [
      "@babel/preset-env", // js 语法转换
      {
        useBuiltIns: "usage", // 根据 browserslist 配置进行已使用的api补齐
        corejs: 3, // api补齐
        modules: false
      },
    ],
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime", // 配合 @babel/runtime 抽离 语法转换使用到的内联辅助函数
      // {
      //   corejs: 3,
      //   useESModules: true
      // }
    ]
  ],
};
