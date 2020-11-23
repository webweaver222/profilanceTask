import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "../../utils";

const Header = ({ history, user, logout, login }) => {
  return (
    <div className="header">
      <div className="left">
        <h1>Task form Profilance</h1>
        <span>by AlexAdon</span>
      </div>
      <div className="menu">
        <button onClick={() => history.push("/")}>Главная</button>
        <button onClick={() => history.push("/news")}>Новости</button>
        <button onClick={user ? logout : login}>
          {user ? "Выйти" : "Войти"}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
