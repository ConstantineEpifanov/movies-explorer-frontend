import promo__logo from "../../images/promo__logo.svg";
import { HashLink } from "react-router-hash-link";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <HashLink to="#aboutP" className="promo__anchor-link link-hover">
          Узнать больше
        </HashLink>
      </div>
      <img
        className="promo__logo"
        src={promo__logo}
        alt="Земной шар из множества слов WEB"
      />
    </section>
  );
}

export default Promo;
