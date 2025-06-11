import './teabreak.css'
import Navbar from '../navbar'
import { useState, useMemo } from 'react'
import ArticleList from './component/articleList';
import ArticleDetail from './component/articleDetail';
import _ from 'lodash'
import ThePrimalOrigin from '../blog/ThePrimalOrigin'
import Fragments from '../blog/FragmentsOfUnfinishedMetamorphosis'
import JavaInterPoly from '../blog/JavaInterPoly';

function TeaBreak() {
  const articles = useMemo(() => [
    ThePrimalOrigin,
    Fragments,
    JavaInterPoly
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