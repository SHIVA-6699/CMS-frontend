import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectToken ,selectCurrentRole, selectUser } from "../../redux/features/auth/authSlice";
// //Import Scrollbar
import SimpleBar from "simplebar-react";


// MetisMenu
import MetisMenu from "metismenujs";

//i18n
import { withTranslation } from "react-i18next";
import { TRole } from "../../constants/roles.js";

const SidebarContent = props => {
 
  const token = useAppSelector(selectToken);
  const currentRole=useAppSelector(selectCurrentRole);
  if(!token)
  {
    return <Navigate to={"/login"}/>
  }

  // const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      // scrollElement(item);
      return false;
    }
    // scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = "";
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  // useEffect(() => {
  //   ref.current.recalculate();
  // }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  // function scrollElement(item) {
  //   if (item) {
  //     const currentPosition = item.offsetTop;
  //     if (currentPosition > window.innerHeight) {
  //       ref.current.getScrollElement().scrollTop = currentPosition - 300;
  //     }
  //   }
  // }
  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: "100%" }}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/" className="waves-effect">
                <i className="uil-home-alt"></i>
                <span className="badge rounded-pill bg-primary float-end">
                  01
                </span>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Project Management")}</li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-envelope"></i>
                <span>{"User Management"}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link
                    to={`/${
                      currentRole === TRole.ADMIN
                        ? "permissions"
                        : "not-authorized"
                    }`}
                  >
                    {"Permissions"}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${
                      currentRole === TRole.ADMIN ? "roles" : "not-authorized"
                    }`}
                  >
                    {"Roles"}{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${
                      currentRole === TRole.ADMIN
                        ? "users-category"
                        : "not-authorized"
                    }`}
                  >
                    {"CMS User Category"}{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${
                      currentRole === TRole.ADMIN ? "users" : "not-authorized"
                    }`}
                  >
                    {"CMS User"}{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/${
                      currentRole === TRole.ADMIN
                        ? "forgot-users-password"
                        : "not-authorized"
                    }`}
                  >
                    {"Forgot User Passwords"}{" "}
                  </Link>
                </li>
              </ul>
            </li>
            {/* Content Management */}
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="uil-envelope"></i>
                <span>{"Content Management"}</span>
              </Link>
              <ul className="sub-menu">
                <li>
                  <Link to="/create-article">{"Create Article"}</Link>
                </li>
                <li>
                  <Link to="/create-live">{"Create Live Stream"} </Link>
                </li>
                <li>
                  <Link to="/create-breakingnews">
                    {"Create Breaking News"}{" "}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withTranslation()(SidebarContent);