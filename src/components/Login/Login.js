import React from "react";
import Forma from "../Forma/Forma";

function Login() {
  return (
    <Forma
      welcomeText="Рады видеть!"
      submitButtonText="Войти"
      questionText="Ещё не зарегистрированы?"
      linkText="Регистрация"
      link="/signup"
    />
  );
}

export default Login;
