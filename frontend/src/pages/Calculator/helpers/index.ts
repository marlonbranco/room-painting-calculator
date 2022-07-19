import { parseStringToNumber } from '../../../utils/parseStringToNumber';
import { IWall, IRoomInput } from '../@types';

export const convertToNumber = (walls: IWall)  =>{
    const {height, width, numberOfDoors, numberOfWindows} = walls;

    return {
        height: height ? parseStringToNumber(height) : 0,
        width: width ? parseStringToNumber(width) : 0,
        numberOfDoors: numberOfDoors ? parseStringToNumber(numberOfDoors) : 0,
        numberOfWindows: numberOfWindows ? parseStringToNumber(numberOfWindows) : 0,
    }
}

export const parseFormData = ({ walls }: IRoomInput) => {
    const parsedWalls = walls.map(convertToNumber);
    return { 
        walls: parsedWalls, 
    }
}
