import { performance } from 'perf_hooks';
import { Request, Response } from 'express';

import GetBucketsAmountService from '@modules/bucketsCalculator/useCases/GetBucketsAmountService';
import IRoomDTO from '@modules/bucketsCalculator/dtos/IRoomDTO';

const getBucketsAmountService = new GetBucketsAmountService();

class GetBucketsAmountController {
  public async index(request: Request, response: Response) {
    const initTime = performance.now();

    const room: IRoomDTO = request.body;

    const domainSum = await getBucketsAmountService.execute(room);

    const endTime = performance.now();

    const executionTime = ((endTime - initTime) * 100) / 1000 / 100;

    process.stdout.write(`\nBUCKETS AMOUNT OBTAINED IN ${executionTime}s\n`);

    return response.json(domainSum);
  }
}

export const getBucketsAmountController = new GetBucketsAmountController();
