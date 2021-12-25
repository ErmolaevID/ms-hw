import { parseToJS } from "./data-parser-to-js";
import * as f from "./utils";

/** Получаем данные из файла */
const data = parseToJS();

/** Вариационный ряд */
const variationSeries = f.buildVariationSeries(data, "codeLines");

/** Объем совокупности */
const elementCount = data.length;

/** Максимальная и минимальная СВ (строки кода) */
const [minCodeLines, maxCodeLines] = f.findExtremes(data, "codeLines");

/** Количество интервалов */
const intervalCount = f.functionOfSturgess(
  minCodeLines,
  maxCodeLines,
  elementCount
);

/** Величина интервала */
const intervalValue = f.calcIntervalValue(
  minCodeLines,
  maxCodeLines,
  intervalCount
);

/** Статистический ряд (строки кода) */
const statisticalSeries = f.buildStatisticalSeries(
  data,
  "codeLines",
  intervalCount,
  intervalValue
);

/** Выборочная функция распределения (строки кода) */
const empiricalDistributionFunctionData = f.getEmpiricalDistributionFunction(
  statisticalSeries,
  elementCount
);

/** Выборочное среднее (строки кода) */
const sampleAverage = f.findSampleAverage(statisticalSeries, elementCount);

/** Выборочная дисперсия (смещенная оценка) (строки кода) */
const sampleVariance = f.findSampleVariance(
  statisticalSeries,
  elementCount,
  sampleAverage
);

/** Среднее квадратическое отклонение (строки кода) */
const meanSquareDeviation = Math.sqrt(sampleVariance);

/** Генеральная дисперсия (несмещенная состоятельная оценка) (строки кода) */
const sampleVarianceTrue = (elementCount / (elementCount - 1)) * sampleVariance;

/** Исправленное выборочное среднее квадратическое отклонение (строки кода) */
const meanSquareDeviationTrue = Math.sqrt(sampleVarianceTrue);

/** Мода (строки кода) */
const mode = f.findMode(statisticalSeries);

/** Коэффицент асимметрии (строки кода) */
const asymmetry = (sampleAverage - mode) / meanSquareDeviation;

/** Центральный эмпирический момент 4 порядка (строки кода) */
const empiricalMoment4 = f.findEmpiricalMoment(
  4,
  statisticalSeries,
  elementCount,
  sampleAverage
);

/** Коэффицент эксцесса (строки кода) */
const excess = empiricalMoment4 / Math.pow(meanSquareDeviation, 4) - 3;

/** Максимальная и минимальная СВ (баги) */
const [minBugCount, maxBugCount] = f.findExtremes(data, "bugs");

/** Количество интервалов (баги) */
const bugIntervalCount = f.functionOfSturgess(
  minBugCount,
  maxBugCount,
  elementCount
);

/** Величина интервала (баги) */
const bugIntervalValue = f.calcIntervalValue(
  minBugCount,
  maxBugCount,
  bugIntervalCount
);

/** Статистический ряд для Y (нужен для построения таблицы распределения)  */
const bugStatisticalSeries = f.buildStatisticalSeries(
  data,
  "bugs",
  bugIntervalCount,
  bugIntervalValue
);

/** Таблица распределения */
const distributionTable = f.buildDistributionTable(
  statisticalSeries,
  bugStatisticalSeries
);

/** Уровень значимости */
const significanceLevel = 0.05;

/** Число степеней свободы */
const freedomDegressCount = intervalCount - 1 - 1;

/** Критическое значение. Хардкод при условии что r = 5, а = 0.05 */
const criticalValue = 11.07;

/** Теоретические вероятности */
const theoreticalProbabilities = f.findTheoreticalProbabilities(
  statisticalSeries,
  sampleAverage
);

/** Считаем ((ni-npi)^2)/npi. На выходе получаем массив данных значений для каждого интервала */
const yaYstal = statisticalSeries.map(
  (el, i) =>
    (Math.pow(el.count - el.count * theoreticalProbabilities[i], 2) /
      el.count) *
    theoreticalProbabilities[i]
);

/** Хи-квадрат наблюдаемый. Сумма ((ni-npi)^2)/npi */
const xi = yaYstal.reduce((acc, num) => acc + num, 0);

/** Условные средние */
const [resY, resX] = f.buildEmpiricalRegressionLine(
  distributionTable,
  bugStatisticalSeries,
  statisticalSeries
);

/** Данные для нахождения выборочного коэффицента лин корреляции */
/**
 * rightX = 1/n * Σxi*nxi
 * rightY = 1/n * Σyi*nyi
 * rightX2 = Σxi^2 * nxi
 * rightY2 = Σyi^2 * nyi
 * last = Σxi * yj * nij
 */
const [rightX2, rightY2, last, rightX, rightY] = f.getManyData(
  distributionTable,
  bugStatisticalSeries,
  statisticalSeries,
  elementCount
);

/** Среднее квадратическое отклонение (строки кода) */
const qX = Math.sqrt((1 / elementCount) * rightX2 - rightX * rightX);
/** Среднее квадратическое отклонение (баги) */
const qY = Math.sqrt((1 / elementCount) * rightY2 - rightY * rightY);

/** Ковариация */
const cov = (1 / elementCount) * last - rightX * rightY;

/** Коэффицент корреляции */
const kc = cov / (qX * qY);

//const res = Math.abs(kc) * Math.sqrt(elementCount - 1);

/** Функци для постройки прямой линии регресии по формуле y - y' = r * σx/σy * (x - x'), где y' и x' - условные средние  */
const l = (x) => (483 / 142685) * x - 3172096 / 142685;

/** Экспортируем из файла то, что нужно для отображения */
export {
  data,
  variationSeries,
  statisticalSeries,
  empiricalDistributionFunctionData,
  sampleAverage,
  sampleVariance,
  meanSquareDeviation,
  mode,
  asymmetry,
  empiricalMoment4,
  excess,
  sampleVarianceTrue,
  meanSquareDeviationTrue,
  bugStatisticalSeries,
  distributionTable,
  theoreticalProbabilities,
  resX,
  resY,
  significanceLevel,
  freedomDegressCount,
  criticalValue,
  xi,
  elementCount,
  minCodeLines,
  maxCodeLines,
  intervalCount,
  intervalValue,
  minBugCount,
  maxBugCount,
  bugIntervalCount,
  bugIntervalValue,
  qX,
  qY,
  kc,
  l,
};
