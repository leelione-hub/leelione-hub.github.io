import { Github, Mail, Globe, Code2 } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          关于我
        </h1>
        <p className="text-gray-600">
          May all the beauty be blessed
        </p>
      </section>

      {/* Profile */}
      <section className="bg-white rounded-lg border border-gray-100 p-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar Placeholder */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
            Y
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your Name
          </h2>
          <p className="text-gray-500 mb-6">
            前端开发工程师 / 技术爱好者
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:your.email@example.com"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://your-website.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white rounded-lg border border-gray-100 p-8">
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">个人简介</h3>
        </div>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            你好！我是一名热爱技术的前端开发工程师。我喜欢探索新技术，分享学习心得，
            并通过写作来整理和巩固自己的知识体系。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            这个博客是我记录技术成长的地方，内容涵盖前端开发、React 生态、TypeScript、
            性能优化等话题。希望我的文章能对你有所帮助！
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white rounded-lg border border-gray-100 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">技术栈</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'React', 'TypeScript', 'Vue', 'Node.js', 'Tailwind CSS',
            'Next.js', 'Vite', 'Webpack', 'Git', 'Docker'
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Friends */}
      <section className="bg-white rounded-lg border border-gray-100 p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">友情链接</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'GitHub', url: 'https://github.com' },
            { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
            { name: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
            { name: 'React 官方文档', url: 'https://react.dev' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <span className="font-medium">{link.name}</span>
              <span className="text-gray-400">→</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
