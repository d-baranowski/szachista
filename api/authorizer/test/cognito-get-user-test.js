const AWS = require('aws-sdk');
var params = {
    AccessToken: "eyJraWQiOiJEemhmWVZ5TjVwWFdTT3VjQUl3ZSs3N3FBV2RBNXZIUHZ1dWw3QUdvY08wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4Nzg1ODA4Ny0xYzI0LTQxOTktYmMyOS0yNWIxMmI0M2UxODAiLCJjb2duaXRvOmdyb3VwcyI6WyJldS13ZXN0LTFfendxRkFheTBlX0dvb2dsZSJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiYXV0aF90aW1lIjoxNTYwMDc1NzAzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV96d3FGQWF5MGUiLCJleHAiOjE1NjAwNzkzMDMsImlhdCI6MTU2MDA3NTcwMywidmVyc2lvbiI6MiwianRpIjoiMDEzOGRlNjQtZTJiZi00ZTBjLTkzYWUtNzcwYzgzNzM1ZWUzIiwiY2xpZW50X2lkIjoiNnZiaXRvMDhna2h1cDgwZGExbzg5NTBmcWEiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMDkzNTQ0ODQ2Nzc2NjMzMDgxNzgifQ.TbhoJzKFT_K8jUk-V3O62ZBDrQMptpIu0g4QTElXtFq0AZbP2bEQm_MVzJtOU4XChQt_62qhy8MvTXdfr1cVhI4qlzG21OUNMyp1ulFjBzCzYDKKkQIp9o0nhp0vkc7tL1R8k9U4AOm6dCOvXeOKBmXTtjmsRJwMa5OOceDjW4y3qj1bH0E0W2BgxUvsseLVbGu8HN1-aVjvwX3ehUli_YnNwLNC7OeT9EXWYsccCK7BBKAzwFmbi3vuBqseBuyiuMWifF9HBFk6c4Ix-A3rJMT3KtKZYGFl95xb2_LXtgGsN9WZmQhAe1keJnosTeneFcF4TW--4WH7FmXNNve1HQ"
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