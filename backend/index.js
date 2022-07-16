// system must receive an input in square meters
// of each wall in a room
// each wall must have a minimum of 1 square meter
// up to a maximum of 50 square meters
// the total of doors and windows must not exceed 50% of the total area of walls
// the height of the walls with doors must have a minimum of 2.2 meters
// each window has a measurer of 2.00 x 1.20 meters
// each door has a measurer of 0.80 x 1.90 meters
// each liter of paint can cover 5 square meters
// you can ignore the cieling and floor
// the painting buckets vary in size
// the buckets are in the following sizes:
// 0.5 liter, 2.5 liter, 3.6 liter, 18.0 liter

const areaCalculator = (numberOfItems, length, height) => {
  return numberOfItems * (length * height);
};

const wallAreaCalculator = ({ height, length }) =>
  areaCalculator(1, length, height);

const getWindowsTotalArea = (number) => areaCalculator(number, 2.0, 1.2);
const getDoorsTotalArea = (number) => areaCalculator(number, 0.8, 1.9);

const windowsArea = getWindowsTotalArea(5);
const doorsArea = getDoorsTotalArea(5);

console.log("Total windows area: " + windowsArea);
console.log("Total doors area: " + doorsArea);

const room = [
  { height: 2.2, length: 4 },
  { height: 2.2, length: 4 },
  { height: 2.2, length: 5 },
  { height: 2.2, length: 5 },
];

const wallsArea = room.reduce((acc, curr) => {
  const { height, length } = curr;
  return acc + height * length;
}, 0);
const totalAreaOfDoorsAndWindows = windowsArea + doorsArea;

console.log(`Total area of walls: ${wallsArea}`);
console.log(`Total area of Doors and Windows: ${totalAreaOfDoorsAndWindows}`);
if (totalAreaOfDoorsAndWindows > wallsArea / 2) {
  console.error("Error: doors and windows area exceed walls area");
}
console.log(
  `Total area to be painted: ${wallsArea - totalAreaOfDoorsAndWindows}`
);

// calculate the number of buckets needed
// to paint the walls
// each liter of paint can cover 5 square meters
// the buckets are in the following sizes:

const buckets = [0.5, 2.5, 3.6, 18.0];

const totalArea = wallsArea - totalAreaOfDoorsAndWindows;

const bucketsCalculator = (area, buckets) => {
  if (buckets[0] < buckets[1]) buckets.reverse();
  const change = {};
  buckets.forEach((b) => {
    change[b] = Math.floor(area / b);
    area -= b * change[b];
  });
  return change;
};

const bucketsNeeded = bucketsCalculator(totalArea, buckets);
console.log(bucketsNeeded);
// const bucketsNeeded = paintBuckets(totalArea);

// console.log("Wall 2 area: " + wallAreaCalculator(wall2));
// console.log("Wall 3 area: " + wallAreaCalculator(wall3));
// console.log("Wall 4 area: " + wallAreaCalculator(wall4));
