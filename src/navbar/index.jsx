// Navbar.jsx (优化版)
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import cat from './assets/三花猫.png';
import tea from './assets/tea.png';
import coffee from "./assets/咖啡.png";
import ice from "./assets/冰淇淋.png";
import code from "./assets/代码.png";

const NavItems = [
    {
        id: "home",
        path: "/#home",
        icon: tea,
        text: "茶歇时光机"
    },
    {
        id: "about",
        path: "/#about",
        icon: coffee,
        text: "项目博物馆"
    },
    {
        id: "projects",
        path: "/#projects",
        icon: ice,
        text: "妙妙屋"
    },
    {
        id: "code",
        path: "/#code",
        icon: code,
        text: "代码之外"
    }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  // 使用Intersection Observer检测可见区域
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: "-100px 0px"
      }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  // 处理滚动时导航栏样式变化
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滚动处理
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">


        <Link to="/home" className="logo">
          <img src={cat} alt="Logo" className="logo-img" />
          DawnJovi
        </Link>


        <ul className="nav-links">
          {NavItems.map((item) => (
            <Link to={item.path} key={item.id} className='nav-links-a'>
              <a 
                href={item.href}
                className={activeId === item.id ? 'active' : ''}
                onClick={(e) => handleSmoothScroll(e, item.href)}
              >
                {item.icon && <img src={item.icon} alt="" className="nav-links-img" />}
                {item.text}
              </a>
            </Link>
          ))}
        </ul>

        
      </div>
    </nav>
  );
};

export default Navbar;