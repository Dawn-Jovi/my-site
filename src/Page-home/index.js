import { Link } from 'react-router-dom';
import './home.css';
import Card from './component/card';
import cardsData from '../data/cardsData';
import Navbar from '../navbar';
import Clouds from './component/clouds';
import Background from './component/background';

function Home() {
    return (
        <div className='home'>
            <div className="content-layer">
                <Navbar />
                <main className='mainContent-bg'>
                    <section className="mainContent">
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
            <Background/>
            <Clouds />
        </div>
    );
}

export default Home;