import React from 'react';
import './articleList.css'
function ArticleList({articles, activeArticle, setActiveArticle}) {
  return (
    <div className='list-container'>
        {articles.map(article => (
        <div
            id={article.id}
            className="item"
            onClick={() => setActiveArticle(article)}
        >
            <div
                className={`a-box ${activeArticle.id === article.id ? 'active' : ''}`}
            >
                <li
                    className={`a-title ${activeArticle.id === article.id ? 'active' : ''}`}
                >{article.title}</li>
                    
                <li className='date'>{article.id}</li>
            </div>
        </div>
        ))}
    </div>
  );
}

export default ArticleList;