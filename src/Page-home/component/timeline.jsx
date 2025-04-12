import './timeline.css';
import { Link } from "react-router-dom";

const TimeLine = ({ image, title, date, desc, link }) => {
    return (
        
        <div className="timeline-item">
            <div img-content>
                <img
                src={image}
                    className="timeline-img" />
                <a className='timeline-title'>{title}</a>
            </div>
            <p className="timeline-date-text">{date}-{desc}</p>
            <Link to={link} className="timeline-Link">查看项目</Link>
        </div>
    );  
};

export default TimeLine;