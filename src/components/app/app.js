import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDidMountEffect } from "../customHooks/didMountEffect";
import { Route, Switch, withRouter } from "react-router-dom";

//import Preloader from '../preloader'

import Login from "../login";
import Header from "../Header";
import News from "../News";

import WithPopup from "../hoc/withPopup";
import bgc from "../../resources/svg/background.html";

import { try_login } from "../../actions";

const App = ({ currentUser, mount }) => {
  useEffect(() => {
    mount();
  }, []);

  useDidMountEffect(() => {}, [currentUser]);

  return (
    <div className="app">
      <WithPopup>
        <Header />
        <main>
          <Switch>
            <Route exact path="/">
              <div className="home-page">
                <h1>Привет, гость</h1>
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
  ({ currentUser }) => ({ currentUser }),
  (dispatch) => {
    return {
      mount: () => dispatch(try_login()),
    };
  }
)(App);
