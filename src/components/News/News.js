import React, { useRef, useEffect } from "react";

import { connect } from "react-redux";
import { compose } from "../../utils";
import WithSortedNewsList from "../hoc/withSortedNewsList";

const News = ({
  list,
  title,
  body,
  onChangeInput,
  onPostNews,
  onApprove,
  onDelete,
  searchTerm,
}) => {
  console.log(list);

  const renderList = () => {
    return list.map((item, i) => {
      const contorls = (
        <div className="controls">
          {!item.approved && (
            <i className="fas fa-check" onClick={() => onApprove(item.id)}></i>
          )}
          <i className="fas fa-trash" onClick={() => onDelete(item.id)}></i>
        </div>
      );

      return (
        <li key={i}>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <span>{item.date.toString()}</span>
          {contorls}
        </li>
      );
    });
  };

  return (
    <div className="news-page">
      <h2>Новости: </h2>
      <input
        type="text"
        name="searchTerm"
        className="filter"
        placeholder="Фильтр новостей"
        value={searchTerm}
        onChange={(e) => onChangeInput(e.target)}
      />
      <ul>{renderList()}</ul>
      <div className="post-form">
        <input
          type="text"
          name="title"
          placeholder="Загаловок"
          value={title}
          onChange={(e) => onChangeInput(e.target)}
        />
        <textarea
          name="body"
          cols="30"
          rows="10"
          placeholder="Новость"
          value={body}
          onChange={(e) => onChangeInput(e.target)}
        ></textarea>
        <button onClick={onPostNews}>Предложить новости</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ news: { title, body } }) => ({
  title,
  body,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: ({ value, name }) =>
    dispatch({ type: "CHANGE_POST_INPUT", payload: { value, name } }),
  onPostNews: () => dispatch("ADD_NEWS"),
  onApprove: (id) => dispatch({ type: "APPROVE_NEWS", payload: { id } }),
  onDelete: (id) => dispatch({ type: "DELETE_NEWS", payload: { id } }),
});

export default compose(
  WithSortedNewsList,
  connect(mapStateToProps, mapDispatchToProps)
)(News);
