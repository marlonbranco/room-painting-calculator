import ErrorsApp from '@errors/ErrorsApp';
import IRoomDTO from '../dtos/IRoomDTO';
import { areaCalculator } from '../utils/areaCalculator';

const buckets = [0.5, 2.5, 3.6, 18];
const windowMeasurer = {
  width: 2,
  height: 1.2,
};
const doorMeasurer = {
  width: 0.8,
  height: 1.9,
};

export default class GetBucketsAmountService {
  public async execute(room: IRoomDTO): Promise<any> {
    const { walls, numberOfDoors, numberOfWindows } = room;
    const windowsArea = areaCalculator(numberOfWindows, windowMeasurer);
    const doorsArea = areaCalculator(numberOfDoors, doorMeasurer);

    const totalAreaOfDoorsAndWindows = windowsArea + doorsArea;

    walls.map(({ width, height }) => {
      const AreaInSquareMeter = width * height;

      if (AreaInSquareMeter < 1 || AreaInSquareMeter > 50) {
        throw new ErrorsApp(
          'The walls must have a minimum of 1 square meter and up to a maximum of 50 square meters',
          400,
        );
      }
    });

    const wallsArea = walls.reduce((acc, curr) => {
      const { height, width } = curr;
      return acc + height * width;
    }, 0);

    const areaToBePainted = wallsArea - totalAreaOfDoorsAndWindows;

    console.log(`Total area of walls: ${wallsArea}`);
    console.log(
      `Total area of Doors and Windows: ${totalAreaOfDoorsAndWindows}`,
    );

    if (totalAreaOfDoorsAndWindows > wallsArea / 2) {
      console.error('Error: doors and windows area exceed walls area');
    }
    console.log(
      `Total area to be painted: ${wallsArea - totalAreaOfDoorsAndWindows}`,
    );

    console.log('Total windows area: ' + windowsArea);
    console.log('Total doors area: ' + doorsArea);

    const bucketsCalculator = (area, buckets) => {
      buckets.reverse();
      const result = {};
      for (const bucket of buckets) {
        const bucketsAmount = Math.round(area / bucket);
        console.log(bucketsAmount, area);
        result[bucket] = bucketsAmount;
        area -= bucket * bucketsAmount;
      }
      return result;
    };

    const paintLiterNeeded = Math.ceil(areaToBePainted / 5);
    const notRoundedUpwardAmountRequired = areaToBePainted / 5;

    console.log('Paint liter needed: ' + paintLiterNeeded);
    console.log(
      'Not rounded upward paint liter needed: ' +
        notRoundedUpwardAmountRequired,
    );

    const bucketsNeeded = bucketsCalculator(paintLiterNeeded, buckets);
    console.log(bucketsNeeded);

    return bucketsNeeded;
  }
}
