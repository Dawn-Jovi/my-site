import './teabreak.css'
import Navbar from '../navbar'
import { useState, useMemo } from 'react'
import ArticleList from './component/articleList';
import ArticleDetail from './component/articleDetail';
import _ from 'lodash'
import ThePrimalOrigin from '../blog/ThePrimalOrigin'

function TeaBreak() {
  const articles = useMemo(() => [
    ThePrimalOrigin,
    {
      id: "2023-11-02 13:00",
      path: "https://dawn-jovi.github.io/my-site/",
      title: "千里关山边草暮，一星烽火朔云秋",
      essay:''
    },
    { id: "0000-00-00 00:11", title: "行人无限秋风思，隔水青山似故乡。" },
    { id: "9999-99-99 99:99", title: "只恐长江水，尽是儿女泪。" },
    { id: "1111-11-11 11:11", title: "卧看花梢摇动、一枝枝。娉娉袅袅教谁惜。" },
    { id: "2023-01-01 12:00", title: "问蓬莱何处，风月依然，万里江清。休说神仙事，便神仙纵有，即是闲人。" },
  ],[]);


  const sortList = useMemo(() => {
    return _.orderBy(articles, 'id', 'desc');
  }, [articles]);

  const [activeArticle, setActiveArticle] = useState(sortList[0]);

  
  return (
    <section id='teabreak' className="teabreak-container" data-nav-section >
      <Navbar />
      <div className='teabreak-content'>
        <div className='teabreak-box'>

          {/* 左侧文章列表容器 */}
          <section className='article-list-container'>

            <div className='article-header' >
              <p className='article-title'>文章列表</p>
            </div>

            <ArticleList
              articles={sortList}
              activeArticle={activeArticle}
              setActiveArticle={setActiveArticle}
            />

          </section>

          {/* 右侧文章详情区域容器 */}
          <section className='article-detail-container'>

            <div className='article-header'>
              <p className='article-title'>{activeArticle.title}</p>
            </div>
            
            <ArticleDetail
              article={articles.find(a => a.id === activeArticle.id)}
            />
          </section>
          
        </div>
        
      </div>
    </section>
    
  );
}


export default TeaBreak;