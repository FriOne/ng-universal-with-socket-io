import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import * as socketIo from 'socket.io';
import { join } from 'path';
import { Server } from 'http';
import { readFileSync } from 'fs';

import { InversifyExpressServer } from 'inversify-express-utils';

import './controllers/test.controller';
import { container } from './di/inversify.config';
import TYPES from './di/types';

const DIST_FOLDER = join(process.cwd(), 'dist');

export class App {
  app: express.Application;
  server: Server;
  io: SocketIO.Server;
  inversifyServer: InversifyExpressServer;

  constructor() {
    enableProdMode();

    this.inversifyServer = new InversifyExpressServer(container);
    this.inversifyServer.setConfig(app => this.investifyConfig(app));
    this.app = this.inversifyServer.build();

    this.angularSSRConfig();
  }

  investifyConfig(app: express.Application) {

  }

  angularSSRConfig() {
    const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main.bundle');

    this.app.engine('html', ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP),
      ]
    }));
    this.app.set('view engine', 'html');
    this.app.set('views', join(DIST_FOLDER, 'browser'));
    this.app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {maxAge: '1y'}));
    this.app.get('*', (req, res) => res.render('index', {req}));
  }

  connectSocketIo() {
    this.io = socketIo(this.server, {
      serveClient: false,
      wsEngine: 'ws',
    } as any);

    container.bind<SocketIO.Server>(TYPES.SocketIo).toConstantValue(this.io);
  }

  run(port: number) {
    this.server = this.app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
    this.connectSocketIo();
  }
}
