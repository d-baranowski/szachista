interface IIdentity {
    "userId": string,
    "providerName": string,
    "providerType": string,
    "issuer": any,
    "primary": string,
    "dateCreated": string
}

export interface IIdTokenDeceoded {
    "at_hash": string,
    "sub": string,
    "cognito:groups": Array<string>,
    "iss": string,
    "cognito:username": string,
    "given_name": string,
    "picture": string,
    "aud": string,
    "token_use": string,
    "auth_time": number,
    "name": string,
    "exp": number,
    "iat": number,
    "family_name": string,
    "email": string,
    "identities": Array<IIdentity>
}