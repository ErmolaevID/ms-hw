import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const prepareData = (data) => {
  return data.map((el) => {
    return {
      name: el.name,
      count: el.count,
      description: el.description,
      average: ((el.left + el.right) / 2).toFixed(1),
    };
  });
};

export const FrequencyPolygon = ({ data }) => {
  const preparedData = prepareData(data);
  return (
    <>
      <h4>Полигон частот</h4>
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
        <XAxis dataKey="average" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    </>
  );
};

// <Legend payload={preparedData.map((el, index) => {
//   return { value: `Интервал ${index + 1}: ${el.description}`, type: 'line' }
// })}  />
