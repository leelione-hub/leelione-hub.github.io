#!/usr/bin/env node
/**
 * 博客一键部署脚本
 * 用法: node deploy.js ["提交信息"]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const commitMsg = process.argv[2] || '更新博客';

console.log('🚀 开始部署博客...\n');

try {
  // 1. 构建项目
  console.log('📦 步骤 1/4: 构建项目...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ 构建完成\n');

  // 2. 获取构建后的 JS 和 CSS 文件名
  console.log('📄 步骤 2/4: 更新入口文件...');
  const distAssetsDir = path.join(process.cwd(), 'dist', 'assets');
  const files = fs.readdirSync(distAssetsDir);
  
  const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
  
  if (!jsFile || !cssFile) {
    throw new Error('找不到构建后的资源文件');
  }
  
  // 3. 更新根目录 index.html
  const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Tech Blog</title>
    <script type="module" crossorigin src="./dist/assets/${jsFile}"></script>
    <link rel="stylesheet" crossorigin href="./dist/assets/${cssFile}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;
  
  fs.writeFileSync(path.join(process.cwd(), 'index.html'), htmlContent);
  console.log(`✅ 入口文件已更新: ${jsFile}\n`);

  // 4. Git 提交和推送
  console.log('📤 步骤 3/4: 提交更改...');
  execSync('git add index.html dist/', { stdio: 'ignore' });
  
  try {
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'ignore' });
    console.log(`✅ 已提交: "${commitMsg}"\n`);
  } catch (e) {
    console.log('⚠️ 没有需要提交的更改，或已是最新\n');
  }

  // 5. 推送到 GitHub
  console.log('📤 步骤 4/4: 推送到 GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  console.log('✅ 推送完成\n');

  console.log('🎉 部署成功！');
  console.log('⏳ 请等待 1-3 分钟后访问: https://leelione-hub.github.io');

} catch (error) {
  console.error('\n❌ 部署失败:', error.message);
  process.exit(1);
}
