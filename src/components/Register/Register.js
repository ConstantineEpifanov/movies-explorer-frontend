import React from "react";
import Forma from "../Forma/Forma";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useNavigate } from "react-router-dom";
import { register, login } from "../../utils/MainApi";
import handleError from "../../utils/handleError";
import { NAME_ERROR, EMAIL_ERROR } from "../../utils/constants";

function Register({ setLoggedIn, isLoading, setIsLoading, setCurrentUser }) {
  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation();
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);

    register({
      name: values.name,
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        if (res.data) {
          setCurrentUser({ name: res.data.name, email: res.data.email });
        } else {
          return Promise.reject(res.status);
        }
      })
      .then(() => {
        login({
          email: values.email,
          password: values.password,
        }).then((res) => {
          if (res.token) {
            localStorage.setItem("token", res.token);
            setLoggedIn(true);
            navigate("/movies", { replace: true });
            resetForm();
          } else {
            return Promise.reject(res.status);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        handleError(err)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Forma
      handleSubmit={handleSubmit}
      isValid={isValid}
      welcomeText="Добро пожаловать!"
      submitButtonText={
        !isLoading ? "Зарегистрироваться" : "Регистрация в процессе"
      }
      questionText="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
      isLoading={isLoading}
    >
      <label className="forma__input-name" htmlFor="name">
        Имя
      </label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Жак"
        className="forma__form-input"
        required
        minLength={2}
        maxLength={30}
        pattern="[a-zA-Zа-яА-Я\-\s]+"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="forma__error">{errors.name ? NAME_ERROR : ""}</span>
      <label className="forma__input-name" htmlFor="email">
        E-mail
      </label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="e@mail.ee"
        className="forma__form-input"
        value={values.email || ""}
        required
        pattern="\S+@\S+\.\S+"
        onChange={handleChange}
      />
      <span className="forma__error">
        {errors.email ? EMAIL_ERROR : ""}
      </span>
      <label className="forma__input-name" htmlFor="password">
        Пароль
      </label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="СекретныйПароль"
        className="forma__form-input"
        required
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        value={values.password || ""}
      />
      <span className="forma__error">{errors.password || ""}</span>
    </Forma>
  );
}

export default Register;
