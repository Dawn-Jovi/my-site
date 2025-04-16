import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Page-home';
import About from './Page-about';
import BuildPage from './Page-build';
import TeaBreak from './Page-teabreak';
import EAToday from "./Page-eaToday"
import EchoArk from './Page-echoArk';
import QRnot from './trashCan/QRnot';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="home" replace />} />
        <Route path="/home" element={<PageWrapper title="代码进化录" children={<Home />} />} />
        <Route path="/about" element={<PageWrapper title="码力全开の萌新工程师" children={<About />} />} />
        <Route path="/buildpage" element={<PageWrapper title="施工中 - 萌新工程师进化ing" children={<BuildPage />} />} />
        <Route path="/teabreak" element={<PageWrapper title="茶歇时光机" children={<TeaBreak />} />} />
        <Route path="/eaToday" element={<PageWrapper title="碳水快乐屋" children={<EAToday />} />} />
        <Route path="/echoArk" element={<PageWrapper title="数字方舟" children={<EchoArk />} />} />
        <Route path="/QRnot" element={<PageWrapper title="不要乱扫二维码啊！！！！！！！！" children={<QRnot />} />} />
        
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