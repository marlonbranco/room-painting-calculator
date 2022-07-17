import { Router } from 'express';
import bucketsCalculatorRouter from '@modules/bucketsCalculator/infra/http/routes';

const routes = Router();

routes.use('/v1', bucketsCalculatorRouter);

export default routes;
