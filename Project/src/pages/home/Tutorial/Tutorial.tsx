import "../home.css";

export function Tutorial() {
  return (
    <div className="tutorial">
      <h3 className="tutorial__title">Ура! Теперь можно начать работать:</h3>
      <ul className="tutorial__list">
        <li className="tutorial__item">
          Выберите категорию и&nbsp;напишите название текущей задачи
        </li>
        <li className="tutorial__item">
          Запустите таймер (&laquo;помидор&raquo;)
        </li>
        <li className="tutorial__item">
          Работайте пока &laquo;помидор&raquo; не&nbsp;прозвонит
        </li>
        <li className="tutorial__item">
          Сделайте короткий перерыв (3-5&nbsp;минут)
        </li>
        <li className="tutorial__item">
          Продолжайте работать &laquo;помидор&raquo;
          за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будут выполнена.
          Каждые 4&nbsp;&laquo;помидора&raquo; делайте длинный перерыв
          (15-30&nbsp;минут).
        </li>
      </ul>
    </div>
  );
}
