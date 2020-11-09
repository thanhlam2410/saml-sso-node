import { Response } from 'express';
import { ISaml2Request } from '../metadata';
import { createJWTToken, parseAuth0Saml2Response } from './helper';
import { stringify } from 'query-string';
import { isEmpty, isNil } from 'lodash';

export const getMetadata = (req: ISaml2Request, res: Response) => {
  const metadata = req.saml2Instance.serviceProvider.getMetadata();
  res.contentType('text/xml').send(metadata);
};

export const getLoginUrl = async (req: ISaml2Request, res: Response) => {
  const { serviceProvider, identityProvider } = req.saml2Instance;

  const { context } = serviceProvider.createLoginRequest(
    identityProvider,
    'redirect'
  );

  return res.redirect(context);
};

export const getLogoutUrl = async (req: ISaml2Request, res: Response) => {
  const { serviceProvider, identityProvider } = req.saml2Instance;
  const { userId } = req.query;

  if (isNil(userId) || isEmpty(userId)) {
    res.status(400).send('Invalid User');
    return;
  }

  const { context } = serviceProvider.createLogoutRequest(
    identityProvider,
    'redirect',
    { logoutNameID: userId.toString() }
  );

  return res.redirect(context);
};

export const handleSaml2Response = async (
  req: ISaml2Request,
  res: Response
) => {
  const { serviceProvider, identityProvider } = req.saml2Instance;
  const { extract } = await serviceProvider.parseLoginResponse(
    identityProvider,
    'post',
    req
  );

  const user = parseAuth0Saml2Response(extract.attributes);
  user.issueDate = extract.conditions.notBefore;
  user.validTo = extract.conditions.notOnOrAfter;

  const accessToken = createJWTToken(user);
  const query = { ...user, token: accessToken, isLogin: true };
  res.redirect(`/callback/done?${stringify(query)}`);
};

export const handleSaml2LogoutResponse = async (
  req: ISaml2Request,
  res: Response
) => {
  res.redirect(`/callback/done?${stringify({ isLogin: false })}`);
};
