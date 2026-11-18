# Yihong Zhao

Yihong Zhao 的个人网页/线上简历。中文版为 `dist/index.html`，英文版为 `dist/en/index.html`。采用简约学术主页布局，页面代码与文案独立编写。

## 本地预览

在仓库根目录运行静态文件服务器，访问 `/` 查看中文版、`/en/` 查看英文版。例如：

```bash
python3 -m http.server 8765 --directory dist
```

## 更新个人资料

直接编辑两份 HTML 页面即可更新资料。两页共用 `dist/styles.css`。头像位使用姓名缩写；页面展示学术邮箱和 GitHub 链接。

## 部署

`.openai/hosting.json` 是 Sites 的部署配置，静态站点目录为 `dist/`。该仓库保存网站源码；网站的公开访问权限在 Sites 中单独设置。
