import React, { useEffect, useState } from "react";
import userAPI from "../Utils/userAPI";

function News() {
  const [search, setSearch] = useState("");
  const [newsData, setNewsData] = useState({});
  const sortByDate = (data) =>
    data.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  const getNewsData = () => {
    userAPI
      .getNews(search)
      .then((res) => {
        const newsData = sortByDate(res.data.data);
        setNewsData(newsData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getNewsData();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    userAPI
      .getStaticNews()
      .then((res) => {
        const newsData = sortByDate(res.data.data);
        console.log(newsData);
        setNewsData(newsData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => {
          handleInputChange(e);
        }}
      />
      <button onClick={handleSubmit}>Search</button>
      {newsData.length > 0 ? (
        newsData.map((data) => {
          return (
            <article>
              <img src={data.image} alt="" />
              <h5>
                <a href={data.url} target="_blank" rel="noreferrer">
                  {data.title}
                </a>
              </h5>
              <p>Author: {data.author === null ? "N/A" : data.author} </p>
              <p>Published: {formatDate(data.published_at)}</p>
              <p>{data.description}</p>
            </article>
          );
        })
      ) : (
        <div>no data</div>
      )}
    </div>
  );
}

export default News;
