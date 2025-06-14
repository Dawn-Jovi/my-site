import React from 'react';
import './articleDetail.css'

const ArticleDetail = ({ article }) => {
  if (!article) return <div>请选择文章</div>;

  return (
    <div className="article-detail">
      <h1 className='title'>{article.title}</h1>
      <a className='path' href={article.path}>{article.plate}</a>
      <p className="meta">{article.id}</p>
      <div className="essay">
        {article.essay}
      </div>
    </div>
  );
};

export default ArticleDetail;