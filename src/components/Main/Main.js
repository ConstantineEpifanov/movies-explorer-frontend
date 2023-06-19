import React from "react";
import Promo from "../Main/Promo/Promo";
import AboutProject from "../Main/AboutProject/AboutProject";
import Techs from "../Main/Techs/Techs";
import AboutMe from "../Main/AboutMe/AboutMe";
import Portfolio from "../Main//Portfolio/Portfolio";

function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
