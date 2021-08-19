const AWS = require("aws-sdk");
// const myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: "IDENTITY_POOL_ID"});
AWS.config.update({
    region: "us-east-2",
    accessKeyId: "AKIA6IH5D3SRP5QRUJFP",
    secretAccessKey: "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"
    // credentials: myCredentials
});

export const dynamodb = new AWS.DynamoDB();
