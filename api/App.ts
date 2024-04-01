import express, { Application } from 'express';
import router from './router/router';
import noRoute from './router/routes/404';
import Dak from '../erbs/src/decorators/dak';
import cors from './middleware/cors';

@Dak()
class App {

  public readonly _app: Application;

  constructor() {
    this._app = express();
    this.middlewares().group();
  }

  private middlewares(): this {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: false }));
    this._app.use(cors)
    return this;
  }

  private group(): this {
    this._app.use('/api', router);
    this._app.use('*', noRoute);
    return this;
  }
}

export default new App()._app;