#!/usr/bin/env bash
sam local start-api  --docker-network abp-sam-backend --parameter-overrides 'ParameterKey=StageName,ParameterValue=local' --log-file stdout
