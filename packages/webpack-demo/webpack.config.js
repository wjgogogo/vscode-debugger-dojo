const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 在这里设置断点 - Webpack 配置加载
console.log("⚙️ 加载 Webpack 配置...");

// 自定义 Plugin 示例
class CustomPlugin {
  apply(compiler) {
    // 在这里设置断点 - Plugin apply 方法
    console.log("🔌 CustomPlugin 已注册");

    compiler.hooks.compilation.tap("CustomPlugin", (compilation) => {
      // 在这里设置断点 - 编译开始
      console.log("📦 开始编译...");
    });

    compiler.hooks.emit.tapAsync("CustomPlugin", (compilation, callback) => {
      // 在这里设置断点 - 生成文件前
      console.log("📝 准备输出文件...");

      // 在这里设置断点 - 遍历生成的资源
      Object.keys(compilation.assets).forEach((filename) => {
        console.log(`  - ${filename}`);
      });

      callback();
    });

    compiler.hooks.done.tap("CustomPlugin", (stats) => {
      // 在这里设置断点 - 编译完成
      const time = stats.endTime - stats.startTime;
      console.log(`✅ 编译完成，耗时: ${time}ms`);
    });
  }
}

// 在这里设置断点 - 导出配置函数
module.exports = (env, argv) => {
  const isDevelopment = argv.mode === "development";

  // 在这里设置断点 - 查看环境和参数
  console.log("Environment:", env);
  console.log("Mode:", argv.mode);

  // 在这里设置断点 - 配置对象构建
  const config = {
    mode: "development",

    entry: "./src/index.ts",

    output: {
      filename: isDevelopment ? "[name].js" : "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
    },

    module: {
      rules: [
        // 在这里设置断点 - TypeScript loader 配置
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        // 在这里设置断点 - CSS loader 配置
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },

    plugins: [
      // 在这里设置断点 - HtmlWebpackPlugin 配置
      new HtmlWebpackPlugin({
        title: "Webpack 调试示例",
        template: path.resolve(__dirname, "src/index.html"),
      }),
      // 在这里设置断点 - 自定义 Plugin
      new CustomPlugin(),
    ],

    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
      hot: true,
    },

    // 在这里设置断点 - Source Map 配置
    devtool: isDevelopment ? "eval-source-map" : "source-map",

    // 在这里设置断点 - 优化配置
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };

  // 在这里设置断点 - 返回最终配置
  console.log("📋 Webpack 配置已生成");
  return config;
};
