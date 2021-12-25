export const DistributionTable = ({ bugS, data }) => {
  return (
    <table border={1}>
      <tbody>
        <tr>
          <th>X/Y</th>
          {bugS.map((el, i) => (
            <th>{`${i ? "(" : "["}${el.left.toFixed(2)}, ${el.right.toFixed(
              2
            )}]`}</th>
          ))}
        </tr>
        {Object.keys(data).map((key) => (
          <tr>
            <td>{key}</td>
            {data[key].map((el) => (
              <td>{el}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
