import './teabreak.css'
import Navbar from '../navbar'
import { useState } from 'react'

function TeaBreak() {
  const articles = [
    {
      id: 1,
      title: "no.1",
      date:"2025-04-03 23:01"
    },
    {
      id: 2,
      title: "no.2",
      date:"0000-00-00 00:00"
    },
    {
      id: 3,
      title: "no.3",
      date:"9999-99-99 99:99"
    }
  ]

  const [activeArticle, setActiveArticle] = useState(articles[0]);
  
  return (
    <section id='teabreak' className="teabreak-container" data-nav-section >
      <Navbar />
      <div className='teabreak-content'>
        <section className='artical-list'>
          <div >文章列表</div>
          {articles.map(article => (
            <div
              id={article.id}
              className={`article-item ${activeArticle.id === article.id ? 'active' : ''}`}
              onClick={() => setActiveArticle(article)}
            >
              <li>{article.title }</li>
              <li>{article.date }</li>
            </div>
          ))}

        </section>
        <section className='artical-detail'>
          <div >{activeArticle.title}</div>
        </section>
      </div>
    </section>
    
  );
}


export default TeaBreak;