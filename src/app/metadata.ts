export interface IUserCredential {
  id: string;
  email: string;
  name: string;
  isSocialAccount?: boolean;
  emailVerified?: boolean;
  avatar?: string;
  authType?: string;
  issueDate?: string;
  validTo?: string;
}

export enum Auth0Keys {
  ID = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  EMAIL = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  FULLNAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  SOCIAL = 'http://schemas.auth0.com/identities/default/isSocial',
  EMAIL_VERIFIED = 'http://schemas.auth0.com/email_verified',
  AVATAR = 'http://schemas.auth0.com/picture',
  AUTH_TYPE = 'http://schemas.auth0.com/identities/default/connection'
}

export enum MicrosoftKeys {
  ID = 'http://schemas.microsoft.com/identity/claims/objectidentifier',
  EMAIL = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  FULLNAME = 'http://schemas.microsoft.com/identity/claims/displayname',
  SOCIAL = '',
  EMAIL_VERIFIED = '',
  AVATAR = '',
  AUTH_TYPE = 'http://schemas.microsoft.com/claims/authnmethodsreferences'
}
