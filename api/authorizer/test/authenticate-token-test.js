const authToken = require('../handler/authenticate-token');
const sampleToken = "eyJzdWIiOiI4Nzg1ODA4Ny0xYzI0LTQxOTktYmMyOS0yNWIxMmI0M2UxODAiLCJjb2duaXRvOmdyb3VwcyI6WyJldS13ZXN0LTFfendxRkFheTBlX0dvb2dsZSJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNTYxNDEwNjAyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV96d3FGQWF5MGUiLCJleHAiOjE1NjE0MTQyMDIsImlhdCI6MTU2MTQxMDYwMiwidmVyc2lvbiI6MiwianRpIjoiMDRkMDBiMDktMzZiZS00ZjUzLTg0NWMtMzQwMzNhNGZlNzBmIiwiY2xpZW50X2lkIjoiNnZiaXRvMDhna2h1cDgwZGExbzg5NTBmcWEiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMDkzNTQ0ODQ2Nzc2NjMzMDgxNzgifQ";
authToken.default(sampleToken);
/* Access token
{
    "sub": "87858087-1c24-4199-bc29-25b12b43e180",
    "cognito:groups": [
        "eu-west-1_zwqFAay0e_Google"
    ],
    "token_use": "access",
    "scope": "phone openid profile email",
    "auth_time": 1559804242,
    "iss": "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_zwqFAay0e",
    "exp": 1559807842,
    "iat": 1559804242,
    "version": 2,
    "jti": "3e85c69f-12ea-484d-b9d3-ec2cb6bb0e64",
    "client_id": "6vbito08gkhup80da1o8950fqa",
    "username": "Google_109354484677663308178"
} */

/* Id Token
{
    "at_hash": "fpGKPYS7HuENKY4tpusymQ",
    "sub": "87858087-1c24-4199-bc29-25b12b43e180",
    "cognito:groups": [
    "eu-west-1_zwqFAay0e_Google"
],
    "iss": "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_zwqFAay0e",
    "cognito:username": "Google_109354484677663308178",
    "given_name": "Daniel",
    "picture": "https://lh4.googleusercontent.com/-LirntiZlvhA/AAAAAAAAAAI/AAAAAAAAAAw/SqDUOfPthio/s96-c/photo.jpg",
    "aud": "6vbito08gkhup80da1o8950fqa",
    "identities": [
    {
        "userId": "109354484677663308178",
        "providerName": "Google",
        "providerType": "Google",
        "issuer": null,
        "primary": "true",
        "dateCreated": "1555128389392"
    }
],
    "token_use": "id",
    "auth_time": 1559804242,
    "name": "Daniel Baranowski",
    "exp": 1559807842,
    "iat": 1559804242,
    "family_name": "Baranowski",
    "email": "daniel.m.baranowski@gmail.com"
}
*/