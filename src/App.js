import "./App.css";
import * as data from "./core/main";
import { FrequencyPolygon } from "./components/FrequencyPolygon.component";
import { BarStat } from "./components/Bar.component";
import { EmpiricalDistributionFunction } from "./components/EmpiricalDistributionFunction.component";
import { Table } from "./components/Table.component";
import { DistributionTable } from "./components/DistributionTable.component";
import { DistributionField } from "./components/DistributionField.component";
import { LastGr } from "./components/Last-Gr";
import { Selection } from "./components/Selection.component";
import { bugStatisticalSeries } from "./core/main";

function App() {
  return (
    <div className="wrapper">
      <h1>Исследовательская работа</h1>
      <h2>Выполнил: Ермолаев Илья Дмитриевич, РИ-200004</h2>
      <h2>Преподаватель: Поторочина Ксения Сергеевна</h2>
      <h3>Предмет исследования:</h3>
      <p>
        Зависимость количества значимых строк кода и количества баг-тикетов{" "}
      </p>
      <h3>Источник данных</h3>
      <p>
        Все данные были получены случайным образом с{" "}
        <a href="https://github.com/">гитхаба</a>. <br />
        Количество строк кода определялось с помощью CLI утилиты{" "}
        <a href="https://github.com/AlDanial/cloc">cloc</a>. <br />
        Количестов баг-тикетов считалось у каждого репозитория либо во вкладке
        issues, либо в системах отслеживания багов. <br />
      </p>
      <h3>Случайные величины:</h3>
      <p>
        X - кол-во значимых строк кода <br />Y - кол-во баг-тикетов
      </p>
      <Selection data={data.data} />
      <h2>Часть 1</h2>
      <p>Объем совокупности: {data.elementCount}</p>
      <p>Минимальная варианта: {data.minCodeLines}</p>
      <p>Максимальная варианта: {data.maxCodeLines}</p>
      <p>Количество интервалов: {data.intervalCount}</p>
      <p>Величина интервала: {data.intervalValue.toFixed(2)}</p>
      <h3>Статистический ряд</h3>
      <Table data={data.statisticalSeries} />
      <FrequencyPolygon data={data.statisticalSeries} />
      <BarStat data={data.statisticalSeries} />
      <EmpiricalDistributionFunction
        data={data.empiricalDistributionFunctionData}
      />
      <h3>Значения</h3>
      <p>Выборочное среднее: {data.sampleAverage.toFixed(2)}</p>
      <p>
        Выборочная дисперсия (смещенная оценка):{" "}
        {data.sampleVariance.toFixed(2)}
      </p>
      <p>
        Среднее квадратическое отклонение: {data.meanSquareDeviation.toFixed(2)}
      </p>
      <p>
        Генеральная дисперсия (несмещенная состоятельная оценка):{" "}
        {data.sampleVarianceTrue.toFixed(2)}
      </p>
      <p>
        Исправленное выборочное среднее квадратическое отклонение:{" "}
        {data.meanSquareDeviationTrue.toFixed(2)}
      </p>
      <p>Мода: {data.mode.toFixed(2)}</p>
      <p>Коэффицент асимметрии: {data.asymmetry.toFixed(2)}</p>
      <p>
        Центральный эмпирический момент 4 порядка:{" "}
        {data.empiricalMoment4.toFixed(2)}
      </p>
      <p>Коэффицент эксцесса: {data.excess.toFixed(2)}</p>
      <h3>Гипотезы</h3>
      <p>
        По виду полигона и гистограммы частот, я выдвигаю предположение, что
        изучаемая СВ имеет показательный закон распределения
      </p>
      <DistributionTable
        bugS={data.bugStatisticalSeries}
        data={data.distributionTable}
      />
      <DistributionField
        bugS={data.bugStatisticalSeries}
        lineS={data.statisticalSeries}
        s={data.distributionTable}
      />
      <p>Уровень значимости: {data.significanceLevel}</p>
      <p>Число степеней свободы: {data.freedomDegressCount}</p>
      <p>Критическое значение: {data.criticalValue}</p>
      <h3>Теоретические вероятности</h3>
      {data.theoreticalProbabilities.map((x) => (
        <div>{x.toFixed(2)}</div>
      ))}
      <p>Хи-квадрат наблюдаемый: {data.xi}</p>
      <p>Сравним Хи-квадрт теоретический и наблюдаемый</p>
      <div>
        <span>{data.xi}</span> {"<"} {data.criticalValue}
      </div>
      <p>
        Таким образом, при выбранном уровне значимости Хи-квадрат не принадлежит
        критической области, а значит гипотезу о показательном распределении
        следует принять
      </p>
      <h3>Вывод</h3>
      <p>
        Гипотеза о том, что наше распределение является показательным,
        подтвердилась
      </p>
      <h2>Часть 2</h2>
      <p>Минимальная варианта (баги): {data.minBugCount}</p>
      <p>Максимальная варианта (баги): {data.maxBugCount}</p>
      <p>Количество интервалов (баги): {data.bugIntervalCount}</p>
      <p>Величина интервала (баги): {data.bugIntervalValue.toFixed(2)}</p>
      <h3>Статистический ряд (баги)</h3>
      <Table data={bugStatisticalSeries} />
      <p>Среднее квадратическое отклонение (строки кода): {data.qX}</p>
      <p>Среднее квадратическое отклонение (строки баги): {data.qY}</p>
      <p>Коэффицент корреляции: {data.kc}</p>
      <p>
        Так как коэффицент корреляции близок к 1, то мы можем утверждать, что
        связь между количеством строк кода и количеством баг-тикетов достаточно
        вероятна
      </p>
      <LastGr x={data.resX} y={data.resY} func={data.l} />
      <h3>Вывод</h3>
      <p>
        Коэффицент корреляции почти равен 1. Это означает, что выбранные нами СВ, с большой вероятностью, прямо связаны.
        То есть при росте количества значимых строк кода - растет количестов багов
      </p>
    </div>
  );
}

export default App;

// <div>λ = {data.sampleAverage.toFixed(2)}</div>
// <div>изучаемая СВ имеет закон распределения: P(X = k) = p<sub>k</sub> = ({data.sampleAverage.toFixed(2)}<sup>k</sup>*e<sup>-{data.sampleAverage.toFixed(2)}</sup>)/k!</div>
