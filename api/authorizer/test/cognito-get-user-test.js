const AWS = require('aws-sdk');
var params = {
    AccessToken: "eyJzdWIiOiI4Nzg1ODA4Ny0xYzI0LTQxOTktYmMyOS0yNWIxMmI0M2UxODAiLCJjb2duaXRvOmdyb3VwcyI6WyJldS13ZXN0LTFfendxRkFheTBlX0dvb2dsZSJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNTYxNDEwNjAyLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV96d3FGQWF5MGUiLCJleHAiOjE1NjE0MTQyMDIsImlhdCI6MTU2MTQxMDYwMiwidmVyc2lvbiI6MiwianRpIjoiMDRkMDBiMDktMzZiZS00ZjUzLTg0NWMtMzQwMzNhNGZlNzBmIiwiY2xpZW50X2lkIjoiNnZiaXRvMDhna2h1cDgwZGExbzg5NTBmcWEiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMDkzNTQ0ODQ2Nzc2NjMzMDgxNzgifQ"
};
AWS.CognitoIdentityServiceProvider.getUser(params, (err, data) => {
    if (err) {
        console.log(err, err.stack); // an error occurred
    }
    else {
        console.log(data);  
        sendResponse(200, data); 
    }
})