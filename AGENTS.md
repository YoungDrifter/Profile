# AGENTS.md

本项目是一个基于 Astro 的个人学术主页，构建结果为静态网站。网站当前主要入口是 `/profile/`，根路径 `/` 会自动跳转到 `/profile/`。内容以中英双语展示，页面文本大多集中维护在 `src/data/profile.ts`。

## 项目结构

```text
.
├── .github/
├── public/
│   ├── files/
│   └── images/
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   │   └── profile/
│   └── styles/
├── astro.config.mjs
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 根目录文件

- `package.json`：项目脚本和依赖声明。常用脚本包括 `npm run dev` 本地预览、`npm run build` 构建静态站点、`npm run check` 做 Astro/TypeScript 检查。
- `package-lock.json`：锁定 npm 依赖版本，保证不同环境安装结果一致。
- `astro.config.mjs`：Astro 配置。当前设置站点地址为 `https://yuhangyang.site`，输出模式为静态站点，并启用 sitemap。
- `tsconfig.json`：TypeScript 配置，继承 Astro strict 配置。
- `.gitignore`：忽略依赖、构建产物、缓存、环境变量和日志文件。
- `AGENTS.md`：给后续维护者或自动化代理阅读的项目说明文件。

## `.github/`

GitHub 自动化配置目录。

- `.github/workflows/deploy_to_pages.yml`：GitHub Pages 部署流程。推送到 `main` 分支后，会安装依赖、执行 `npm run build`，然后把 `dist/` 部署到 GitHub Pages。

## `public/`

静态资源目录。这里的文件会按原路径直接暴露到网站根路径下，不需要 import。

- `public/favicon.svg`：浏览器标签页图标，对应网页中的 `/favicon.svg`。
- `public/CNAME`：自定义域名配置，用于 GitHub Pages 绑定域名。
- `public/images/`：图片资源目录。
  - `public/images/avatar.png`：侧栏头像，对应 `profile.avatar` 中的 `/images/avatar.png`。
- `public/files/`：可下载文件目录。
  - `public/files/cv.pdf`：简历 PDF，对应侧栏的 “Download CV / 下载简历” 按钮。

## `src/`

网站源码目录，页面、布局、组件、数据和全局样式都在这里。

### `src/pages/`

Astro 的文件路由目录，文件路径决定网站 URL。

- `src/pages/index.astro`：网站根路径 `/`。当前只负责跳转到 `/profile/`，并提供一个备用链接。
- `src/pages/profile/index.astro`：个人主页主页面，对应 `/profile/`。它负责组织页面结构，包括顶部锚点导航和正文各区块：
  - About / 关于
  - Education / 教育
  - Internships / 实习
  - Projects / 项目
  - Publications / 论文
  - Competitions / 竞赛经历
  - Honors / 荣誉奖项

这个页面从 `src/data/profile.ts` 读取 `profile`、`education`、`internships`、`projects`、`publications`、`competitions`、`honors` 等数据，然后渲染成时间线、卡片和列表。若要调整页面区块顺序、增加新区块、修改导航锚点，主要改这里。

### `src/data/`

结构化内容数据目录。

- `src/data/profile.ts`：网站的主要内容来源。包含个人信息、联系方式、社交链接、研究兴趣、教育经历、实习经历、获奖、项目和论文。大多数文案都用 `{ en, zh }` 的形式维护中英双语。

常见修改入口：

- 改姓名、邮箱、头像路径、CV 路径：修改 `profile`。
- 改侧栏社交链接：修改 `profile.socials`。
- 改 About 文案：修改 `profile.intro`。
- 改兴趣标签：修改 `profile.interests`。
- 改教育经历：修改 `education`。
- 改实习经历：修改 `internships`。
- 改项目展示：修改 `projects`。
- 改论文展示：修改 `publications`。
- 改竞赛展示：修改 `competitions`。
- 改荣誉奖项展示：修改 `honors`。

### `src/components/`

可复用页面组件目录。

- `src/components/Sidebar.astro`：左侧个人信息栏。负责显示头像、姓名、身份说明、地点、邮箱、在读时间、社交链接、语言切换按钮和 CV 下载按钮。

这个组件会读取 `src/data/profile.ts` 里的 `profile` 数据。社交图标来自 `simple-icons`，会根据链接域名选择 GitHub、X、Zhihu、Xiaohongshu 等图标。

