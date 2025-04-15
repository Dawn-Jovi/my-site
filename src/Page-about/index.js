import AvatarImage from '../assets/头像.png';//头像图片
import './about.css'
import HeatMap from './component/heatmap'
import Navbar from '../navbar';
import TimeCard from './component/timecard';
import timecardData from "../data/timecardData"
import skillcardData from '../data/skillcardData';
import SkillCard from './component/skillcard';

function About() {


    // const HTMLCSS_ = 90;
    // const JavaScript_ = 80;
    // const NodeJs_ = 0;
    // const Python_ = 50;

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
                        <p className='profile-subtitle'>❤️ 前端魔法师 | 🚀 后端探索者 | 🎮 游戏爱好者</p>
                        {/* tag区域 */}
                        <div className='tags-container'>
                            <span className="anime-tag">全栈开发萌新</span>
                            <span className="anime-tag">Python修行中</span>
                            <span className="anime-tag">咖啡因依赖者</span>
                        </div>
                    </section>
                </div>
                
                {/* 统计卡片 */}
                <div className='stats-card'>
                    {timecardData.map((item, index) => (
                        <TimeCard 
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