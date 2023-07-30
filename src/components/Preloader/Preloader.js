import React from "react";
import "./Preloader.css";

const Preloader = (isPreloader) => {
  return (
    <>
      {isPreloader && (
        <div className="preloader">
          <div className="preloader__container">
            <span className="preloader__round"></span>
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
