import { dataStr } from "./fake-data";

export const parseToJS = () => {
  const data = dataStr;
  const fullLines = data.toString().split("\n");
  const result = [];
  fullLines.forEach((fullLine) => {
    const spitedLine = fullLine.split(" ");
    if (isIncorrectElement(spitedLine)) {
      return;
    }
    const object = toObject(spitedLine);
    result.push(object);
  });
  return result;
};

export const isIncorrectElement = (arr) => {
  return arr.length <= 4;
};

export const toObject = (arr) => {
  return {
    repLink: arr[0],
    stars: +arr[1],
    codeLines: +arr[2],
    comments: +arr[3],
    bugs: +arr[4],
  };
};
