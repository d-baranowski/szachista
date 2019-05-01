deploy-site:
	sh -c "cd site && npm run build"
	aws s3 sync ./site/build s3://szachista --profile devtales --acl public-read