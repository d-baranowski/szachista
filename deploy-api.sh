#!/usr/bin/env bash
unset AWS_REGION
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN
export AWS_DEFAULT_PROFILE=devtales

sam package \
    --template-file api/simple-websockets-chat-app/template.yaml \
    --output-template-file api/simple-websockets-chat-app/packaged.yaml \
    --s3-bucket szachista-chat

sam deploy \
    --template-file api/simple-websockets-chat-app/packaged.yaml \
    --stack-name szachista-chat \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides MyParameterSample=MySampleValue

aws cloudformation describe-stacks \
    --stack-name szachista-chat --query 'Stacks[].Outputs'


sam package \
    --template-file api/connection-auth-keys-api/template.yaml \
    --output-template-file api/connection-auth-keys-api/packaged.yaml \
    --s3-bucket szachista-connection-auth-keys-api

sam deploy \
    --template-file api/connection-auth-keys-api/packaged.yaml \
    --stack-name szachista-connection-auth-keys-api \
    --capabilities CAPABILITY_IAM \
    --parameter-overrides MyParameterSample=MySampleValue

aws cloudformation describe-stacks \
    --stack-name szachista-connection-auth-keys-api --query 'Stacks[].Outputs'