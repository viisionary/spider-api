const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-2",
});

export const dynamodb = new AWS.DynamoDB();
