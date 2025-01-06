import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";

// users
import user4 from "../../assets/images/users/avatar-4.jpg";

const ProfileMenu = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      const obj = JSON.parse(authUser);
      setUsername(obj.username || obj.name || "Admin");
    }
  }, []);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login"); // Redirect to login page
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user4}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
            {username}
          </span>{" "}
          <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            <i className="uil uil-user-circle font-size-18 align-middle text-muted me-1"></i>
            {"View Profile"}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="#">
            <i className="uil uil-cog font-size-18 align-middle me-1 text-muted"></i>
            {"Settings"}
            <span className="badge bg-soft-success rounded-pill mt-1 ms-2">
              03
            </span>
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <DropdownItem onClick={handleLogout}>
            <i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i>
            <span>{"Logout"}</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  t: PropTypes.any,
};

export default ProfileMenu;
