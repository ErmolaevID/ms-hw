export const Table = ({ data }) => {
  return (
    <table border={1}>
      <tbody>
        <tr>
          <th>Интервал</th>
          <th>
            n<sub>i</sub>
          </th>
          <th>
            x<sub>i</sub>
          </th>
        </tr>
        {data.map((el, i) => (
          <tr>
            <td>
              {`${i ? "(" : "["}${el.left.toFixed(2)}, ${el.right.toFixed(2)}]`}
            </td>
            <td>{el.count}</td>
            <td>{((el.right + el.left) / 2).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
