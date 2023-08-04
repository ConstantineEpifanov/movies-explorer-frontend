import React from "react";
import Forma from "../Forma/Forma";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { login } from "../../utils/MainApi";
import { useNavigate } from "react-router-dom";
import handleError from "../../utils/handleError";
import { EMAIL_ERROR } from "../../utils/constants";

function Login({ setLoggedIn, isLoading, setIsLoading }) {
  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation();

  const navigate = useNavigate();

  function handleSubmit(evt) {
    setIsLoading(true);
    evt.preventDefault();

    login({
      email: values.email,
      password: values.password,
    })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          navigate("/movies", { replace: true });
          resetForm();
        } else {
          return Promise.reject(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Forma
      handleSubmit={handleSubmit}
      isValid={isValid}
      isLoading={isLoading}
      welcomeText="Рады видеть!"
      submitButtonText={!isLoading ? "Войти" : "Заходим"}
      questionText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
    >
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
      <span className="forma__error">{errors.email ? EMAIL_ERROR : ""}</span>
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
        maxLength={40}
        onChange={handleChange}
        value={values.password || ""}
      />
      <span className="forma__error">{errors.password || ""}</span>
    </Forma>
  );
}

export default Login;
