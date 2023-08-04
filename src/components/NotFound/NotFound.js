import "./NotFound.css";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="not-found">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button
          className="not-found__link link-hover"
          onClick={() => navigate(-1)}
          type="button"
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
