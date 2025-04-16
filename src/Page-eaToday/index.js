import { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "../navbar";
import './eaToday.css';
import _ from 'lodash';
import FloatingText from "./component/floatingText";
import MyModal from "../Modal";

// 定义运行状态常量以提高可读性
const RUNNING_STATES = {
  START: 'start',
  STOP: 'stop',
  AGAIN: 'again',
  FINISHED: 'finished'
};

// 处理美食字符串为数组格式
const gourmet = " 馄饨 拉面 烩面 热干面 刀削面 油泼面 炸酱面 炒面 重庆小面 米线 酸辣粉 土豆粉 螺狮粉 凉皮儿 麻辣烫 肉夹馍 羊肉汤 炒饭 盖浇饭 卤肉饭 烤肉饭 黄焖鸡米饭 驴肉火烧 川菜 麻辣香锅 火锅 酸菜鱼 烤串 披萨 烤鸭 汉堡 炸鸡 寿司 蟹黄包 煎饼果子 生煎 炒年糕 "; 
const foods = gourmet.trim().split(/\s+/);

function EaToday() {
  // 状态管理
    const [headingText, setHeadingText] = useState("吃什么？");
    const [runningState, setRunningState] = useState(RUNNING_STATES.START);
    const [currentFood, setCurrentFood] = useState("");
    const [floatings, setFloatings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [remainingRuns, setRemainingRuns] = useState(5); // 剩余随机次数
    // const [/]
  
    // 使用 ref 保存定时器和稳定的回调函数
    const intervalRef = useRef(null);
    const floatingId = useRef(0); // 用于生成唯一键值
    const throttledGetRandomFood = useRef();

    // 随机食物获取函数
    const getRandomFood = useCallback(() => {
        const newFood = _.sample(foods);
        setCurrentFood(newFood);
        setFloatings(prev => [
            ...prev.slice(-5),
            <FloatingText
                key={ floatingId.current++}
                text={newFood}
            />
        ])
    },[])

    useEffect(() => {
        throttledGetRandomFood.current = _.throttle(() => {
            getRandomFood();
        }, 100);
        return () => {
            throttledGetRandomFood.current?.cancel();
        };
    }, [getRandomFood]);

    // 组件卸载时清理定时器
    useEffect(() => {
        return () => {
            intervalRef.current && clearInterval(intervalRef.current);
            throttledGetRandomFood.current?.cancel();
        };
    }, []);

  
    // 处理主按钮点击事件
    const handleClick = () => {
        switch (runningState) {
        case RUNNING_STATES.START:
        case RUNNING_STATES.AGAIN:
            startRandomizing();
            break;
        case RUNNING_STATES.STOP:
            stopRandomizing();
            break;
        default:
            break;
        }
    };

  
    // 开始随机选择食物
    const startRandomizing = () => {
        intervalRef.current = setInterval(throttledGetRandomFood, 100);
        setRunningState(RUNNING_STATES.STOP);
        setHeadingText("吃什么？");
    };

    // 停止随机选择并显示结果
    const stopRandomizing = () => {
        clearInterval(intervalRef.current);
        setRunningState(RUNNING_STATES.AGAIN);
        setHeadingText("吃这个！");
        
        // 更新剩余次数并检查是否结束
        setRemainingRuns(a => a - 1);
        if (remainingRuns <= 0) {
            setIsModalOpen(true);
            setRunningState(RUNNING_STATES.FINISHED);
        }
    };


    // 根据状态获取按钮文本
    const getButtonText = () => {
    switch (runningState) {
        case RUNNING_STATES.START:
        return '开始';
        case RUNNING_STATES.STOP:
        return '停止';
        case RUNNING_STATES.AGAIN:
        return '再来一次';
        default:
        return null;
    }
    };

    return (
    <section id="eatoday" className="eatoday-container" data-nav-section>
        <Navbar />
        
        <div className="eat-content">
        <h1 className="eat-what-content">
            事已至此，先吃饭吧。{headingText}
            <br /><br />
        </h1>

        {/* 当前选中的食物显示 */}
        <p className="whateat">
            {runningState !== RUNNING_STATES.START && currentFood}
        </p>       
        {/* 操作按钮 */}
        <div className="eat-start-box">
            {runningState !== RUNNING_STATES.FINISHED && (
            <button className="eat-start" onClick={handleClick}>
                {getButtonText()}
            </button>
            )}
        </div>
        </div>

        {/* 浮动文字效果 */}
        {floatings}

        {/* 结束弹窗 */}
            <MyModal
                text={'这么作？那就别吃了！'}
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)} 
            /> 
    </section>
    );
}

export default EaToday;