### `src/layouts/`

页面外壳和通用 HTML 结构目录。

- `src/layouts/BaseLayout.astro`：全站基础布局。负责引入全局样式、设置 `<head>` 元信息、加载 Google Fonts，并提供 `<slot />` 承载具体页面内容。

它还包含少量内联脚本，负责：

- 读取和保存语言选择到 `localStorage`。
- 根据 `data-locale="en"` / `data-locale="zh"` 切换中英文显示。
- 控制顶部导航的当前区块高亮。
- 点击顶部导航时在主内容滚动容器内平滑滚动。

### `src/styles/`

全局样式目录。

- `src/styles/global.css`：网站全部主要视觉样式。包含颜色变量、字体、布局、侧栏、顶部导航、正文区块、时间线、项目/论文卡片、竞赛/荣誉列表，以及移动端响应式规则。

样式大致对应：

- `.shell`：整页两栏布局。
- `.sidebar` 及 `.s-*`：左侧个人信息栏。
- `.main`：右侧主滚动区域。
- `.topnav` / `.tnav-link`：顶部区块导航。
- `.body` / `.sec` / `.sec-h`：正文容器和区块标题。
- `.tl-*`：教育和实习时间线。
- `.pub-*`：项目和论文卡片。
- `.award-*`：竞赛和荣誉奖项列表。
- `@media (max-width: 860px)` 和 `@media (max-width: 440px)`：移动端布局。

### 其他 `src` 文件

- `src/env.d.ts`：Astro 类型引用文件，通常不需要手动修改。

## 内容与页面的对应关系

- 网站标题和 SEO 描述：`src/pages/profile/index.astro` 传给 `BaseLayout`，内容来自 `profile.name` 和 `profile.intro.en`。
- 侧栏头像、姓名、邮箱、地点、社交链接、CV：`src/components/Sidebar.astro` 渲染，数据来自 `src/data/profile.ts`。
- 顶部导航文字和锚点：`src/pages/profile/index.astro` 的 `navItems`。
- 正文所有主要履历内容：`src/pages/profile/index.astro` 渲染，数据来自 `src/data/profile.ts`。
- 中英切换：HTML 中同时写入 `data-locale="en"` 和 `data-locale="zh"`，由 `BaseLayout.astro` 的脚本与 `global.css` 的显示规则控制。

## 开发和检查

常用命令：

```bash
npm run dev
npm run check
npm run build
npm run preview
```

建议修改流程：

1. 如果只是更新履历内容，优先改 `src/data/profile.ts`。
2. 如果要增加或重排页面区块，改 `src/pages/profile/index.astro`，并同步检查 `navItems`。
3. 如果要调整侧栏信息结构，改 `src/components/Sidebar.astro`。
4. 如果要调整视觉样式或响应式表现，改 `src/styles/global.css`。
5. 修改后运行 `npm run check` 和 `npm run build`，确认类型检查和静态构建通过。

## 任务完成与交付要求

- 每完成一个任务，都必须使用 Git 提交本次改动，并将提交推送到 GitHub；除非用户另有说明，否则直接提交并推送到当前分支。
- 提交前必须运行与改动相关的检查；网站代码变更默认运行 `npm run check` 和 `npm run build`。
- 推送前必须启动本地部署预览（优先使用 `npm run preview` 预览构建产物），并确认页面能够正常访问。
- 任务交付时必须向用户提供本地预览地址，保留预览进程供用户检验查收，并说明提交哈希、推送分支和检查结果。
- 如果受权限、依赖、端口或网络等环境问题影响，无法完成提交、推送或本地预览，必须明确说明阻塞原因，不能把未完成的步骤报告为已完成。

## 维护注意事项

- 新增双语内容时，尽量保持 `{ en, zh }` 结构一致。
- 新增页面区块时，需要同时考虑顶部导航、锚点 `id`、中英文本和移动端样式。
- `public/` 中资源路径以网站根路径引用，例如 `public/images/avatar.png` 在代码里写作 `/images/avatar.png`。
- `src/pages/index.astro` 当前是跳转页。如果未来要把首页改成独立页面，需要调整这里。
- 部署依赖 GitHub Pages workflow。推送到 `main` 后会自动构建并部署。
