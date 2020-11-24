import React from "react";
import { connect } from "react-redux";
import { login } from "../../actions";
import "./login.sass";
import Login from "./login";

const LoginContainer = ({
  login,
  password,
  changeLog,
  changePass,
  onEnter,
  closeLogin,
}) => (
  <Login
    render={(error) => {
      return (
        <div className="login-body">
          <i className="fas fa-times close-login" onClick={closeLogin}></i>
          <h2>Вход</h2>
          {error}
          <div className="log">
            <label htmlFor="login">Логин:</label>
            <input
              type="text"
              id="login"
              value={login || ""}
              onChange={(e) => changeLog(e.target.value)}
            />
          </div>
          <div className="pass">
            <label htmlFor="pass">Пароль:</label>
            <input
              type="password"
              id="pass"
              value={password || ""}
              onChange={(e) => changePass(e.target.value)}
            />
          </div>
          <button onClick={onEnter}>Войти</button>
        </div>
      );
    }}
  />
);

const mapStateToProps = ({ auth: { login, password } }) => ({
  login,
  password,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLog: (login) =>
      dispatch({ type: "CHANGE_LOGIN_INPUT", payload: { login } }),
    changePass: (password) =>
      dispatch({ type: "CHANGE_PASS_INPUT", payload: { password } }),
    onEnter: () => dispatch(login()),
    closeLogin: () => dispatch("LOGOUT"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
