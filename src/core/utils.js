import {
  bugStatisticalSeries,
  distributionTable,
  elementCount,
  statisticalSeries,
} from "./main";

/**
 * Нахождение максимального и минимального параметра param в массиве arr
 * @param arr - массив обьектов
 * @param param - параметр обьекта
 * @returns {[number,number]} - кортеж, где 1 элемент - минимум, 2 - максимум
 */
export const findExtremes = (arr, param) => {
  let max = -10000000000000;
  let min = 10000000000000;
  arr.forEach((el) => {
    if (Number(el[param]) > max) {
      max = el[param];
    }
    if (Number(el[param]) < min) {
      min = el[param];
    }
  });
  return [min, max];
};

/**
 * Считает величину интервала
 * @param min - нижняя граница интервала
 * @param max - верхняя граница интервала
 * @param count - количество интервалов
 */
export const calcIntervalValue = (min, max, count) => (max - min) / count;

/**
 * Формула Стёрджесса
 * @param min - нижняя граница интервала
 * @param max - верхняя граница интервала
 * @param count - объем совокупности
 */
export const functionOfSturgess = (min, max, count) =>
  Math.floor(3.322 * Math.log10(count) + 1);

/**
 * Создание вариационного ряда (в программе в виде массива)
 * @param data - массив обьектов
 * @param variantKey - ключ значения варианта в массиве data
 * @return {[number]} - массив значений в порядке возрастания
 */
export const buildVariationSeries = (data, variantKey) =>
  data.map((el) => el[variantKey]).sort((a, b) => a - b);

/**
 * Создание статистического ряда
 * @param data - массив обьектов
 * @param variantKey - ключ значения варианта в массиве data
 * @param intervalCount - количество интервалов
 * @param intervalValue - величина интервала
 * @return {[{ name, description, variants, count, left, right }]} - массив интервалов,
 *         в каждом интервале есть название, описание, массив вариантов, количество вариантов
 */
export const buildStatisticalSeries = (
  data,
  variantKey,
  intervalCount,
  intervalValue
) => {
  const result = [];
  for (let i = 0; i <= intervalCount; i++) {
    const variants = [];
    data.forEach((el) => {
      if (
        Number(el[variantKey]) > intervalValue * i &&
        Number(el[variantKey]) <= intervalValue * (i + 1)
      ) {
        variants.push(el);
      }
    });
    result.push({
      name: "Интервал номер " + (i + 1),
      description: `От ${(intervalValue * i).toFixed(2)} до ${(
        intervalValue *
        (i + 1)
      ).toFixed(2)} включительно`,
      left: intervalValue * i,
      right: intervalValue * (i + 1),
      variants,
      count: variants.length,
    });
  }
  return result;
};

/**
 * Нахождение выборочного среднего
 * @param statisticalSeries - статистический ряд
 * @param allVariantCount - объем совокупности
 * @return {number} - выборочное среднее
 */
export const findSampleAverage = (statisticalSeries, allVariantCount) =>
  /** Внутри reduce считается сигма xi * ni (xi - середина интервала)
   * Далее, найденное значение делится на объем совокупности
   */
  statisticalSeries.reduce(
    (acc, el) => ((el.left + el.right) / 2) * el.count + acc,
    0
  ) / allVariantCount;

/**
 * Создание данных для построения графика эмпирической функции распределения
 * @param statisticalSeries - статистический ряд
 * @param allVariantCount - объем совокупности
 * @return {[string,[{ coordY: number, coordX: number }]]} - массив, 1 элемент которого - текст,
 * 2 - массив координат. Координата - обьект с ключами coordY и coordX
 */
export const getEmpiricalDistributionFunction = (
  statisticalSeries,
  allVariantCount
) => {
  let acc = 0;
  let text = ``;
  const res = [];
  for (let i = 0; i <= statisticalSeries.length; i++) {
    if (i === 0) {
      text += `{ 0 при x <= ${statisticalSeries[i].left.toFixed(2)} \n`;
      res.push({ coordY: 0, coordX: [statisticalSeries[i].left] });
      continue;
    }
    if (i === statisticalSeries.length) {
      text += `{ 1 при x > ${statisticalSeries[i - 1].right.toFixed(2)}`;
      res.push({ coordY: 1, coordX: [statisticalSeries[i - 1].right] });
      continue;
    }
    text +=
      "{" +
      (statisticalSeries[i - 1].count + acc) / allVariantCount +
      ` при ${statisticalSeries[i - 1].left.toFixed(
        2
      )} < x <= ${statisticalSeries[i - 1].right.toFixed(2)} \n`;
    res.push({
      coordY: (statisticalSeries[i - 1].count + acc) / allVariantCount,
      coordX: [statisticalSeries[i].left, statisticalSeries[i - 1].right],
    });
    acc += statisticalSeries[i - 1].count;
  }
  return [text, res];
};

/**
 * Нахождение выборочной дисперсии
 * @param statisticalSeries - статистический ряд
 * @param allVariantCount - объем совокупности
 * @param sampleAverage - выборочное среднее
 * @return {number} - выборочная дисперсия
 */
export const findSampleVariance = (
  statisticalSeries,
  allVariantCount,
  sampleAverage
) => {
  const xi =
    statisticalSeries.reduce(
      (acc, el) => Math.pow((el.left + el.right) / 2, 2) * el.count + acc,
      0
    ) / allVariantCount;
  return xi - sampleAverage * sampleAverage;
};

