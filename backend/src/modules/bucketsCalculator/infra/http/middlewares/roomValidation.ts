// import ErrorsApp from '@errors/ErrorsApp';
import ErrorsApp from '@errors/ErrorsApp';
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

const roomValidationSchema = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { walls } = request.body;

  if (walls.length < 4 || walls.length > 4) {
    throw new ErrorsApp('A room must have 4 walls', 400);
  }
  const Wall = z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    numberOfDoors: z.number().nonnegative(),
    numberOfWindows: z.number().nonnegative(),
  });

  const Room = z.array(Wall).min(4).max(4);

  try {
    Room.safeParse(walls);
    next();
  } catch (e: any) {
    if (e instanceof ZodError) {
      console.error(JSON.parse(e.message), 400);
    } else {
      console.error(JSON.parse(e.message), 400);
    }
  }
};
export default roomValidationSchema;
