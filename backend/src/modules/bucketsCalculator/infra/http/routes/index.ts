import { Router } from 'express';
import { getBucketsAmountController } from '../controllers/GetBucketsAmountController';

const bucketsCalculatorRouter = Router();

bucketsCalculatorRouter.get(
  '/calculator/buckets',
  getBucketsAmountController.index,
);

export default bucketsCalculatorRouter;
