import { Link } from 'react-router-dom';
import './home.css';
import Card from './component/card';
import cardsData from '../data/cardsData';
import Navbar from '../navbar';

function Home() {
    console.log("Home component rendered");
    return (
        <div className='home'>
            <Navbar/>
            <main className='mainContent-bg'>
                <section className="mainContent">
                    {/* 主标题 */}
                    <h1 className="heroTitle">
                        从<span className="highlight">Bug</span>中诞生<br />
                        在<span className="highlight">代码</span>中进化
                    </h1>

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
    );
}

export default Home;