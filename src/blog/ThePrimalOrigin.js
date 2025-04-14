import CodeBlock from '../CodeBlock';
import './1.css'

const ThePrimalOrigin = {
  id: '0000-00-00 00:00',
  title: '从零到一：我用React+Node.js搭建个人技术博客的全过程',
  path:'https://github.com/Dawn-Jovi/my-site',
  essay: (
    <>
      <h1>📌 写在前面</h1>
      <p className="TPO-p">
        &nbsp;&nbsp;&nbsp;作为开发者，搭建个人网站是展示技术能力和沉淀知识的最佳方式。经过2周的开发迭代，我的全栈个人网站v1.0终于上线！本文将完整复盘技术选型、开发过程和踩坑经验。
      </p>
      <h2>🛠 技术栈全景</h2>
      <p>前端架构：</p>
      <li>React 18 + TypeScript</li>
      <li>react-router-dom v6 路由管理</li>
      <li>Markdown渲染方案：remark + rehype-sanitize</li>
      <li>UI库：自制组件库（[GitHub链接]）</li>
      <p>服务端架构：</p>
      <li>Node.js 18 + Express 4</li>
      <li>文件系统存储Markdown文档</li>
      <li>自定义缓存中间件</li>
      <h4>💡 核心实现解析</h4>
      <CodeBlock
        code={`
          function add(a, b) {
            return a + b;
          }
        `}
        language="javascript"
        showLineNumbers={false}
        customStyle={{ 
          margin: '20px 0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      />
      <h5>🚀 未来规划</h5>
      <li>增加文章搜索功能（ElasticSearch集成）</li>
      <li>实现代码片段在线运行（React Live组件）</li>
      <li>构建自动化部署流水线（GitHub Actions）</li>
      <h6>💬 写在最后</h6>
      <p>这个项目不仅是我技术实践的试验场，更将成为知识沉淀的输出平台。欢迎访问<a href='https://github.com/Dawn-Jovi/my-site/issues'>[项目GitHub仓库]</a>提交Issue讨论技术细节，也期待在评论区看到你的建议！</p>
    </>
  )
};

export default ThePrimalOrigin;