import React, { useState, useEffect } from "react";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost/progetto_settimanale/wp-json/wp/v2/posts/");
        if (!response.ok) {
          throw new Error("Errore durante il recupero degli articoli");
        }
        const data = await response.json();
        setArticles(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1 className="text-center mb-5">Blog</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {articles.map((article) => (
          <div key={article.id} className="col">
            <div className="card h-100">
              {article._embedded &&
                article._embedded["wp:featuredmedia"] &&
                article._embedded["wp:featuredmedia"][0].source_url && (
                  <img
                    src={article._embedded["wp:featuredmedia"][0].source_url}
                    className="card-img-top"
                    alt={article.title.rendered}
                  />
                )}
              <div className="card-body">
                <h2 className="card-title">{article.title.rendered}</h2>
                <div className="card-text" dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}></div>
              </div>
              <div className="card-footer">
                <a href={article.link} className="btn btn-primary">
                  Leggi di più
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;