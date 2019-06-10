const authToken = require('../handler/authenticate-token');
const sampleToken = "eyJraWQiOiJBNlJKMmcydExkMlBaRGVrdXplak9OQXNoaGxsSFJLY094cW1GZGR2bjZvPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiZnBHS1BZUzdIdUVOS1k0dHB1c3ltUSIsInN1YiI6Ijg3ODU4MDg3LTFjMjQtNDE5OS1iYzI5LTI1YjEyYjQzZTE4MCIsImNvZ25pdG86Z3JvdXBzIjpbImV1LXdlc3QtMV96d3FGQWF5MGVfR29vZ2xlIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3p3cUZBYXkwZSIsImNvZ25pdG86dXNlcm5hbWUiOiJHb29nbGVfMTA5MzU0NDg0Njc3NjYzMzA4MTc4IiwiZ2l2ZW5fbmFtZSI6IkRhbmllbCIsInBpY3R1cmUiOiJodHRwczpcL1wvbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbVwvLUxpcm50aVpsdmhBXC9BQUFBQUFBQUFBSVwvQUFBQUFBQUFBQXdcL1NxRFVPZlB0aGlvXC9zOTYtY1wvcGhvdG8uanBnIiwiYXVkIjoiNnZiaXRvMDhna2h1cDgwZGExbzg5NTBmcWEiLCJpZGVudGl0aWVzIjpbeyJ1c2VySWQiOiIxMDkzNTQ0ODQ2Nzc2NjMzMDgxNzgiLCJwcm92aWRlck5hbWUiOiJHb29nbGUiLCJwcm92aWRlclR5cGUiOiJHb29nbGUiLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTU1MTI4Mzg5MzkyIn1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU1OTgwNDI0MiwibmFtZSI6IkRhbmllbCBCYXJhbm93c2tpIiwiZXhwIjoxNTU5ODA3ODQyLCJpYXQiOjE1NTk4MDQyNDIsImZhbWlseV9uYW1lIjoiQmFyYW5vd3NraSIsImVtYWlsIjoiZGFuaWVsLm0uYmFyYW5vd3NraUBnbWFpbC5jb20ifQ.N0MqgdeRbbz9Hvzl9jgum4luw5qFWv93tuJYyhEYnoQvWfm7oIqmHmP67GjlNcuCsO4RgxNqzV4W-cgwKM4UBID8SVqWRHz0J_yk12ASKy0QFYsXWPyZE0dFIDn4LmfJQbSyyLV8o62QA6z3zFtWJxOI_oN0oncDlUfQF-NXQbROJiinOc8LyoPCmaIr99-4mk603tvRIG1avTr-Zxun6-rp5VxyKYa3U6f4ZLw7sQH_oXPgnGNFyqhd954ClypXcQNZrS95aP8BRoYahxi5iB87m9q2VjLWWYz7iN0Unxki-UNx2i3boXXahONYNs59hdALhaFrv0gt4D3HmRUCRQ";
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