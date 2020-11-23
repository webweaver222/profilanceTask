import React from "react";
import { useSelector } from "react-redux";

const WithSortedNewsList = (Wrapped) => (props) => {
  const list = useSelector(({ news }) => news.list);
  const searchTerm = useSelector(({ news }) => news.searchTerm);

  return <Wrapped {...props} list={list} searchTerm={searchTerm} />;
};

export default WithSortedNewsList;
