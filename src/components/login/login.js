import React from "react";
import { connect } from "react-redux";

import icon from "../../resources/svg/sad-face.svg";

const Login = ({ render, auth_error }) => {
  const error = auth_error ? (
    <div className="errorBlock">
      <div className="message">
        <h2>Ошибка</h2>
        <img src={icon} alt="sadFace" />
        <span>{auth_error}</span>
      </div>
    </div>
  ) : null;

  return <div className="login">{render(error)}</div>;
};

export default connect(({ auth: { auth_error } }) => {
  return {
    auth_error,
  };
}, null)(Login);
