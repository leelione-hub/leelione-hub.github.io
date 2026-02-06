import type { PostMeta, Post } from '@/types/blog';

// 文章数据 - 在这里添加你的博客文章
export const posts: Post[] = [
  {
    id: '1',
    title: '搭建我的个人技术博客',
    subtitle: '使用 React + Vite + GitHub Pages',
    date: '2026-02-05',
    author: 'leelione',
    tags: ['React', 'Vite', 'GitHub Pages', '教程'],
    excerpt: '本文介绍如何使用 React + Vite + Tailwind CSS 搭建一个简洁优雅的个人技术博客，并部署到 GitHub Pages。',
    slug: 'build-tech-blog',
    content: `
## 前言

搭建个人技术博客是程序员记录学习、分享经验的好方式。本文将介绍如何使用现代前端技术栈搭建一个简洁优雅的技术博客。

## 技术栈

- **React** - 前端框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **GitHub Pages** - 免费托管

## 开始搭建

### 1. 创建项目

使用 Vite 创建 React + TypeScript 项目：

\`\`\`bash
npm create vite@latest my-blog -- --template react-ts
\`\`\`

### 2. 安装依赖

\`\`\`bash
cd my-blog
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

### 3. 配置 Tailwind

\`\`\`javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

### 4. 添加样式

\`\`\`css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## 部署到 GitHub Pages

\`\`\`bash
npm run build
npm run deploy
\`\`\`

## 总结

现在你已经拥有了一个简洁优雅的个人技术博客！
    `
  }
];

// 获取所有文章元数据（不含内容）
export function getAllPostsMeta(): PostMeta[] {
  return posts.map(({ content, ...meta }) => meta);
}

// 根据 slug 获取文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

// 获取所有标签
export function getAllTags(): string[] {
  const tags = new Set<string>();
  posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
}

// 根据标签筛选文章
export function getPostsByTag(tag: string): PostMeta[] {
  return posts
    .filter(post => post.tags.includes(tag))
    .map(({ content, ...meta }) => meta);
}

// 按日期排序的文章
export function getSortedPosts(): PostMeta[] {
  return getAllPostsMeta().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
