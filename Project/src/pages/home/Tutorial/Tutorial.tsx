import "./tutorial.css";

export function Tutorial() {
  return (
    <div className="tutorial">
      <h3 className="home__title">Ура! Теперь можно начать работать:</h3>
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
          за&nbsp;&laquo;помидором&raquo;, пока задача не&nbsp;будет выполнена.
          Каждые 4&nbsp;&laquo;помидора&raquo; делайте длинный перерыв
          (15-30&nbsp;минут)
        </li>
        <li className="tutorial__item">
          Если вас отвлекли, вы&nbsp;можете поставить таймер на&nbsp;паузу,
          и&nbsp;вернуться к задаче позже.
        </li>
        <li className="tutorial__item">
          Если&nbsp;вы, поставив таймер на&nbsp;паузу, успели закончить задание,
          вы&nbsp;можете пропустить его, нажав на&nbsp;кнопку
          &laquo;Сделано&raquo;. Если вы хотите перезапустить таймер, нажмите на
          "Стоп"
        </li>
        <li className="tutorial__item">
          &laquo;Помидоры&raquo; засчитываются только за&nbsp;таймеры,
          завершенные &laquo;естественно&raquo; (то&nbsp;есть за&nbsp;те,
          в&nbsp;которых вышло время).
        </li>
      </ul>
    </div>
  );
}
