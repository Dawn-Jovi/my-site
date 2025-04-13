import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Page-home';
import About from './Page-about';
import BuildPage from './Page-build';
import TeaBreak from './Page-teabreak';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="/home" element={<PageWrapper title="代码进化录" children={<Home />} />} />
        <Route path="/about" element={<PageWrapper title="码力全开の萌新工程师" children={<About />} />} />
        <Route path="/buildpage" element={<PageWrapper title="施工中 - 萌新工程师进化ing" children={<BuildPage />} />} />
        <Route path="/teabreak" element={<PageWrapper title="茶歇时光机" children={<TeaBreak />} />} />
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