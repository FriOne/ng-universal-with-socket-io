import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { App } from './app';

const PORT = process.env.PORT;
const app = new App();
app.run(PORT ? parseInt(PORT) : 4000);
