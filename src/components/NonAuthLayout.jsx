import PropTypes from "prop-types";
import React from "react";
// import { useLocation } from "react-router-dom";

const NonAuthLayout = (props) => {
  // const path = useLocation();
  // useEffect(() => {
  //   const title = path.pathname;
  //   let currentage = title.charAt(1).toUpperCase() + title.slice(2);

  //   document.title =
  //     currentage + " | Minible - Responsive Bootstrap 5 Admin Dashboard";
  // }, [path.pathname]);

  return <React.Fragment>{props.children}</React.Fragment>;
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default NonAuthLayout;
