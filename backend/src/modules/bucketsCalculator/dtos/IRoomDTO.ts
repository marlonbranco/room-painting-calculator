export default interface IRoomDTO {
  walls: [
    {
      height: number;
      width: number;
    },
  ];
  numberOfWindows: number;
  numberOfDoors: number;
}
