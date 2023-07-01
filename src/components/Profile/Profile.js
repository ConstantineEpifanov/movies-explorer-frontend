import { Link } from "react-router-dom";
import { useState } from "react";

function Profile() {
  const [isDisabled, setDisabled] = useState(true);

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form>
          <ul
            className={`profile__list ${
              isDisabled ? "" : "profile__list_active"
            }`}
          >
            <li className="profile__item">
              <label className="profile__item-name" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__item-text"
                type="text"
                id="name"
                placeholder="Имя"
                required
                disabled={isDisabled}
                minLength="2"
                maxLength="40"
              />
            </li>
            <li className="profile__item">
              <label className="profile__item-name" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__item-text"
                type="email"
                id="email"
                placeholder="e@mail.ee"
                required
                disabled={isDisabled}
              />
            </li>
          </ul>
        </form>
        <button
          type="button"
          className={`profile__button ${
            isDisabled ? "" : "profile__button_active"
          } link-hover`}
          onClick={() => setDisabled((prevState) => !prevState)}
        >
          {isDisabled ? "Редактировать" : "Сохранить"}
        </button>
        <Link
          to="/"
          className="profile__button profile__button_warning-color link-hover"
        >
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  );
}

export default Profile;
