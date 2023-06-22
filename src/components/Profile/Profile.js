import { Link } from "react-router-dom";

function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
      <form>
        <ul className="profile__list">
          <li className="profile__item">
            <label className="profile__item-name" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__item-text"
              type="text"
              id="name"
              value="Виталий"
              placeholder="Имя"
              required
              disabled
            />
          </li>
          <div className="line"></div>
          <li className="profile__item">
            <label className="profile__item-name" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__item-text"
              type="email"
              id="email"
              value="pochta@yandex.ru"
              placeholder="e@mail.ee"
              required
              disabled
            />
          </li>
        </ul>
      </form>
      <button className="profile__button link-hover">Редактировать</button>
      <Link
        to="/"
        className="profile__button profile__button_warning-color link-hover"
      >
        Выйти из аккаунта
      </Link>
    </section>
  );
}

export default Profile;
