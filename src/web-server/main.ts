import * as logger from 'morgan';
import * as config from 'config';
import * as Raven from 'raven';
import { application } from '../application';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';

export let server: Server;

async function start() {
  const app = await NestFactory.create(AppModule);
  if (config.util.getEnv('NODE_CONFIG_ENV') !== 'test') {
    app.use(Raven.requestHandler());
    app.use(Raven.errorHandler());
    app.use(
      logger(
        config.get('server.logFormat'),
        { skip: (req: any) => (req.baseUrl || req.originalUrl).includes('healthcheck') }
      )
    );
  }
  server = await app.listen(config.get('server.port'));
}

const stop = () => new Promise((resolve, reject) => {
  server.close((error: Error) => {
    if (error) {
      reject(error);
    } else {
      resolve('Nest Server stopped');
    }
  });
});

application.onStart(() => {
  start()
    .then(message => console.log(message))
    .then(() => console.log(`${config.get('appName')} started!`))
    .catch((error: Error) => {
      console.error(error);
      Raven.captureException(error);
      application.shutdown();
    });
});
application.onShutdown(() => stop());

export { start, stop };
