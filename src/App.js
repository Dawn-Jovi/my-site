import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // 导入 Navigate 组件
import { useEffect } from 'react';
import Home from './Page-home';
import About from './Page-about';
import BuildPage from './Page-build';

function App() {
  return (
    <BrowserRouter basename="/my-site">
      <Routes>
            {/* 根路径重定向到 /home */}
            <Route path="/" element={<Navigate  to="/home" replace />} />
            
            {/* 正常的路由配置 */}
            <Route
              path="/home"
              element={
                <PageWrapper
                  title="代码进化录 - 全栈萌新的成长之路"
                  children={<Home />}
                />}
            />

            <Route 
              path="/about" 
              element={
                <PageWrapper title="代码之外"
                  children={<About/>} 
              />}
            />
            
            <Route 
              path="/buildpage" 
                element={<PageWrapper title="施工中 - 萌新工程师进化ing" children={<BuildPage/>} />}
            />
      </Routes>
    </BrowserRouter>
    
  );
}

function PageWrapper({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
}

export default App;