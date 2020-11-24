import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "../../utils";

import { logout } from "../../actions";

const Header = ({ history, user, onlogout, login }) => {
  return (
    <div className="header">
      <div className="left">
        <h1>Task form Profilance</h1>
        <span>by AlexAdon</span>
      </div>
      <div className="menu">
        <button onClick={() => history.push("/")}>Главная</button>
        <button onClick={() => history.push("/news")}>Новости</button>
        <button onClick={user ? onlogout : login}>
          {user ? "Выйти" : "Войти"}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch("SHOW_AUTH"),
    onlogout: () => dispatch(logout()),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
