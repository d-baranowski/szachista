export interface IAwsTokenResponse {
    "access_token": string,
    "refresh_token": string,
    "id_token": string,
    "token_type": string,
    "expires_in": number
}