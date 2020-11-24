import React from "react";
import { useSelector } from "react-redux";

import Login from "../login";

const WithPopup = ({ children }) => {
  const show = useSelector(({ auth }) => auth.show);

  const shading = show ? <div className="shading"></div> : null;

  return (
    <div className="withPopup">
      <div className="popup">{show && <Login />}</div>
      {children}
      {shading}
    </div>
  );
};

export default WithPopup;
