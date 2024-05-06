import { Icon } from "../../ui/Icon/Icon";
import "./pageNotFound.css";

export function PageNotFound() {
  return (
    <main className="not-found">
      <div className="not-found__text">
        <h3 className="not-found__title">Страница не найдена</h3>
        <p className="not-found__paragraph">
          Страницы с таким адресом не существует
        </p>
        <a className="not-found__link" href="/">
          Вернуться на главную
        </a>
      </div>
      <Icon className="not-found__icon" type="cancel" />
    </main>
  );
}
