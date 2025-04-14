import { useState, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeBlock = ({
  code = "",
  language = "javascript",
  showLineNumbers = true,
  style = atomOneDark,
  copyable = true,
  customStyle = {}
}) => {
  const [copied, setCopied] = useState(false);

  // 复制功能处理
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div style={{ position: 'relative', ...customStyle }}>
      {copyable && (
        <button
          onClick={handleCopy}
          style={{
            position: 'absolute',
            right: '10px',
            top: '10px',
            cursor: 'pointer',
            background: 'none',
            border: '1px solid #666',
            borderRadius: '4px',
            color: '#fff',
            padding: '4px 8px'
          }}
        >
          {copied ? '✅ 已复制' : '📋 复制'}
        </button>
      )}

      <SyntaxHighlighter
        language={language}
        style={style}
        showLineNumbers={showLineNumbers}
        customStyle={{
          padding: '20px',
          borderRadius: '8px',
          margin: '0',
          backgroundColor: style === docco ? '#f8f8f8' : '#282c34',
          ...customStyle
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;