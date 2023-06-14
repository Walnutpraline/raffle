module.exports = {
  // 部署生产环境和开发环境下的URL,baseUrl 从 Vue CLI 3.3 起已弃用，请使用publicPath
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "states",
};
