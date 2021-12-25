import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const prepareData = (first, second, func) => {
  return first.map((el, i) => {
    return {
      x: first[i].toFixed(2),
      y: second[i],
      z: func(first[i]),
    };
  });
};

export const LastGr = ({ x, y, func }) => {
  const preparedData = prepareData(x, y, func);
  return (
    <>
      <h3>Эмпирическая и прямая линии регрессии</h3>
      <p>Синий цвет - прямая линия</p>
      <p>Красный цвет - эмпирическая</p>
      <LineChart
        width={1400}
        height={500}
        data={preparedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="y" stroke="red" />
        <Line type="monotone" dataKey="z" stroke="blue" />
      </LineChart>
    </>
  );
};
