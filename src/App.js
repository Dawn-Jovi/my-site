import { Routes, Route, Navigate } from 'react-router-dom'; // 导入 Navigate 组件
import Home from './Page-home';

function App() {
  return (
    <Routes>
      {/* 根路径重定向到 /home */}
      <Route path="/" element={<Navigate replace to="/home" />} />
      
      {/* 正常的路由配置 */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;