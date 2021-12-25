import { useState } from "react";

export const Selection = ({ data }) => {
  const [isShowSelection, setShowSelection] = useState(false);
  return (
    <>
      <button onClick={() => setShowSelection(!isShowSelection)}>
        {isShowSelection ? "Скрыть выборку" : "Показать выборку"}
      </button>
      {isShowSelection ? (
        <table border={1}>
          <tbody>
            <tr>
              <th>X</th>
              <th>Y</th>
            </tr>
            {data.map((el, i) => (
              <tr>
                <td>{el.codeLines}</td> <td>{el.bugs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};
