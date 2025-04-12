import AvatarImage from '../assets/头像.png';//头像图片
import './about.css'
import ProgressBar from './component/progressBar'
import HeatMap from './component/heatmap'
import Navbar from '../navbar';

function About() {

    // 📦 项目数量
    const numOfItem = 3;
    // 💻 代码时间
    const codeTime = 256;
    // 📚 学习日志
    const learningLogs = 0;

    const HTMLCSS_ = 90;
    const JavaScript_ = 80;
    const NodeJs_ = 0;
    const Python_ = 50;

    return (

        <section id ="code" className='aboutme-container'>
            
            <Navbar/>

            <div className="container">
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
                            <span class="anime-tag">全栈开发萌新</span>
                            <span class="anime-tag">Python修行中</span>
                            <span class="anime-tag">咖啡因依赖者</span>
                        </div>
                    </section>
                </div>
                
                 {/* 统计卡片 */}
                <div className='stats-card'>
                    <div className='start-item'>
                        <h3 className='start-item-tite'>📦 项目数量</h3>
                        <p className='start-item-count'>{numOfItem}</p>
                        <small className='start-item-subutitle'>已完成项目总数</small>
                    </div>
                    <div className='start-item'>
                        <h3 className='start-item-tite'>💻 代码时间</h3>
                        <p className='start-item-count'>{codeTime}h</p>
                        <small className='start-item-subutitle'>本月累计编码时长</small>
                    </div>
                    <div className='start-item'>
                        <h3 className='start-item-tite'>📚 学习日志</h3>
                        <p className='start-item-count'>{learningLogs}篇</p>
                        <small className='start-item-subutitle'>踩坑记录与心得分享</small>
                    </div>
                </div>

                {/* 技能卡片 */}
                <div className='skill-card'>
                    <h3 className='skill-front'>前端技能树 🎨</h3>
                    {/* HTML/CSS */}
                    <div className='skill-item'>
                        <p className='skill-item-name'>
                            HTML/CSS
                            <span style={{ float: 'right' }}>{HTMLCSS_}%</span>
                            <ProgressBar percentage={HTMLCSS_} />
                        </p>
                    </div>
                    {/* JavaScript */}
                    <div className='skill-item'>
                        <p className='skill-item-name'>
                            Javascript
                            <span style={{ float: 'right' }}>{JavaScript_}</span>
                            <ProgressBar percentage={JavaScript_} />
                        </p>
                    </div>
                </div>
                
                <div className='skill-card'>
                    <h3 className='skill-end'>后端技能树 ⚙️</h3>
                    {/* Node.js */}
                    <div className='skill-item'>
                        <p className='skill-item-name'>
                            Node.js
                            <span style={{ float: 'right' }}>{NodeJs_ }</span>
                            <ProgressBar percentage={NodeJs_} />
                        </p>
                    </div>
                    {/* Python */}
                    <div className='skill-item'>
                        <p className='skill-item-name'>
                            Python
                            <span style={{ float: 'right' }}>{Python_ }</span>
                            <ProgressBar percentage={Python_} />
                        </p>
                    </div>
                </div>

                {/* 学习活跃度热力图 */}
                <div className='heatmap'>
                    <h3 className='heatmap-name'>学习活跃度热力图 📅</h3>
                    <HeatMap />
                </div>
            </div>
            
        </section>
        
    )
}

export default About;