import { IUserCredential, MicrosoftKeys } from './metadata';
import * as jwt from 'jsonwebtoken';

export const parseAuth0Saml2Response = (attributes: {
  [key: string]: string;
}): IUserCredential => {
  return {
    id: attributes[MicrosoftKeys.ID],
    email: attributes[MicrosoftKeys.EMAIL],
    name: attributes[MicrosoftKeys.FULLNAME],
    avatar: '',
    isSocialAccount: false,
    emailVerified: true,
    authType: ''
  };
};

export const createJWTToken = (user: IUserCredential) => {
  return jwt.sign(user, process.env.JWTSECRET, {
    algorithm: 'HS256',
    expiresIn: '7d'
  });
};
