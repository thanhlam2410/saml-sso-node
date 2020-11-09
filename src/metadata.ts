import { Request } from 'express';
import * as samlify from 'samlify';

export interface ISaml2Request extends Request {
  saml2Instance?: {
    identityProvider: samlify.IdentityProviderInstance;
    serviceProvider: samlify.ServiceProviderInstance;
  };
}
