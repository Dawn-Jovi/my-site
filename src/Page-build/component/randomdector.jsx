import React, { useState } from 'react';


function RandomDecor() {
  // 自动导入 ./randomImg 目录下的所有图片
  const importAll = (context) => context.keys().map(context);
  const decorImages = importAll(require.context('./randomImg', true, /\.(png|jpe?g|svg)$/));

  // 初始化装饰元素数组
  const [decorItems] = useState(() => {
    const decorCount = 20; //元素数量
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return Array.from({ length: decorCount }, (_, i) => ({
      id: i,
      src: decorImages[Math.floor(Math.random() * decorImages.length)],
      // 水平和垂直位置
      left: Math.random() * (viewportWidth + 200) - 100,
      top: Math.random() * (viewportHeight + 200) - 100,
      // 元素大小(30px到120px之间)
      size: 60 + Math.random() * 90,
      // 旋转角度(-15deg到15deg)
      rotation: Math.random() * 30 - 15,
      // 动画持续+延迟时间
      animationDuration: 6 + Math.random() * 4,
      animationDelay: Math.random() * 2
    }));
  });

  return (
    <>
      {/* 遍历装饰元素数组并渲染每个元素 */}
      {decorItems.map(item => (
        <img
          key={item.id} // 必须的唯一key
          className="anime-decor" // 应用CSS类名
          src={item.src} // 图片源
          alt="二次元装饰元素" // 无障碍文本
          style={{
            position: 'fixed', // 固定定位（相对于视口）
            left: `${item.left}px`, // 水平位置
            top: `${item.top}px`, // 垂直位置
            width: `${item.size}px`, // 元素宽度
            transform: `rotate(${item.rotation}deg)`, // 旋转效果
            // 浮动动画：持续时间 + 无限循环 + 延迟
            animation: `float ${item.animationDuration}s ease-in-out infinite ${item.animationDelay}s`
          }}
        />
      ))}
    </>
  );
}

export default RandomDecor;