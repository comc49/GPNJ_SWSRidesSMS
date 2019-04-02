'use strict';

const twilio = require('twilio');
const config = require('./config.json');

const MessagingResponse = twilio.twiml.MessagingResponse;

const projectId = process.env.GCLOUD_PROJECT;
const region = 'us-central1';

exports.reply = (req, res) => {

  const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
  client.messages.create({
      body: req.body.test,
      to: `+1${config.J_NUMBER}`,
      from: `+1${config.TWILIO_PHONE_NUMBER}`
  })
  .then( (message) => console.log(message));

  client.messages.create({
      body: req.body.test,
      to: `+1${config.KOO_NUMBER}`,
      from: `+1${config.TWILIO_PHONE_NUMBER}`
  })
  .then( (message) => console.log(message));

  // Send the response
  res
    .status(200)
    .type('text/xml')
    .end();
};
