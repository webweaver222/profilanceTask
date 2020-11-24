import { mockUsers, mockNews, getDateString } from "../utils";
import { updateList } from "../reducers/funcs";

const try_login = () => (dispatch) => {
  mockUsers();
  if (!localStorage.getItem("news")) mockNews();

  const storedNews = JSON.parse(localStorage.getItem("news") || "[]");

  const user = localStorage.getItem("user");
  if (user) {
    dispatch({ type: "AUTH_SUCCESS", payload: { user: JSON.parse(user) } });
  }

  return dispatch({ type: "LOAD_NEWS", payload: { storedNews } });
};

const post = () => (dispatch, getState) => {
  const {
    news: { title, body },
    auth: { user },
  } = getState();

  const storedNews = JSON.parse(localStorage.getItem("news") || "[]");

  const newNews = {
    id: storedNews.length > 0 ? storedNews[0].id + 1 : 1,
    title,
    body,
    approved: user.role === "admin" ? true : false,
    date: getDateString(),
    user: user.id,
  };

  localStorage.setItem("news", JSON.stringify([newNews, ...storedNews]));

  return dispatch({ type: "ADD_NEWS", payload: { newNews } });
};

const approve = (id) => (dispatch) => {
  const storedNews = JSON.parse(localStorage.getItem("news") || "[]");
  const idxToApprove = storedNews.findIndex((item) => item.id === id);

  const approvedNews = {
    ...storedNews[idxToApprove],
    approved: true,
  };

  const newNewsList = updateList(storedNews, approvedNews, idxToApprove);
  localStorage.setItem("news", JSON.stringify(newNewsList));

  return dispatch({ type: "CHANGE_NEWS", payload: { newNewsList } });
};

const deletePost = (id) => (dispatch) => {
  const storedNews = JSON.parse(localStorage.getItem("news") || "[]");
  const idxToDelete = storedNews.findIndex((item) => item.id === id);

  const newNewsList = updateList(storedNews, "remove", idxToDelete);

  localStorage.setItem("news", JSON.stringify(newNewsList));

  return dispatch({ type: "CHANGE_NEWS", payload: { newNewsList } });
};

const login = () => (dispatch, getState) => {
  const {
    auth: { login, password },
  } = getState();
  const storedUsers = JSON.parse(localStorage.getItem("users"));

  const userIdx = storedUsers.findIndex((u) => u.login === login);

  if (userIdx < 0)
    return dispatch({
      type: "AUTH_FAIL",
      payload: { error: "Такого пользователя не найдено" },
    });

  if (storedUsers[userIdx].password !== password)
    return dispatch({
      type: "AUTH_FAIL",
      payload: { error: "Пароль не совпадает" },
    });

  localStorage.setItem("user", JSON.stringify(storedUsers[userIdx]));

  return dispatch({
    type: "AUTH_SUCCESS",
    payload: { user: storedUsers[userIdx] },
  });
};

const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  return dispatch("LOGOUT");
};

export { try_login, logout, post, login, approve, deletePost };
