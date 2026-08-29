# Yuhang Yang · 个人学术主页

基于 [Astro](https://astro.build) 构建的个人学术主页，构建产物为静态网站，部署在 GitHub Pages，自定义域名为 <https://yuhangyang.site>。页面内容以中英双语展示，全部正文数据集中维护在 `src/data/profile.ts`。

## 特性

- 中英双语内容与一键切换，语言偏好保存在 `localStorage`
- 完整学术履历展示：关于、技术能力、教育、实习、项目、论文、竞赛、荣誉
- 响应式布局，桌面端与移动端均有区块导航
- 自动生成 sitemap 与 SEO 元信息
- 简历以 XeLaTeX 源码维护，随项目一起版本化管理

## 技术栈

- [Astro](https://astro.build) 5（静态输出）
- TypeScript
- [simple-icons](https://simpleicons.org)（社交图标）
- XeLaTeX（简历排版）

## 快速开始

```bash
npm install     # 安装依赖
npm run dev     # 本地开发预览（默认 http://localhost:4321）
```

## 构建与检查

```bash
npm run build   # 构建静态站点到 dist/
npm run preview # 本地预览构建产物
npm run check   # Astro / TypeScript 类型检查
```

## 目录结构

```text
.
├── .github/workflows/   # GitHub Pages 自动部署流程
├── public/
│   ├── cv/              # 简历 XeLaTeX 源码与编译产物
│   ├── files/           # 可下载文件（如项目报告）
│   ├── images/          # 图片资源（头像等）
│   ├── CNAME            # 自定义域名配置
│   └── favicon.svg
├── src/
│   ├── components/      # 页面组件（ProfilePage、Sidebar）
│   ├── data/            # 结构化内容数据（profile.ts）
│   ├── layouts/         # 基础布局（BaseLayout）
│   ├── pages/           # 路由页面（根路径 /）
│   └── styles/          # 全局样式（global.css）
├── astro.config.mjs
└── package.json
```

## 内容维护

网站的正文内容（个人信息、教育经历、项目、论文等）全部维护在 `src/data/profile.ts`，文案以 `{ en, zh }` 双语结构存放。

| 想修改的内容 | 修改位置 |
| --- | --- |
| 姓名、邮箱、头像、CV、社交链接、About 文案、兴趣标签 | `src/data/profile.ts` 的 `profile` |
| 教育 / 实习经历 | `src/data/profile.ts` 的 `education` / `internships` |
| 技术能力 | `src/data/profile.ts` 的 `technicalSkills` |
| 项目 / 论文 | `src/data/profile.ts` 的 `projects` / `publications` |
| 竞赛 / 荣誉 | `src/data/profile.ts` 的 `competitions` / `honors` |
| 页面区块顺序、导航锚点 | `src/components/ProfilePage.astro`（`navItems`） |
| 侧栏信息结构 | `src/components/Sidebar.astro` |
| 视觉样式与响应式 | `src/styles/global.css` |

修改履历内容后运行 `npm run check` 与 `npm run build` 确认无误。

## 简历

简历源码位于 `public/cv/`，使用 XeLaTeX 编译：

```bash
cd public/cv
latexmk -xelatex -gg -interaction=nonstopmode -halt-on-error yuhang_yang_cv.tex
```

编译产物 `yuhang_yang_cv.pdf` 即侧栏 “Download CV / 下载简历” 按钮指向的文件。

## 部署

推送到 `main` 分支后，GitHub Actions 工作流（`.github/workflows/deploy_to_pages.yml`）会自动安装依赖、执行 `npm run build`，并将 `dist/` 部署到 GitHub Pages；`public/CNAME` 用于绑定自定义域名。
