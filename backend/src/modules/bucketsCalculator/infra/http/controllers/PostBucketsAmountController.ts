import { performance } from 'perf_hooks';
import { Request, Response } from 'express';

import PostBucketsAmountService from '@modules/bucketsCalculator/services/PostBucketsAmountService';

const postBucketsAmountService = new PostBucketsAmountService();

class PostBucketsAmountController {
  public async create(request: Request, response: Response) {
    const initTime = performance.now();

    const walls = request.body;

    const bucketsAmount = await postBucketsAmountService.execute(walls);

    const endTime = performance.now();

    const executionTime = ((endTime - initTime) * 100) / 1000 / 100;

    process.stdout.write(`\nBUCKETS AMOUNT OBTAINED IN ${executionTime}s\n`);

    return response.json(bucketsAmount);
  }
}

export const postBucketsAmountController = new PostBucketsAmountController();
