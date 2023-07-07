import React from "react";
import Forma from "../Forma/Forma";

function Register() {
  return (
    <Forma
      welcomeText="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      questionText="Уже зарегистрированы?"
      linkText="Войти"
      link="/signin"
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
        minLength="2"
        maxLength="40"
      />
      <span className="forma__error"></span>
    </Forma>
  );
}

export default Register;
