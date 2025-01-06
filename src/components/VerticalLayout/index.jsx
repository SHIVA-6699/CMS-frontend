import PropTypes from "prop-types";
import React, { useEffect } from "react";


import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = (props) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const toggleMenuCallback = () => {
    const leftSideBarType = "default"; 
    if (leftSideBarType === "default") {
      console.log("Change sidebar size to condensed", isMobile);
    } else if (leftSideBarType === "condensed") {
      console.log("Change sidebar size to default", isMobile);
    }
  };

  const pathName = "";

  useEffect(() => {
    const preloader = document.getElementById("preloader");
    const status = document.getElementById("status");
    if (preloader && status) {
      preloader.style.display = "block";
      status.style.display = "block";

      setTimeout(function () {
        preloader.style.display = "none";
        status.style.display = "none";
      }, 2500);
    }
  }, [pathName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <i className="uil-shutter-alt spin-icon"></i>
          </div>
        </div>
      </div>
      <div id="layout-wrapper">
        <Header toggleMenuCallback={toggleMenuCallback} />
        <Sidebar theme="default" isMobile={isMobile} />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
};

export default Layout;
