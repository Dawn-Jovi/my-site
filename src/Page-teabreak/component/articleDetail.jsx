import React from 'react';
import './articleDetail.css'

const ArticleDetail = ({ article }) => {
  if (!article) return <div>请选择文章</div>;

  return (
    <div className="article-detail">
      <h1 className='title'>{article.title}</h1>
      <a className='path' href={article.path}>[原文链接]</a>
      <p className="meta">{article.id}</p>
      <div className="content">
        {article.summary}
      </div>
    </div>
  );
};

export default ArticleDetail;