/**
 * Построение таблицы распределения
 * @param statisticalSeriesLines - статистический ряд для первой СВ (в нашем случае - строки кода)
 * @param statisticalSeriesBugs - статистический ряд для второй СВ (в нашем случае - баги)
 */
export const buildDistributionTable = (
  statisticalSeriesLines,
  statisticalSeriesBugs
) => {
  const res = {};
  statisticalSeriesLines.forEach((lineInterval) => {
    res[`(${lineInterval.left}, ${lineInterval.right}]`] =
      statisticalSeriesBugs.map((bugInterval) => {
        let i = 0;
        lineInterval.variants.forEach((variant) => {
          if (
            variant.bugs <= bugInterval.right &&
            variant.bugs >= bugInterval.left
          ) {
            ++i;
          }
        });
        return i;
      });
  });
  return res;
};

/**
 * Нахождение моды
 * @param statisticalSeries - статистический ряд
 * @return {number} - мода
 */
export const findMode = (statisticalSeries) => {
  let maxInterval = { count: -Infinity };
  statisticalSeries.forEach((interval) =>
    interval.count > maxInterval.count ? (maxInterval = interval) : null
  );
  return (maxInterval.right - maxInterval.left) / 2;
};

/**
 * Нахождение центрального эмпирического момента order порядка
 * @param order - порядок
 * @param statisticalSeries - статистический ряд
 * @param allVariantCount - объем совокупности
 * @param sampleAverage - выборочное среднее
 * @return {number} - центральный эмпирический момент
 */
export const findEmpiricalMoment = (
  order,
  statisticalSeries,
  allVariantCount,
  sampleAverage
) => {
  return (
    statisticalSeries.reduce(
      (acc, el) =>
        Math.pow((el.left + el.right) / 2 - sampleAverage, order) * el.count +
        acc,
      0
    ) / allVariantCount
  );
};

/**
 * Нахождение теоретических вероятностей (показательное распределение)
 * @param statisticalSeries - статистический ряд
 * @param sampleAverage - выборочное среднее
 * @return {[number]} - массив вероятностей
 */
export const findTheoreticalProbabilities = (
  statisticalSeries,
  sampleAverage
) => {
  const lambda = 1 / sampleAverage;
  return statisticalSeries.map(
    (el) =>
      Math.pow(Math.E, -lambda * el.left) - Math.pow(Math.E, -lambda * el.right)
  );
};

/**
 * Построение эмпирической линии регрессии
 * @param distributionTable - таблица распределения
 * @param bugStatisticalSeries - статистический ряд багов
 * @param statisticalSeries - статистический ряд строк кода
 * @returns [x, y] - данные для построения линии
 */
export const buildEmpiricalRegressionLine = (
  distributionTable,
  bugStatisticalSeries,
  statisticalSeries
) => {
  const pred = Object.keys(distributionTable).map((key) =>
    distributionTable[key].reduce((acc, el) => acc + el, 0)
  );
  const resY = [];
  Object.keys(distributionTable).forEach((value, index) => {
    resY.push(
      (1 / pred[index]) *
        distributionTable[value].reduce(
          (acc, value) =>
            value *
              ((bugStatisticalSeries[index].right +
                bugStatisticalSeries[index].left) /
                2) +
            acc,
          0
        )
    );
  });
  const resX = statisticalSeries.map((el) => (el.right + el.left) / 2);
  return [resY, resX];
};

export const getManyData = (
  distributionTable,
  bugStatisticalSeries,
  statisticalSeries,
  elementCount
) => {
  const resY = [];
  const tempRightY2 = [];
  Object.keys(distributionTable).forEach((value, index) => {
    resY.push(
      distributionTable[value].reduce((acc, value) => {
        return (
          value *
            ((bugStatisticalSeries[index].right +
              bugStatisticalSeries[index].left) /
              2) +
          acc
        );
      }, 0)
    );
    tempRightY2.push(
      distributionTable[value].reduce(
        (acc, value) =>
          value *
            ((bugStatisticalSeries[index].right +
              bugStatisticalSeries[index].left) /
              2) *
            ((bugStatisticalSeries[index].right +
              bugStatisticalSeries[index].left) /
              2) +
          acc,
        0
      )
    );
  });
  const rightY =
    (1 / elementCount) * resY.reduce((acc, value) => acc + value, 0);
  const resX = statisticalSeries.map((el) => (el.right + el.left) / 2);
  const tempRightX = [];
  const tempRightX2 = [];
  const rightY2 = tempRightY2.reduce((acc, v) => acc + v, 0);
  Object.keys(distributionTable).forEach((value, index) => {
    tempRightX.push(
      resX[index] *
        distributionTable[value].reduce((acc, value) => acc + value, 0)
    );
    tempRightX2.push(
      resX[index] *
        resX[index] *
        distributionTable[value].reduce((acc, value) => acc + value, 0)
    );
  });
  const temp = [];
  Object.keys(distributionTable).forEach((value, index) => {
    temp.push(
      distributionTable[value].reduce(
        (acc, value) =>
          value *
            ((bugStatisticalSeries[index].right +
              bugStatisticalSeries[index].left) /
              2) *
            resX[index] +
          acc
      ),
      0
    );
  });
  const rightX = (1 / elementCount) * tempRightX.reduce((acc, v) => acc + v, 0);
  const rightX2 = tempRightX2.reduce((acc, v) => acc + v, 0);
  const last = temp.reduce((acc, value) => acc + value, 0);
  return [rightX2, rightY2, last, rightX, rightY];
};
