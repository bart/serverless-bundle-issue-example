const dynamoDb = require('serverless-dynamodb-client').doc;
dynamoDb.options.convertEmptyValues = true;

exports.latest = async () => {
  const params = {
    TableName: process.env.DDB_TABLE,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": "1"
    }
  };

  const result = await dynamoDb.query(params).promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(result.Items)
  };
};
