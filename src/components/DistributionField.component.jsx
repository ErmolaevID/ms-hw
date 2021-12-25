import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ZAxis,
} from "recharts";

const prepareData = (lineS, bugS, s) => {
  let res = [];
  debugger;
  lineS.forEach((el, i) => {
    bugS.forEach((el2, j) => {
      if (s[Object.keys(s)[i]][j] !== 0) {
        res.push({
          x: (el.right + el.left) / 2,
          y: (el2.right + el2.left) / 2,
          z: s[Object.keys(s)[i]][j],
        });
      }
    });
  });
  return res;
};

export const DistributionField = ({ lineS, bugS, s }) => {
  const preparedData = prepareData(lineS, bugS, s);
  return (
    <ScatterChart
      width={1400}
      height={500}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="строки кода интервал" />
      <YAxis type="number" dataKey="y" name="баги интервал" />
      <ZAxis type="number" dataKey="z" range={[0, 2000]} name="кол во багов" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter name="A school" data={preparedData} fill="#8884d8" />
    </ScatterChart>
  );
};
