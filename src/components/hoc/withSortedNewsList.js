import React from "react";
import { useSelector } from "react-redux";

const WithSortedNewsList = (Wrapped) => (props) => {
  const list = useSelector(({ news }) => news.list);
  const searchTerm = useSelector(({ news }) => news.searchTerm);
  console.log(list);
  const filtredList = list.filter((item) => {
    if (
      item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      item.body.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    ) {
      return item;
    }
  });

  return <Wrapped {...props} list={filtredList} searchTerm={searchTerm} />;
};

export default WithSortedNewsList;
