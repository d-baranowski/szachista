#!/usr/bin/env bash
unset AWS_REGION
unset AWS_ACCESS_KEY_ID
unset AWS_SECRET_ACCESS_KEY
unset AWS_SESSION_TOKEN
export AWS_DEFAULT_PROFILE=devtales


for i in $(aws dynamodb list-tables | jq -cr '.TableNames[]'); do
    echo $i
    aws dynamodb describe-table --table-name $i | jq '.Table' | jq 'del(.TableArn)' | jq 'del(.TableSizeBytes)' | jq 'del(.TableStatus)' | jq 'del(.TableId)' | jq 'del(.ItemCount)' | jq 'del(.CreationDateTime)' | jq 'del(.GlobalSecondaryIndexes[]?.IndexSizeBytes)' | jq 'del(.ProvisionedThroughput.NumberOfDecreasesToday)' | jq 'del(.GlobalSecondaryIndexes[]?.IndexStatus)' | jq 'del(.GlobalSecondaryIndexes[]?.IndexArn)' | jq 'del(.GlobalSecondaryIndexes[]?.ItemCount)' | jq 'del(.GlobalSecondaryIndexes[]?.ProvisionedThroughput.NumberOfDecreasesToday)' >> $i
    aws dynamodb create-table --cli-input-json file://$i --endpoint-url http://localhost:8000
    rm $i
done;
