import { Router } from 'express';
import { postBucketsAmountController } from '../controllers/PostBucketsAmountController';
import roomValidation from '../middlewares/roomValidation';
const bucketsCalculatorRouter = Router();

bucketsCalculatorRouter.post(
  '/calculator/buckets',
  roomValidation,
  postBucketsAmountController.create,
);

export default bucketsCalculatorRouter;
