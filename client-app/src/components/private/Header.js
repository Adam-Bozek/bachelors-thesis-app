import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { apiIPAddress, webProtocol, logoutUser } from "../../Utils";

const Header = ({ pageName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const apiAddress = `${webProtocol}://${apiIPAddress}/userLogout`;
    logoutUser(apiAddress, navigate);
  };

  return (
    <>
      <header className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <NavLink
              to="/Dashboard"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
              <span className="fs-4"> {pageName} </span>
            </NavLink>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item">
              {" "}
              <NavLink
                to="/Controller"
                className="nav-link active"
                aria-current="page"
              >
                {" "}
                Spustiť hru{" "}
              </NavLink>{" "}
            </li>
          </ul>
          <div className="col-md-3 text-end">
            <button
              type="button"
              className="btn btn-outline-primary me-2"
              onClick={handleLogout}
            >
              {" "}
              Odhlásiť{" "}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
