import { performance } from 'perf_hooks';
import { Request, Response } from 'express';

import PostBucketsAmountService from '@modules/bucketsCalculator/useCases/PostBucketsAmountService';
import IRoomDTO from '@modules/bucketsCalculator/dtos/IRoomDTO';

const postBucketsAmountService = new PostBucketsAmountService();

class PostBucketsAmountController {
  public async create(request: Request, response: Response) {
    const initTime = performance.now();

    const room: IRoomDTO = request.body;

    const domainSum = await postBucketsAmountService.execute(room);

    const endTime = performance.now();

    const executionTime = ((endTime - initTime) * 100) / 1000 / 100;

    process.stdout.write(`\nBUCKETS AMOUNT OBTAINED IN ${executionTime}s\n`);

    return response.json(domainSum);
  }
}

export const postBucketsAmountController = new PostBucketsAmountController();
