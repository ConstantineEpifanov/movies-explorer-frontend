import React from "react";
import Forma from "../Forma/Forma";

function Register() {
  return (
    <Forma
      welcomeText="Добро пожаловать!"
      submitButtonText="Зарегистрироваться"
      questionText="Уже зарегистрированы?"
      linkText="Войти"
      link="/sign-in"
    >
      <p className="forma__input-name">Имя</p>
      <input
        id="name"
        name="name"
        type="name"
        placeholder="Жак"
        className="forma__form-input"
        required
      />
    </Forma>
  );
}

export default Register;
