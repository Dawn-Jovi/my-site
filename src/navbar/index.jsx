
import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import './navbar.css';
import cat from './assets/三花猫.png';
import tea from './assets/tea.png';
import coffee from "./assets/咖啡.png";
import ice from "./assets/冰淇淋.png";
import code from "./assets/代码.png";
import aboutme from './assets/账户A.png';
import react from './assets/React.png'

const Navbar = () => {
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || "home";
  });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSubRoute, setIsSubRoute] = useState(false);
  const isSubRouteRef = useRef(isSubRoute);

  useEffect(() => {
    isSubRouteRef.current = isSubRoute;
  }, [isSubRoute]);

  const NavItems = useMemo(()=> ([
    {
      id: "teabreak",
      path: "/teabreak",
      selector: "#teabreak",
      icon: tea,
      text: "茶歇时光机"
    },
    {
      id: "echoArk1",
      path:'#',
      selector: "#echoArk",
      icon: coffee,
      text: "数字方舟",
      dropdown: [
        { id: "echoArk", path: "https://github.com/Dawn-Jovi/my-site", icon: react, text: "SPA应用开发" },
        { id: "subItem3", path: "/echoArk", text: "子菜单项3" },
      ]
    },
    {
      id: "about",
      path: " #",
      selector: "#about",
      icon: code,
      text: "代码之外",
      dropdown: [
        { id: "aboutme", path: '/about', icon: aboutme, text: '关于我' },
        { id: "eatoday",path: "/eaToday",icon: ice,text: "碳水快乐屋"}
      ]
    },
  ]),[]);
  // 处理路径变化
  useEffect(() => {

    const currentPath = location.pathname.replace(/\/$/, '');

    // 1. 检查是否是直接匹配主菜单项
    const mainMenuItem = NavItems.find(item => 
      item.path.replace(/\/$/, '') === currentPath && !item.dropdown
    );

    if (mainMenuItem) {
      // console.log('匹配到主菜单项:', mainMenuItem.id);
      setActiveId(mainMenuItem.id);
      setIsSubRoute(false);
      return;
    }

    // 2. 检查是否是子菜单项
    let parentId = null;
    NavItems.forEach(item => {
      if (item.dropdown?.some(sub => {
        const subPath = sub.path.replace(/\/$/, '');
        return subPath === currentPath || currentPath.startsWith(subPath + '/');
      })) {
        parentId = item.id;
      }
    });

    if (parentId) {
      // console.log('检测到子路由，激活父菜单:', parentId);
      setActiveId(prev => {
        // 仅在需要变更时更新，避免无限循环
        return prev !== parentId ? parentId : prev;
      });
      setIsSubRoute(true);
    } else {
      // console.log('常规路由，激活ID:', window.location.hash);
      setIsSubRoute(false);
      const hash = window.location.hash.replace('#', '');
      setActiveId(hash || (location.pathname === '/' ? 'home' : ''));
    }
  }, [location.pathname, activeId, NavItems]);


  
  // 处理鼠标悬停
  const handleMouseLeave = () => {
    // 设置300ms延迟
    const timer = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
    setHoverTimeout(timer);
  };

  const handleMouseEnter = (id) => {
    // 如果已经有定时器，先清除
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown(id);
  };
  
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  // Intersection Observer
   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting &&
            entry.intersectionRatio > 0.1 &&
            !isSubRouteRef.current &&
            !entry.target.id.endsWith('-page')
          ) {
            // console.log('滚动触发激活:', entry.target.id);
            setActiveId(entry.target.id);
            // window.history.replaceState(null, '', `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30% 0px" }
    );

    const sections = document.querySelectorAll("[data-nav-section]");
    sections.forEach((section) => {
      // console.log('Observing section:', section.id);
      observer.observe(section);
    });

    // 强制同步初始状态
    const initialCheck = () => {
      const hash = window.location.hash.replace('#', '');
      const target = hash ? document.getElementById(hash) : null;
      if (target) {
        // console.log('Initial scroll to:', hash);
        target.scrollIntoView({ behavior: 'auto' });
      } else if (location.pathname !== '/') {
        // console.log('Resetting to default');
        setActiveId('home');
      }
    };

    const timer = setTimeout(initialCheck, 300);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname, isSubRoute]);

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

    let targetId = item.id;
    if (!item.dropdown) {
    const parentItem = NavItems.find(parent => 
      parent.dropdown?.some(sub => sub.path === item.path)
    );
    targetId = parentItem ? parentItem.id : item.id;
  }
  setActiveId(targetId);
    // setActiveId(item.id);
    
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
  // console.log(activeId);

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
              className={`nav-links-id 
                ${activeId === item.id ? "active" : ""} 
                ${item.dropdown ? " has-dropdown" : ""}
                `}
              onMouseEnter={item.dropdown ? () => handleMouseEnter(item.id) : null}
              onMouseLeave={item.dropdown ? handleMouseLeave : null}
            >
              <a
                href={item.path}
                onClick={(e) => handleNavigation(e, item)}
                className="nav-links-a dropdown-item"
              >
                {item.icon && <img src={item.icon} alt="" className="nav-links-img" />}
                {item.text}
              </a>
                
              {item.dropdown && activeDropdown === item.id && (
                <ul className='dropdown-menu'>
                  {item.dropdown.map((subItem) => (
                    <li
                      className='dropdown-item-li'
                      key={subItem.id}
                    >
                      <a
                        href={subItem.path}
                        onClick={(e) => handleNavigation(e, subItem)}
                        className='dropdow-item-a'>
                        <img src={subItem.icon} alt="" className='nav-links-img'/>
                        {subItem.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;