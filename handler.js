'use strict';
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports.write = async event => {

  var params = {
    Bucket: process.env.S3_BUCKET, 
    Key: moment().format("YYYY/MM/DD/") + uuidv4() + ".json",
    Body: JSON.stringify(event.body),
    ContentType: "application/json"
  };

  await s3.putObject(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        status: 'success'
      }
    ),
  };
};
