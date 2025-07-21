# ai-website

本项目用于根据用户提供的 UI 截图和需求描述，自动生成可交互的 Web 单页面应用。

## 项目目标
- 支持多种不同需求的单页面前端程序生成
- 每个需求可生成独立的单页面应用，互不影响，便于管理和扩展
- 便于快速迭代和扩展

## 技术栈建议
- React + Vite（推荐，启动快，配置简单）
- 也可根据需求选择 Vue、Svelte 等

## 开发准备
1. 安装 Node.js（建议 16.x 及以上）
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动开发服务器：
   ```bash
   npm run dev
   ```

## 目录结构建议
- `src/`：源代码目录
- `public/`：静态资源
- `README.md`：项目说明
- `.gitignore`：Git 忽略文件

## 远程仓库
- git@github.com:soeric/ai-website.git

---
如需生成页面，请提供 UI 截图和需求描述。 