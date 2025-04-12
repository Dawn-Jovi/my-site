import React, { useState, useEffect } from 'react';
import './heatmap.css'

const generateContributionsData = () => {
  const data = {};
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split('T')[0];
    data[key] = Math.floor(Math.random() * 4); // 0-3
  }
  return data;
};

const ContributionGrid = () => {
  // 存储贡献度数据
  const [data, setData] = useState({});
  // 工具提示状态
  const [tooltip, setTooltip] = useState({ 
    visible: false, 
    content: '', 
    x: 0, 
    y: 0,
    level: 0 
  });

  // 工具提示状态
  useEffect(() => {
    setData(generateContributionsData());
  }, []);

  // 鼠标进入单元格事件处理
  const handleMouseEnter = (e, date, level) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      // 格式化日期
      content: date.toLocaleDateString(),
      x: rect.left + window.scrollX + rect.width / 2, // 中心位置
      y: rect.top + window.scrollY - 100, // 正上方
      level,
      cellRect: rect // 保存单元格位置信息
    });
  };

  // 鼠标离开单元格事件处理
  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // 渲染热力图单元格
  const renderCells = () => {
    const cells = [];
    const today = new Date();
    let x = (52 - 1) * 14;

    // 渲染热力图单元格
    for (let week = 0; week < 53; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(today);
        // 计算具体日期（倒序）
        date.setDate(date.getDate() - (week * 7 + day));
        const dateString = date.toISOString().split('T')[0];
        const level = data[dateString] || 0;

        cells.push(
          <rect
            key={dateString}
            className={`day-cell level-${level}`}
            width="10"
            height="10"
            x={x}
            y={day * 14}
            data-date={dateString}
            data-level={level}
            onMouseEnter={(e) => handleMouseEnter(e, date, level)}
            onMouseLeave={handleMouseLeave}
          />
        );
      }
      x -= 14;
    }
    return cells;
  };

  // 根据活跃度获取不同的表情符号
  const getEmoji = (level) => {
    const emojis = ['😴', '😊', '😃', '🤩'];
    return emojis[level] || '❓';
  };

  

  return (
    <div className="contribution-grid-container">
      <svg 
        width="100%"
        viewBox="0 0 728 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderCells()}
      </svg>

      {tooltip.visible && (
        <div 
          className="tooltip anime-tooltip"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%)', // 居中定位
            '--accent-color': ['#ff9db5', '#ffb876', '#ffde59', '#8bff8b'][tooltip.level]
          }}
        >
          <div className="tooltip-header">
            <span className="tooltip-emoji">{getEmoji(tooltip.level)}</span>
            <span className="tooltip-date">{tooltip.content}</span>
          </div>
          <div className="tooltip-body">
            活跃度: <span className="level-indicator">{'★'.repeat(tooltip.level + 1)}</span>
          </div>
          <div 
            className="tooltip-tail"
            style={{
              left: '50%'
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ContributionGrid;