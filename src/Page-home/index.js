import { Link } from 'react-router-dom';
import './home.css';
import Card from './component/card';
import cardsData from '../data/cardsData';
import Navbar from '../navbar';
import Clouds from './component/clouds';
import Background from './component/background';
import timelineData from '../data/timelineData'
import TimeLine from './component/timeline'
import Stars from './component/star';

function Home() {
    return (
        <div className='home'>
            <div className="content-layer">
                <Stars />
                <Navbar />
                <main className='mainContent-bg'>
                    <section className="mainContent">
                        {/* 主标题 */}
                        <h1 className="heroTitle">
                            从<span className="highlight">Bug</span>中诞生<br />
                            在<span className="highlight">代码</span>中进化
                        </h1>

                        {/* 间线条目示例 */}
                        <ul className='timeline-content'>
                            <div className='timeline-box'>
                                {timelineData.map((item, index) => (
                                    <TimeLine 
                                        key={index}
                                        image={item.image}
                                        title={item.title}
                                        date={item.date}
                                        desc={item.desc}
                                        link={item.link}/>
                                ))}
                            </div>
                        </ul>

                        {/* 快速入口卡片 */}
                        <ul className="cards-content">
                            {cardsData.map((item, index) => (
                                <Card 
                                    key={index}
                                    image={item.icon}
                                    title={item.title}
                                    text={item.text}
                                    link={item.link}
                                    buttonText={item.buttonText}
                                />
                            ))}
                        </ul>
                    </section>
                </main>
            </div>
            <Background/>
            <Clouds />
        </div>
    );
}

export default Home;