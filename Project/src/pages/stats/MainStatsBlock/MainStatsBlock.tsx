import "./mainsStatsBlock.css";

export function MainStatsBlock() {
  return (
    <div className="stats__main-block">
      <div className="stats__left">
        <div className="stats__curr-day curr-day">
          <h4 className="curr-day__title">Понедельник</h4>
          <p className="curr-day__paragraph">
            Вы&nbsp;работали над задачами в&nbsp;течение
            <span className="curr-day__time"> 51&nbsp;минуты</span>
          </p>
        </div>

        <div className="stats__curr-tomatoes curr-tomatoes">
          <div className="curr-tomatoes__image-block">
            <img className="curr-tomatoes__img" src="/img/tomato1.png"></img>
            <span className="curr-tomatoes__count1">х&nbsp;2</span>
          </div>
          <p className="curr-tomatoes__count2">2 помидора</p>
        </div>
      </div>
      <div className="stats__right"></div>
    </div>
  );
}
