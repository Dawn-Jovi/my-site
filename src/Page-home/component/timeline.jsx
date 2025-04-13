import './timeline.css';
import { Link } from "react-router-dom";

const TimeLine = ({ image, title, date, desc, link }) => {
    return (
        
        <div className="timeline-item">
            <div className='img-content'>
                <img
                    src={image}
                    alt=" "
                    className="timeline-img" />
                <li className='timeline-title'>{title}</li>
            </div>
            <p className="timeline-date-text">{date}-{desc}</p>
            <Link to={link} className="timeline-Link">查看项目</Link>
        </div>
    );  
};

export default TimeLine;