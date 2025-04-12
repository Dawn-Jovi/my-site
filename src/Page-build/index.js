import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './buildpage.css'
import RandomDecor from './component/randomdector';

function BuildPage() {
    const time = 6;
    // 状态管理：倒计时秒数（初始值15秒）
    const [seconds, setSeconds] = useState(time);

    // 使用ref获取DOM元素引用（替代document.getElementById）
    const progressBarRef = useRef(null);    // 进度条元素
    const countdownElementRef = useRef(null); // 倒计时显示元素
    const timerIdRef = useRef(null);       // 存储定时器ID（使用ref保证持久性）
    
    useEffect(() => {
        // 更新进度条和倒计时显示的函数
        const updateProgress = () => {
            // 计算进度百分比（0-100）
            const progress = ((time - seconds) / time) * 100;
            
            // 更新进度条宽度（安全访问DOM）
            if (progressBarRef.current) {
                progressBarRef.current.style.width = `${progress}%`;
            }
            
            // 更新倒计时数字显示
            if (countdownElementRef.current) {
                countdownElementRef.current.textContent = seconds;
            }

            // 秒数递减（通过setState触发重新渲染）
            setSeconds(prev => prev - 1);

            // 检查是否结束
            if (seconds <= 0) {
                window.location.href = '/home'; // 跳转主页
                // 更推荐使用react-router的navigate：
                // navigate('/home');
            } else {
                // 设置下一次更新（1秒后）
                timerIdRef.current = setTimeout(updateProgress, 1000);
            }
        };

        // 启动倒计时（1秒后首次执行）
        timerIdRef.current = setTimeout(updateProgress, 1000);

        // 清理函数：组件卸载时清除定时器
        return () => {
            if (timerIdRef.current) {
                clearTimeout(timerIdRef.current);
            }
        };
    }, [seconds]);

    return (
        <section className="buildpage-container">
            <RandomDecor />
            {/* 施工提示卡片 */}
            <div className="construction-card">
                <h1 className="buildpage-title">施工进行中！</h1>
                <p className="buildpage-textual">💻 工程师正在全力开发中...</p>
                
                {/* 倒计时显示（通过ref绑定DOM元素） */}
                <div className="countdown" ref={countdownElementRef}>{ time}</div>
                
                {/* 进度条容器 */}
                <div className="progress-container">
                    <div className="progress-bar" ref={progressBarRef}></div>
                </div>
                
                <p className="buildpage-textual">
                    迫不及待想看看？<br />
                    {/* 手动跳转链接（使用react-router的Link组件） */}
                    <Link to="/home" className="manual-jump">点击立即传送回主页 →</Link>
                </p>
            </div>
        </section>
    );

    
}

export default BuildPage;