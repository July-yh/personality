# 个人网站 / Personal Space

一个面向学术与项目展示的简约个人网站。页面位于 `dist/`，无需安装依赖。设计参考了 [jay-waves.cn](https://jay-waves.cn/) 的学术简历式布局，代码、图像和文案独立编写。

## 本地预览

在仓库根目录运行静态文件服务器并访问 `dist/`。例如：

```bash
python3 -m http.server 8765 --directory dist
```

## 更新个人资料

编辑 `dist/site-config.js` 中的姓名、介绍、研究方向、经历、写作、所在地、邮箱和 GitHub 用户名。留空的资料会在页面中显示为待补充；GitHub 用户名已设为 `July-yh`。

页面通过 [GitHub 公开 API](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user) 读取公开仓库，不需要令牌。GitHub 未响应时，页面会显示提示，其他内容仍可浏览。

## 部署

`.openai/hosting.json` 是 Sites 的部署配置，静态站点目录为 `dist/`。该仓库保存网站源码；GitHub 仓库的存在本身不会改变网站的访问权限。
