
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import './navbar.css';
import cat from './assets/三花猫.png';
import tea from './assets/tea.png';
import coffee from "./assets/咖啡.png";
import ice from "./assets/冰淇淋.png";
import code from "./assets/代码.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(() => {
    // 从 URL 初始化 activeId
    const hash = window.location.hash.replace('#', '');
    return hash || "home";
  });

  const NavItems = [
    { id: "teabreak", path: "/teabreak", selector: "#teabreak", icon: tea, text: "茶歇时光机" },
    { id: "projectMuseum", path: "/buildpage", selector: "#projectMuseum", icon: coffee, text: "项目博物馆" },
    { id: "projects", path: "/buildpage", selector: "#projects", icon: ice, text: "吃什么" },
    { id: "about", path: "/about", selector: "#about", icon: code, text: "代码之外" },
  ];

  // Intersection Observer
   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            console.log('Observer triggering active:', entry.target.id);
            setActiveId(entry.target.id);
            window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30% 0px" }
    );

    const sections = document.querySelectorAll("[data-nav-section]");
    sections.forEach((section) => {
      console.log('Observing section:', section.id);
      observer.observe(section);
    });

    // 强制同步初始状态
    const initialCheck = () => {
      const hash = window.location.hash.replace('#', '');
      const target = hash ? document.getElementById(hash) : null;
      if (target) {
        console.log('Initial scroll to:', hash);
        target.scrollIntoView({ behavior: 'auto' });
      } else if (location.pathname !== '/') {
        console.log('Resetting to default');
        setActiveId('home');
      }
    };

    const timer = setTimeout(initialCheck, 300);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname]);

  // 防抖滚动监听
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setScrolled(window.scrollY > 50), 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 增强导航逻辑
  const handleNavigation = (e, item) => {
  e.preventDefault();
  setActiveId(item.id);
  
  // 先定义 checkAndScroll 函数
  const checkAndScroll = (attempts = 0) => {
    if (attempts > 5) return;
    
    const target = item.selector ? document.querySelector(item.selector) : null;
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: "smooth"
      });
    } else {
      setTimeout(() => checkAndScroll(attempts + 1), 150);
    }
  };

  // 再调用导航逻辑
  if (item.path.startsWith('http')) {
    window.open(item.path, '_blank');
    return;
  }

  navigate(item.path);
  setTimeout(() => checkAndScroll(), 100);
};


  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-content">
        <Link to="/" className="logo">
          <img src={cat} alt="Logo" className="logo-img" />
          DawnJovi
        </Link>

        <ul className="nav-links">
          {NavItems.map((item) => (
            <li
              key={item.id}
              className={`nav-links-id ${activeId === item.id ? "active" : ""}`}
            >
              <a
                href={item.path}
                onClick={(e) => handleNavigation(e, item)}
                className="nav-links-a"
              >
                {item.icon && <img src={item.icon} alt="" className="nav-links-img" />}
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;