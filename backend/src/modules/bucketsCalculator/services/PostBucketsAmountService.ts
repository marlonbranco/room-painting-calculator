import ErrorsApp from '@errors/ErrorsApp';
import IRoomDTO from '../dtos/IRoomDTO';
import { areaCalculator } from '../utils/areaCalculator';
import messages from '@config/messages';
// buckets in liters
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
  public async execute({ walls }: IRoomDTO): Promise<any> {
    const wallsArea = walls.reduce((acc, curr) => {
      const { height, width } = curr;
      return acc + height * width;
    }, 0);

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
      const wallArea = width * height;
      const areaOfDoors = areaCalculator(numberOfDoors, doorMeasurer);
      const areaOfWindows = areaCalculator(numberOfWindows, windowMeasurer);
      const areaOfDoorsAndWindows = areaOfDoors + areaOfWindows;
      if (wallArea < 1 || wallArea > 50) {
        throw new ErrorsApp(messages.WALL_AREA_MINIMUM_OR_MAXIMUM, 400);
      }
      if (areaOfDoorsAndWindows > wallArea / 2) {
        throw new ErrorsApp(
          messages.AREA_OF_DOORS_PLUS_WINDOWS_EXCEEDS_HALF_OF_WALL_AREA,
          400,
        );
      }
      if (numberOfDoors % 1 !== 0) {
        throw new ErrorsApp(messages.DECIMAL_NUMBER_OF_DOORS, 400);
      }

      if (numberOfWindows % 1 !== 0) {
        throw new ErrorsApp(messages.DECIMAL_NUMBER_OF_WINDOWS, 400);
      }
    });

    const areaToBePainted = wallsArea - totalAreaOfDoorsAndWindows;

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

    const bucketsNeeded = bucketsCalculator(paintNeededPerSquareMeter, buckets);

    return bucketsNeeded;
  }
}
