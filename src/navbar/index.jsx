// Navbar.jsx (优化版)
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import cat from './assets/三花猫.png';
import tea from './assets/tea.png';
import coffee from "./assets/咖啡.png";
import ice from "./assets/冰淇淋.png";
import code from "./assets/代码.png";

const NavItems = [
    {
        id: "home",
        path: "/",
        selector: "#home",
        icon: tea,
        text: "茶歇时光机"
    },
    {
        id: "projectMuseum",
        path: "/#projectMuseum",
        selector: "#projectMuseum",
        icon: coffee,
        text: "项目博物馆"
    },
    {
        id: "projects",
        path: "/#projects",
        selector: "#projects",
        icon: ice,
        text: "妙妙屋"
    },
    {
        id: "about",
        path: "/about",
        selector: "#about",
        icon: code,
        text: "代码之外"
    }
];

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Intersection Observer配置
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
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-30% 0px -30% 0px"
      }
    );

    const sections = document.querySelectorAll('[data-nav-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // 防抖处理的滚动监听
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 50);
      }, 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 增强型导航处理
  const handleNavigation = (e, item) => {
    e.preventDefault();
    const [basePath, hash] = item.path.split('#');

    // 执行路由跳转
    navigate(hash ? `${basePath}#${hash}` : basePath);

    // 智能滚动处理
    setTimeout(() => {
      const target = document.querySelector(item.selector);
      if (target) {
        const headerOffset = 80; // 根据导航栏高度调整
        const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth"
        });
      }
    }, 150);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <Link to="/" className="logo">
          <img src={cat} alt="Logo" className="logo-img" />
          DawnJovi
        </Link>

        <ul className="nav-links">
          {NavItems.map((item) => (
            <div
              className={`${activeId === item.id ? 'active-o' : ''}`}
              key={item.id}
            >
              <li >
                <a
                  href={item.path}
                  onClick={(e) => handleNavigation(e, item)}
                  className='nav-links-a'
                >
                  {item.icon && <img src={item.icon} alt="" className="nav-links-img" />}
                  {item.text}
                </a>
              </li>
            </div>
            
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;