export const VariationSeries = ({ data }) => {
  return (
    <>
      <h4>Вариационный ряд</h4>
      <table border={1}>
        <tbody>
          <tr>
            <th>X</th>
            {data.map((n, i) => (
              <th key={i}>{n}</th>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};
