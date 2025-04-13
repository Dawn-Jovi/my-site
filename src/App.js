import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Page-home';
import About from './Page-about';
import BuildPage from './Page-build';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PageWrapper title="首页" children={<Home />} />} />
        <Route path="/about" element={<PageWrapper title="关于" children={<About />} />} />
        <Route path="/buildpage" element={<PageWrapper title="施工中" children={<BuildPage />} />} />
      </Routes>
    </HashRouter>
  );
}

function PageWrapper({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return children;
}

export default App;