import React from "react";
import { post, approve, deletePost } from "../../actions";
import { connect } from "react-redux";
import { compose } from "../../utils";
import WithSortedNewsList from "../hoc/withSortedNewsList";

const News = ({
  user,
  list,
  title,
  body,
  onChangeInput,
  onPostNews,
  onApprove,
  onDelete,
  searchTerm,
}) => {
  const renderList = () => {
    return list.map((item, i) => {
      const contorls = user && user.role === "admin" && (
        <div className="controls">
          {!item.approved && (
            <i className="fas fa-check" onClick={() => onApprove(item.id)}></i>
          )}
          <i className="fas fa-trash" onClick={() => onDelete(item.id)}></i>
        </div>
      );

      const warning = !item.approved && user && user.role !== "admin" && (
        <span className="warning">В рассмотрении у администрации..</span>
      );

      const news =
        item.approved ||
        (user && item.user === user.id) ||
        (user && user.role === "admin") ? (
          <li key={i} className={!item.approved ? "pending" : ""}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <span>{item.date.toString()}</span>
            {contorls}
            {warning}
          </li>
        ) : null;

      return news;
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
      {user && (
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
      )}
    </div>
  );
};

const mapStateToProps = ({ news: { title, body }, auth: { user } }) => ({
  user,
  title,
  body,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: ({ value, name }) =>
    dispatch({ type: "CHANGE_POST_INPUT", payload: { value, name } }),
  onPostNews: () => dispatch(post()),
  onApprove: (id) => dispatch(approve(id)),
  onDelete: (id) => dispatch(deletePost(id)),
});

export default compose(
  WithSortedNewsList,
  connect(mapStateToProps, mapDispatchToProps)
)(News);
