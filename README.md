# Yihong Zhao

Yihong Zhao 的个人网页/线上简历。中文版为 `dist/index.html`，英文版为 `dist/en/index.html`。采用简约学术主页布局，页面代码与文案独立编写。

## 本地预览

在仓库根目录运行静态文件服务器，访问 `/` 查看中文版、`/en/` 查看英文版。例如：

```bash
python3 -m http.server 8765 --directory dist
```

## 更新个人资料

直接编辑两份 HTML 页面即可更新资料。两页共用 `dist/styles.css`。头像位使用姓名缩写；页面展示学术邮箱和 GitHub 链接。

项目代码公开后，可把“研究与项目”中的项目标题改为指向对应 GitHub 仓库的链接。

## 部署

网站源文件在 `dist/`。GitHub Actions 工作流 `.github/workflows/deploy-pages.yml` 在每次推送到 `main` 后将该目录发布到 GitHub Pages。默认地址为 `https://july-yh.github.io/personality/`。

自有域名为 `july-yh.cn`，在仓库 Settings → Pages → Custom domain 中设置。域名 DNS 的 `@` 使用 GitHub Pages 的四条 A 记录，`www` 的 CNAME 指向 `July-yh.github.io`。域名和 HTTPS 生效后，中文版地址为 `https://july-yh.cn/`，英文版为 `https://july-yh.cn/en/`。`.openai/hosting.json` 保留原 Sites 站点配置。
