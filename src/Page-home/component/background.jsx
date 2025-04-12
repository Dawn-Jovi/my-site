import { useState, useEffect } from 'react';
import './background.css';

const Background = () => {
    const [currentPeriod, setCurrentPeriod] = useState('night');
    const [manualPeriod, setManualPeriod] = useState(null);

    // 根据时间自动更新背景
    useEffect(() => {
    const updateBackground = () => {
        const now = new Date();
        const hours = now.getHours();
        
        let period = 'night';
        if (hours >= 5 && hours < 10) period = 'morning';
        else if (hours >= 10 && hours < 15) period = 'noon';
        else if (hours >= 15 && hours < 19) period = 'dusk';
        
        setCurrentPeriod(period);
    };

    // 立即执行一次
    updateBackground();

    // 每分钟检查一次时间
    const timer = setInterval(updateBackground, 60000);
    return () => clearInterval(timer);
    }, []);

    // 应用背景样式
    useEffect(() => {
    document.body.className = `background ${manualPeriod || currentPeriod}`;
    }, [currentPeriod, manualPeriod]);

    // 新增的下拉选择处理
    const handleSelectChange = (e) => {
        const value = e.target.value;
        setManualPeriod(value === 'auto' ? null : value);
    };

    // // 获取当前显示模式
    // const displayMode = manualPeriod ? '手动' : '自动';
    // const displayPeriod = manualPeriod || currentPeriod;

    return (
    <div className="g-container">
      <div className="mode-selector">
        <select 
          value={manualPeriod || 'auto'}
          onChange={handleSelectChange}
          className="mode-dropdown"
        >
          <option value="auto">自动</option>
          <option value="morning">清晨</option>
          <option value="noon">正午</option>
          <option value="dusk">黄昏</option>
          <option value="night">夜晚</option>
        </select>
 
      </div>
    </div>
    );
};

export default Background;