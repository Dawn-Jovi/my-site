import AvatarImage from '../assets/头像.png';//头像图片
import './about.css'
import HeatMap from './component/heatmap'
import Navbar from '../navbar';
import TimeCard from './component/timecard';
import timecardData from "../data/timecardData"
import skillcardData from '../data/skillcardData';
import SkillCard from './component/skillcard';

import github from '../assets/git.png'
import email from "../assets/email.png"
import bilibili from "../assets/bilibili.png"
import wechat from "../assets/微信.png"
import xin from '../assets/爱心.png'

import { useRef, useState } from 'react';

function About() {

    const QRcode = useRef(null);
    const [qrcodeStyle, setQrcodeStyle] = useState({
        opacity: 0,
        top: 0,
        left:0
    });

    // 计算二维码位置
    const updateQrcodePosition = () => {
        if (QRcode.current) {
            const iconRect = QRcode.current.getBoundingClientRect();
            const scrollY = window.scrollY; 
            setQrcodeStyle({
                opacity: 1,
                top: iconRect.top + scrollY - 110, // 上方160px（二维码高度 + 间距）
                left:  75,
            });
        }
    };

    // 隐藏二维码
    const hideQrcode = () => {
        setQrcodeStyle(prev => ({ ...prev, opacity: 0 }));
    };




    return (

        <section id ="aboutme" className='aboutme-container' data-nav-section>
            
            <Navbar/>

            <div className="about-container">
                {/* 用户配置 */}
                <div className="user-profile">
                    {/* 装饰线 */}
                    <div className="decor-line top"></div>
                    {/* 头像区域 */}
                    <img
                        className="avatar-section"
                        src={AvatarImage}
                        alt="用户个人头像"
                        aria-label="用户个人资料照片"
                    />
                    <section className='profile-content'>
                        <h1 className='profile-title'>码力全开の萌新工程师</h1>
                        <p className='profile-subtitle'>❤️ 前端魔法师 | 🚀 后端探索者 | 🎮 游戏爱好者 | ☕咖啡因依赖者 </p>
                        {/* tag区域 */}
                        <div className='tags-container'>
                            <a href='https://github.com/Dawn-Jovi'><img className='tag-icon' src={github}alt='' /></a>

                            <a href= "/#/about"><img className='tag-icon' src={email} alt=''/></a>

                            <a href='https://space.bilibili.com/100856837?spm_id_from=333.1007.0.0'><img className='tag-icon' src={bilibili} alt='' /></a>
                            
                            <div
                                className="tag-icon-content"
                                ref={QRcode}
                                onMouseEnter={updateQrcodePosition}
                                onMouseLeave={hideQrcode}>
                                <img className="tag-icon" src={wechat} alt="微信" />
                                <div 
                                    className="qrcode" 
                                    style={{
                                        position: 'absolute',
                                        top: `${qrcodeStyle.top}px`,
                                        left: `${qrcodeStyle.left}px`,
                                        opacity: qrcodeStyle.opacity,
                                        transition: 'opacity 0.3s',
                                    }}
                                >
                                    <img className="tag-icon-qr" src={xin} alt="二维码" />
                                </div>
                            </div>
                            
                        </div>
                    </section>
                </div>
                
                {/* 统计卡片 */}
                <div className='stats-card'>
                    {timecardData.map((item, index) => (
                        <TimeCard 
                            key={item.id}
                            title={item.title}
                            num={item.num}
                            text={item.text}
                        />
                    ))}
                </div>

                {/* 学习活跃度热力图 */}
                <div className='heatmap'>
                    <h3 className='heatmap-name'>学习活跃度热力图 📅</h3>
                    <HeatMap />
                </div>

                {/* 技能卡片 */}
                {['front', 'end', 'database'].map(type => (
                    <div
                        className={`${type}-con`}
                        id={type}
                        key={type}
                    >
                        {type === 'front' ? (<p>前端技能树 🎨</p>) :
                            type === 'end' ? (<p>后端技能树 ⚙️</p>) :
                                type === 'database' ? (<p>数据库技能树 🖥️</p>) :
                                    null
                        }
                        {skillcardData
                            .filter(({ id }) => id === type)
                            .map((item, index) => (
                                <SkillCard
                                    key={item.name}
                                    id={item.id}
                                    name={item.name}
                                    num={item.num}
                                />
                            ))
                        }
                    </div>
                ))}
                
            </div>
            
        </section>
        
    )
}

export default About;