const app = require("../handler/app");

const event = {
    resource: "/auth-key",
    path: "/connection-auth-keys/auth-key",
    httpMethod: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate",
      Authorization:
        "eyJraWQiOiJEemhmWVZ5TjVwWFdTT3VjQUl3ZSs3N3FBV2RBNXZIUHZ1dWw3QUdvY08wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyNzkzNmEzZS05ZGIyLTQ3NDEtODk3ZS0xNTZhMDExY2ZhYmEiLCJjb2duaXRvOmdyb3VwcyI6WyJldS13ZXN0LTFfendxRkFheTBlX0dvb2dsZSJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNTYwMTg4NjQxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV96d3FGQWF5MGUiLCJleHAiOjE1NjAxOTIyNDEsImlhdCI6MTU2MDE4ODY0MSwidmVyc2lvbiI6MiwianRpIjoiYWJkOWI4ODYtMDQ0OC00NzlmLWEyMjItZmI5OGZmYjUzNjU4IiwiY2xpZW50X2lkIjoiNnZiaXRvMDhna2h1cDgwZGExbzg5NTBmcWEiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMTExODU0MDIyNTkyNjE5NzM0OTIifQ.kJ9ZIw_dkP8gT3y828CXEbGZk2-9RhsEsAFRZ_UWOVsSAwHhvMDzMGT-YlAQRPY53COvKRpNsbiv6szZLe-BazIdfZndSydIXfaC2i6sfeohDJqgG_O1LvNtQ7B3OjoYUiYK5Xm_SYJthaVGi9kyp4U12hYMHWeNWAPBIjj168Fe5-MZhQXyi4QKJzmPjCUAIkzZx5OImQbDxMGflJ2ECfeGuXBBiwoR1igsSjcIln8kuNXNfVhF7bF1vp9_us5i6Rwg94YIFGFBFbvvQlSG0eNoKsAyMeZs0toxMQfZj61hH2TMlzvQO1JfuvyuVyNqas_8SCXCOch9Tu1i9kyaEw",
      "Cache-Control": "no-cache",
      "CloudFront-Forwarded-Proto": "https",
      "CloudFront-Is-Desktop-Viewer": "true",
      "CloudFront-Is-Mobile-Viewer": "false",
      "CloudFront-Is-SmartTV-Viewer": "false",
      "CloudFront-Is-Tablet-Viewer": "false",
      "CloudFront-Viewer-Country": "GB",
      "Content-Type": "text/plain",
      Host: "api.gierki.net",
      "Postman-Token": "37b2fbb5-8990-41a4-8721-65855acb83ef",
      "User-Agent": "PostmanRuntime/7.13.0",
      Via: "1.1 9132f1c6fe5ab3ea458d3abc7e3bc5d4.cloudfront.net (CloudFront)",
      "X-Amz-Cf-Id": "nXqux6vE6clCnzidebzdON-ncepeQPyrlz769C2peZAKXPVEu926pg==",
      "X-Amzn-Trace-Id": "Root=1-5cfe96f3-0e5a4b0eabb6a036c17a8cde",
      "X-Forwarded-For": "88.98.243.201, 70.132.15.41",
      "X-Forwarded-Port": "443",
      "X-Forwarded-Proto": "https"
    },
    multiValueHeaders: {
      Accept: ["*/*"],
      "Accept-Encoding": ["gzip, deflate"],
      Authorization: [
        "eyJraWQiOiJEemhmWVZ5TjVwWFdTT3VjQUl3ZSs3N3FBV2RBNXZIUHZ1dWw3QUdvY08wPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyNzkzNmEzZS05ZGIyLTQ3NDEtODk3ZS0xNTZhMDExY2ZhYmEiLCJjb2duaXRvOmdyb3VwcyI6WyJldS13ZXN0LTFfendxRkFheTBlX0dvb2dsZSJdLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNTYwMTg4NjQxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV96d3FGQWF5MGUiLCJleHAiOjE1NjAxOTIyNDEsImlhdCI6MTU2MDE4ODY0MSwidmVyc2lvbiI6MiwianRpIjoiYWJkOWI4ODYtMDQ0OC00NzlmLWEyMjItZmI5OGZmYjUzNjU4IiwiY2xpZW50X2lkIjoiNnZiaXRvMDhna2h1cDgwZGExbzg5NTBmcWEiLCJ1c2VybmFtZSI6Ikdvb2dsZV8xMTExODU0MDIyNTkyNjE5NzM0OTIifQ.kJ9ZIw_dkP8gT3y828CXEbGZk2-9RhsEsAFRZ_UWOVsSAwHhvMDzMGT-YlAQRPY53COvKRpNsbiv6szZLe-BazIdfZndSydIXfaC2i6sfeohDJqgG_O1LvNtQ7B3OjoYUiYK5Xm_SYJthaVGi9kyp4U12hYMHWeNWAPBIjj168Fe5-MZhQXyi4QKJzmPjCUAIkzZx5OImQbDxMGflJ2ECfeGuXBBiwoR1igsSjcIln8kuNXNfVhF7bF1vp9_us5i6Rwg94YIFGFBFbvvQlSG0eNoKsAyMeZs0toxMQfZj61hH2TMlzvQO1JfuvyuVyNqas_8SCXCOch9Tu1i9kyaEw"
      ],
      "Cache-Control": ["no-cache"],
      "CloudFront-Forwarded-Proto": ["https"],
      "CloudFront-Is-Desktop-Viewer": ["true"],
      "CloudFront-Is-Mobile-Viewer": ["false"],
      "CloudFront-Is-SmartTV-Viewer": ["false"],
      "CloudFront-Is-Tablet-Viewer": ["false"],
      "CloudFront-Viewer-Country": ["GB"],
      "Content-Type": ["text/plain"],
      Host: ["api.gierki.net"],
      "Postman-Token": ["37b2fbb5-8990-41a4-8721-65855acb83ef"],
      "User-Agent": ["PostmanRuntime/7.13.0"],
      Via: ["1.1 9132f1c6fe5ab3ea458d3abc7e3bc5d4.cloudfront.net (CloudFront)"],
      "X-Amz-Cf-Id": ["nXqux6vE6clCnzidebzdON-ncepeQPyrlz769C2peZAKXPVEu926pg=="],
      "X-Amzn-Trace-Id": ["Root=1-5cfe96f3-0e5a4b0eabb6a036c17a8cde"],
      "X-Forwarded-For": ["88.98.243.201, 70.132.15.41"],
      "X-Forwarded-Port": ["443"],
      "X-Forwarded-Proto": ["https"]
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {
      resourceId: "l8ra8n",
      authorizer: {
        principalId: "user",
        stringified:
          '{"Username":"Google_111185402259261973492","UserAttributes":[{"Name":"sub","Value":"27936a3e-9db2-4741-897e-156a011cfaba"},{"Name":"identities","Value":"[{\\"userId\\":\\"111185402259261973492\\",\\"providerName\\":\\"Google\\",\\"providerType\\":\\"Google\\",\\"issuer\\":null,\\"primary\\":true,\\"dateCreated\\":1557443529802}]"},{"Name":"name","Value":"Daniel Baranowski"},{"Name":"given_name","Value":"Daniel"},{"Name":"family_name","Value":"Baranowski"},{"Name":"email","Value":"daniel.baranowski@infinityworks.com"},{"Name":"picture","Value":"https://lh4.googleusercontent.com/-g2eS0WmwWPI/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfBCNUepM8ZHiMa2px8hEHvKIqudA/s96-c/photo.jpg"}]}',
        integrationLatency: 71
      },
      resourcePath: "/auth-key",
      httpMethod: "POST",
      extendedRequestId: "bEyGCFSpjoEF73w=",
      requestTime: "10/Jun/2019:17:44:19 +0000",
      path: "/connection-auth-keys/auth-key",
      accountId: "277265293752",
      protocol: "HTTP/1.1",
      stage: "Prod",
      domainPrefix: "api",
      requestTimeEpoch: 1560188659409,
      requestId: "5fc58417-8ba7-11e9-b20a-e92c1fcb666c",
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: "88.98.243.201",
        principalOrgId: null,
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent: "PostmanRuntime/7.13.0",
        user: null
      },
      domainName: "api.gierki.net",
      apiId: "u28fta85u6"
    },
    body: '{\n "chatId": "12345"\n}',
    isBase64Encoded: false
  };

  app.handler(event, null, function() {
      console.log(arguments);
  });