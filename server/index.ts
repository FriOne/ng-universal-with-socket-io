import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { App } from './app';

const PORT = process.env.PORT;

startServer();

async function startServer() {
  const app = new App();

  try {
    await app.connectDb();
  } catch (error) {
    console.error('Can\'t connect to database', error);
    return;
  }

  try {
    await app.init();
  } catch (error) {
    console.error('Error with app initiation', error);
    return;
  }

  app.run(PORT ? parseInt(PORT, 10) : 4000);
}
