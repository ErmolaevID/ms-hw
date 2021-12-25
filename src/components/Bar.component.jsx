import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const prepareData = (data) => {
  return data.map((el) => {
    return {
      name: el.name,
      count: el.count,
      description: el.description,
    };
  });
};

export const BarStat = ({ data }) => {
  const preparedData = prepareData(data);
  return (
    <>
      <h4>Гистограмма частот</h4>
      <BarChart
        width={1400}
        height={600}
        data={preparedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend
          payload={preparedData.map((el, index) => {
            return {
              value: `Интервал ${index + 1}: ${el.description}`,
              type: "line",
            };
          })}
        />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </>
  );
};
