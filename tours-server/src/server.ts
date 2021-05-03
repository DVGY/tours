import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import { app } from './app';

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

let DB = '';

if (process.env.MONGO_CONNECTION_STRING && process.env.MONGO_PASSWORD) {
  DB = process.env.MONGO_CONNECTION_STRING.replace(
    '<PASSWORD>',
    process.env.MONGO_PASSWORD
  );
}

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', ' -> DB connection successfull!');
  })
  .catch((err) => {
    console.log('\x1b[31m%s\x1b[0m', ' -> DB connection FAIL');
    console.log(err);
  });

app.listen(port, () => {
  console.log(`\x1b[32m -> Server started on port ${port}\x1b[0m`);
});
