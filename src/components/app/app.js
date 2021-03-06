import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Header from "../Header";
import News from "../News";

import WithPopup from "../hoc/withPopup";
import bgc from "../../resources/svg/background.html";

import { try_login } from "../../actions";

const App = ({ user, mount }) => {
  useEffect(() => {
    mount();
  }, []);

  return (
    <div className="app">
      <WithPopup>
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <div className="home-page">
                <h1>Привет, {user ? user.login : "гость"}</h1>
              </div>
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </main>
        <div className="background" dangerouslySetInnerHTML={{ __html: bgc }} />
      </WithPopup>
    </div>
  );
};

export default connect(
  ({ auth: { user } }) => ({ user }),
  (dispatch) => {
    return {
      mount: () => dispatch(try_login()),
    };
  }
)(App);
