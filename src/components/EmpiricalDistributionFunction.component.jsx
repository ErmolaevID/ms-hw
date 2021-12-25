import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const prepareData = (data) => {
  const res = [];
  data.forEach((el, i) => {
    debugger;
    if (i === 0) {
      return;
    }
    res.push({
      name: (i + 1 > data.length ? "∞" : i + 1).toString(),
      data: [
        { category: el.coordX[0].toFixed(2), value: el.coordY.toFixed(2) },
        {
          category:
            data[i + 1 > data.length ? 10 : i + 1]?.coordX[0].toFixed(2) ?? "∞",
          value: el.coordY.toFixed(2),
        },
      ],
    });
  });
  console.log(res);
  return res;
  // return data.map((el) => {
  //   return {
  //     name: el.coordX[0].toFixed(2),
  //     count: el.coordY.toFixed(2),
  //   };
  // })
};

export const EmpiricalDistributionFunction = ({ data }) => {
  const preparedData = prepareData(data[1]);
  return (
    <>
      <h4>Эмпирическая функция распределения</h4>
      <pre>f(x) = </pre>
      <pre>{data[0]}</pre>
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
        <XAxis
          dataKey="category"
          type="category"
          allowDuplicatedCategory={false}
        />
        <YAxis dataKey="value" />
        <Tooltip />
        {preparedData.map((el) => (
          <Line
            dataKey="value"
            data={el.data}
            stroke="#82ca9d"
            name={el.name}
            key={el.name}
          />
        ))}
      </LineChart>
    </>
  );
};
