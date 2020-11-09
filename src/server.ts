import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { saml2 } from './middlewares/saml2';
import {
  getLoginUrl,
  getLogoutUrl,
  getMetadata,
  handleSaml2LogoutResponse,
  handleSaml2Response
} from './app/saml2_login';

export const createApiServer = (
  projectRoot: string,
  production = false
): express.Express => {
  const server = express();

  //middlewares
  server.use(cors({ credentials: true, origin: true }));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(saml2(projectRoot));

  //endpoints
  const apiRoute = express.Router();
  apiRoute.get('/metadata', getMetadata);
  apiRoute.get('/login', getLoginUrl);
  apiRoute.get('/logout', getLogoutUrl);
  server.use('/saml2', apiRoute);

  const callbackRoute = express.Router();
  callbackRoute.post('/login', handleSaml2Response);
  callbackRoute.post('/logout', handleSaml2LogoutResponse);
  callbackRoute.get('/done', (req, res) => {
    res.send(
      req.query.isLogin
        ? 'You successfully signed in'
        : 'You successfully signed out'
    );
  });

  server.use('/callback', callbackRoute);

  //404
  server.use((req, res) => {
    res.status(404).send(`unknown resource: ${req.originalUrl}`);
  });

  server.use((err: Error, req: express.Request, res: express.Response) => {
    if (production) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(500).send(err.stack);
    }
  });

  return server;
};
