import React from "react";

const WithPopup = ({ children, show = true }) => {
  const shading = show ? <div className="shading"></div> : null;

  return (
    <div className="withPopup">
      <div className="popup">12324</div>
      {children}
      {shading}
    </div>
  );
};

export default WithPopup;
