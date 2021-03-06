import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { Connection, createConnection } from 'typeorm';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';

import * as express from 'express';
import { join } from 'path';
import { Server } from 'http';
import { readFileSync } from 'fs';

import TYPES from './di/types';
import { container } from './di/inversify.config';
import { AuthProvider } from './services/auth/auth.provider';

import { ormConfig } from '../ormconfig';
import { getSocketServer } from './socket/socket-server';

const DIST_FOLDER = join(process.cwd(), 'dist');

export class App {
  app: express.Application;
  server: Server;
  socketServer: any;

  async connectDb() {
    const connection = await createConnection(ormConfig as any);
    container.bind<Connection>(TYPES.DbConnection).toConstantValue(connection);
  }

  async init() {
    enableProdMode();

    this.bindSocketServer();

    const inversifyServer = new InversifyExpressServer(
      container, null, null, null, AuthProvider,
    );
    inversifyServer.setConfig(app => this.investifyConfig(app));
    inversifyServer.setErrorConfig(app => this.investifyErrorConfig(app));
    this.app = inversifyServer.build();

    this.angularSSRConfig();
  }

  investifyConfig(app: express.Application) {
    app.use(bodyParser.urlencoded({
      extended: true,
    }));
    app.use(bodyParser.json());
  }

  investifyErrorConfig(app: express.Application) {
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
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

  bindSocketServer() {
    this.socketServer = getSocketServer();
    container.bind<SocketIO.Server>(TYPES.SocketIo).toConstantValue(this.socketServer);
  }

  run(port: number) {
    this.server = this.app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
    this.socketServer.connect(this.server);
    this.socketServer.on('connection', socket => {
      console.log('Socket connected');
      socket.on('test', () => {
        console.log('Socket test successful');
      });
    });
  }
}
