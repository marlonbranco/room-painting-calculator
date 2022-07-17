export const areaCalculator = (numberOfItems, measurers) => {
  const { width, height } = measurers;
  return numberOfItems * (width * height);
};
