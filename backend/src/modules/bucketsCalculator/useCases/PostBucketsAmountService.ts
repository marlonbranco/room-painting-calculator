import ErrorsApp from '@errors/ErrorsApp';
import IRoomDTO from '../dtos/IRoomDTO';
import { areaCalculator } from '../utils/areaCalculator';

// buckets in mililiters
const buckets = [18, 3.6, 2.5, 0.5];
const windowMeasurer = {
  width: 2,
  height: 1.2,
};
const doorMeasurer = {
  width: 0.8,
  height: 1.9,
};

export default class PostBucketsAmountService {
  public async execute(room: IRoomDTO): Promise<any> {
    const { walls } = room;
    console.log(walls);

    const numberOfWindows = walls.reduce((acc, wall) => {
      return acc + wall.numberOfWindows;
    }, 0);

    const numberOfDoors = walls.reduce((acc, wall) => {
      return acc + wall.numberOfDoors;
    }, 0);

    const windowsArea = areaCalculator(numberOfWindows, windowMeasurer);
    const doorsArea = areaCalculator(numberOfDoors, doorMeasurer);

    const totalAreaOfDoorsAndWindows = windowsArea + doorsArea;

    walls.map(({ width, height, numberOfDoors, numberOfWindows }) => {
      const AreaInSquareMeter = width * height;

      if (AreaInSquareMeter < 1 || AreaInSquareMeter > 50) {
        throw new ErrorsApp(
          'The walls must have a minimum of 1 square meter and up to a maximum of 50 square meters',
          400,
        );
      }

      if (numberOfDoors % 1 !== 0) {
        throw new ErrorsApp('The number of Doors must be an integer', 400);
      }

      if (numberOfWindows % 1 !== 0) {
        throw new ErrorsApp('The number of Windows must be an integer', 400);
      }

      if (numberOfDoors > 0 && height < 2.2) {
        throw new ErrorsApp(
          'Walls with doors must have a height of at least 2.2 meters',
          400,
        );
      }

      if (numberOfDoors > 0 && width < 0.8) {
        throw new ErrorsApp(
          'Walls with doors must have a width of at least 0.8 meters',
          400,
        );
      }

      if (numberOfWindows > 0 && height < 1.2) {
        throw new ErrorsApp(
          'Walls with windows must have a height of at least 1.2 meters',
          400,
        );
      }
      if (numberOfWindows > 0 && width < 2) {
        throw new ErrorsApp(
          'Walls with windows must have a width of at least 2 meters',
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
      throw new ErrorsApp(
        'The total area of doors and windows is exceeding 50% of the walls area',
        400,
      );
    }
    console.log(
      `Total area to be painted: ${wallsArea - totalAreaOfDoorsAndWindows}`,
    );

    const bucketsCalculator = (area, buckets) => {
      const result = {};
      for (const bucket of buckets) {
        if (area >= bucket) {
          const bucketsAmount = Math.floor(area / bucket);
          result[bucket] = bucketsAmount;
          area %= bucket;
          if (area === 0) break;
        }
      }
      return result;
    };

    const paintNeededPerSquareMeter = Math.ceil(areaToBePainted / 5);
    const notRoundedUpwardAmountRequired = areaToBePainted / 5;

    console.log('Paint needed per square meter: ' + paintNeededPerSquareMeter);
    console.log(
      'Not rounded upward paint liter needed: ' +
        notRoundedUpwardAmountRequired,
    );

    const bucketsNeeded = bucketsCalculator(paintNeededPerSquareMeter, buckets);
    console.log(bucketsNeeded);

    return bucketsNeeded;
  }
}
