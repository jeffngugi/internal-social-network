import React, { useEffect } from "react";
import Article from "./Article";
import { connect } from "react-redux";
import { getArticles } from "../../actions/articleAction";
import Spinner from "../../commons/Spinner";

const Articles = ({ articles, getArticles }) => {
  useEffect(() => {
    getArticles();
  }, [getArticles]);
  console.log(articles.loading);
  // console.log(articles.articles);
  const allArticles = articles.articles;
  console.log(allArticles);

  return (
    <>
      <div className="my-3 p-3 bg-white rounded shadow-sm">
        <div className="Articles">
          <h6 className="border-bottom border-gray pb-2 mb-">Articles</h6>
          {articles.loading || allArticles === null ? (
            <Spinner />
          ) : (
            allArticles.map(article => (
              <Article key={article.article_id} artikle={article} />
            ))
          )}
          <small className="d-block text-right mt-3">
            <button>Load more</button>
          </small>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  articles: state.articles
});
export default connect(mapStateToProps, { getArticles })(Articles);
