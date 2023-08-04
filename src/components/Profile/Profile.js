import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { updateUserInfo } from "../../utils/MainApi";
import handleError from "../../utils/handleError";
import { NAME_ERROR, EMAIL_ERROR } from "../../utils/constants";

function Profile({ handleLogout, setCurrentUser }) {
  const [isDisabled, setDisabled] = useState(true);
  const { values, setValues, handleChange, isValid, errors, setErrors } =
    useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser]);

  // Вставка данных в инпуты
  useEffect(() => {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [values, currentUser]);

  // Сабмит формы профиля для обновления
  function handleSubmit(evt) {
    evt.preventDefault();
    setDisabled(true);

    updateUserInfo({ name: values.name, email: values.email })
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        setErrors({});
        alert("Данные изменены");
      })
      .catch((err) => {
        handleError(err);
        setValues(currentUser);
      })
      .finally(() => {
        setDisabled(false);
      });
  }

  return (
    <main>
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form onSubmit={handleSubmit} noValidate>
          <ul className="profile__list">
            <li className="profile__item">
              <label className="profile__item-name" htmlFor="name">
                Имя
              </label>
              <input
                className="profile__item-text"
                type="text"
                id="name"
                name="name"
                placeholder="Имя"
                required
                minLength={2}
                maxLength={30}
                pattern="[a-zA-Zа-яА-Я\-\s]+"
                value={values.name || ""}
                onChange={handleChange}
              />
              <span className="profile__item-error">
                {errors.name ? NAME_ERROR : ""}
              </span>
            </li>
            <li className="profile__item">
              <label className="profile__item-name" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__item-text"
                type="email"
                id="email"
                name="email"
                placeholder="e@mail.ee"
                required
                pattern="\S+@\S+\.\S{2,}"
                value={values.email || ""}
                onChange={handleChange}
              />
              <span className="profile__item-error">
                {errors.email ? EMAIL_ERROR : ""}
              </span>
            </li>
          </ul>

          <button
            type="submit"
            className={`profile__button ${
              isDisabled || !isValid
                ? "profile__button_disabled"
                : "profile__button_active link-hover"
            }`}
            disabled={isDisabled || !isValid}
          >
            Редактировать
          </button>
        </form>
        <Link
          to="/"
          className="profile__button profile__button_warning-color link-hover"
          onClick={handleLogout}
        >
          Выйти из аккаунта
        </Link>
      </section>
    </main>
  );
}

export default Profile;
