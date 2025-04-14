import { useRef, useState, useEffect } from "react";
import Navbar from "../navbar";
import './eaToday.css';
import _ from 'lodash';
import FloatingText from "./component/floatingText";
import MyModal from "../Modal";

const gourmet = " 馄饨 拉面 烩面 热干面 刀削面 油泼面 炸酱面 炒面 重庆小面 米线 酸辣粉 土豆粉 螺狮粉 凉皮儿 麻辣烫 肉夹馍 羊肉汤 炒饭 盖浇饭 卤肉饭 烤肉饭 黄焖鸡米饭 驴肉火烧 川菜 麻辣香锅 火锅 酸菜鱼 烤串 披萨 烤鸭 汉堡 炸鸡 寿司 蟹黄包 煎饼果子 生煎 炒年糕 ";
const foods = gourmet
    .replace(/ +/g, " ")
    .replace(/^ | $/g, "")
    .split(" ");

// 浮动文字组件


function EaToday() {
    
    const [headingText, setHeadingText] = useState("吃什么？");
    const [isRunning, setIsRunning] = useState("start");
    const [currentfood, setCurrentFood] = useState(" ");
    const [floatings, setFloatings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [run, setRun] = useState(6);
    const intervalRef = useRef(null);

    const getRandomFood = useRef(
        _.throttle(() => {
            const newfood = _.sample(foods);
            setCurrentFood(newfood);
            setFloatings(prev => [...prev, 
                <FloatingText key={Date.now()} text={newfood} />
            ]);
        }, 100)
    );

    // 清理效果
    useEffect(() => {
        return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleClick = () => {
        if (isRunning === "start" || isRunning === "again") {
            intervalRef.current = setInterval(() => { getRandomFood.current(); }, 100);
            setRun(prev => {
                const newRun = prev - 1;
                if (newRun <= 0) {
                    setIsModalOpen(true);
                    setIsRunning('NULL');
                    clearInterval(intervalRef.current);
                }
                return newRun;
            });
            setIsRunning("stop");
            setHeadingText("吃什么？");
        } else if (isRunning === "stop") {
            setIsRunning("again");
            clearInterval(intervalRef.current);
            setHeadingText("吃这个！");

        }
        
    };



    return (
        <section id="eaToday" className="eatoday-container" data-nav-section>
            <Navbar />
            <div className="eat-content">
                <h1 className="eat-what-content">
                    事已至此，先吃饭吧。{headingText}
                    <br /><br />
                </h1>

                <p className="whateat">
                    {isRunning === "start" ? ' ' :currentfood}
                </p>       

                <div className="eat-start-box">
                    {isRunning === "NULL" ? " " :
                        <button className="eat-start"
                            onClick={handleClick}
                        >
                            {isRunning === "start" ? '开始' : (
                                isRunning === 'stop' ? '停止' :
                                    '再来一次'
                            )}
                        </button>
                    }
                    
                </div>
            </div>
            {floatings}
            <MyModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)} 
            /> 
        </section>
    );
}

export default EaToday;