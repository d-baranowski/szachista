const arns = [
    "arn:aws:execute-api:eu-west-1:277265293752:j8yf2qz8vj/Prod/GET/",
    "arn:aws:execute-api:eu-west-1:277265293752:j8yf2qz8vj/Prod/POST/"
];



const noPath = arns.map(removePath);
console.log(noPath);