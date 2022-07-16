import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div>
      {(location.pathname == "/booking" || location.pathname == "/preview") && (
        <div className="footer" style={{ width: "700px" }}>
          Copyright © 2022 NTU magic club.
        </div>
      )}
      {!(
        location.pathname == "/booking" || location.pathname == "/preview"
      ) && <div className="footer">Copyright © 2022 NTU magic club.</div>}
    </div>
  );
};

export default Footer;
