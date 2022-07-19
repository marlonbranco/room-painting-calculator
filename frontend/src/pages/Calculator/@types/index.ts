export type IWall = {
    height: string;
    width: string;
    numberOfDoors: string;
    numberOfWindows: string;
}

export type IRoomInput = {
    walls: IWall[];
}