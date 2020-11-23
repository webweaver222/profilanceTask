const try_login = () => dispatch => {
  const user = localStorage.getItem("user");
  if (user) {
    const chat = JSON.parse(localStorage.getItem("chat") || "[]");
    if (chat.length > 0) {
      dispatch({ type: "LOAD_POSTS", payload: chat });
    }

    return dispatch({ type: "ENTER_CHAT", payload: user });
  }
};

const enter = () => (dispatch, getState) => {
  const { username } = getState();

  localStorage.setItem("user", username);

  return dispatch("ENTER_CHAT");
};

const logout = () => dispatch => {
  localStorage.removeItem("user");

  return dispatch("LOGOUT");
};

const post = () => (dispatch, getState) => {
  const { chat, message, currentUser } = getState();

  const newMessage = {
    body: message,
    user: currentUser
  };

  localStorage.setItem("chat", JSON.stringify([...chat, newMessage]));

  return dispatch({ type: "POST_MESSAGE", payload: newMessage });
};

export { try_login, enter, logout, post };
