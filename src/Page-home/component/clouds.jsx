import React from "react";
import "./clouds.css";

const Cloud = ({ left, top, duration, scale, delay }) => (
  <div 
    className="cloud" 
    style={{
        left: `${left}%`,
        top: `${top}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        transform: `scale(${scale})`,
    }}
  />
);

const Clouds = () => {
  return (
    <div className="sky">
      {Array.from({ length: 15 }).map((_, i) => (
        <Cloud
              key={i}
              left={Math.random() * 100}
              top={Math.random() * 70 + 10}
              // 动画周期：20 到 40 秒（数值越大移动越慢
              duration={Math.random() * 20 + 20}
              // 缩放比例
              scale={Math.random() * 1.2 + 0.5}
              delay={Math.random() * -20}
        />
      ))}
    </div>
  );
};

export default Clouds;