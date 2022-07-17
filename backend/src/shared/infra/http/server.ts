import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import ErrorsApp from '@errors/ErrorsApp';
import app from './app';

const PORT = Number(process.env.PORT) || 3333;
const URL = process.env.URL || '0.0.0.0';

if (!URL) {
  throw new ErrorsApp('URL_UNDEFINED');
}

app.listen(PORT, URL, async () => {
  process.stdout.write(`Backend running on http://${URL}:${PORT}\n`);
});
