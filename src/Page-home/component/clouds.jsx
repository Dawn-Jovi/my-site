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
        // transform: `scale(${scale})`,
        "--cloud-scale": scale,
    }}
  />
);

const Clouds = () => {
  return (
    <div className="sky">
      {Array.from({ length: 10 }).map((_, i) => (
        <Cloud
              key={i}
              left={Math.random() *(-100)+100}
              top={Math.random() * 70 + 10}
              // 动画周期：20 到 40 秒（数值越大移动越慢
              duration={Math.random() * 80 + 40}
              // 缩放比例
              scale={Math.random() * 1.2 + 0.5}
              
              delay={Math.random() * (-10)+-5}
        />
      ))}
    </div>
  );
};

export default Clouds;